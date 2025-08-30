import { create } from 'zustand'
import { jwtDecode } from "jwt-decode"

type UserDetail = {
  username: string | null;
  role: string | null;
  setUser: (token: string) => void;
  logout: () => void;
};

type JwtPayload = {
  username: string;
  role: string;
};

const decodeToken = (token: string): JwtPayload | null => {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch {
    return null;
  }
};

export const useAuthStore = create<UserDetail>((set) => {
  const token = localStorage.getItem("accessToken");
  const decoded = token ? decodeToken(token) : null;

  return {
    username: decoded?.username ?? null,
    role: decoded?.role ?? null,

    setUser: (token: string) => {
      const decoded = decodeToken(token);
      if (decoded) {
        localStorage.setItem("accessToken", token); 
        set({
          username: decoded.username,
          role: decoded.role,
        });
      }
    },

    logout: () => {
      localStorage.removeItem("accessToken");
      set({ username: null, role: null });
    },
  };
});
