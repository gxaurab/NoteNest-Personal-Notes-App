import axios, { AxiosError } from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true, // For HttpOnly cookies (refresh token) it automatically attachees the cookie 
});

// Request interceptor: Add access token to headers
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken") // Or use context later
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Handle 401, refresh token
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        
        const newAccessToken = res.data.accessToken;
        localStorage.setItem( "accessToken", newAccessToken) 
        // Retry original request
        error.config!.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(error.config!);
      } catch (refreshError) {
        // Refresh failed, clear token and redirect to login
        localStorage.removeItem("accessToken")
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;