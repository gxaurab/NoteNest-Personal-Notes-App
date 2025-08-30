import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import { LoginPage } from "./pages/Authentication/LoginPage";
import SignupPage from "./pages/Authentication/SignupPage";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import ResetPassword from "./pages/Authentication/ResetPassword";

import DashboardLayout from "./Layout/DashboardLayout";
import Dashboard from "./pages/DashboardPage";

import AdminDashboard from "./pages/Admin/AdminDashboard";

import UserProtectedRoute from "./Routes/UserProtectedRoute";
import AdminProtectedRoute from "./Routes/AdminProtectedRoute";
import ReverseProtection from "./Routes/ReverseProtection";

function App() {
  return (
    <Routes>
        <Route index element={<Home/>} />

      <Route element= {<ReverseProtection/>}>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password/:token" element={<ResetPassword />} />
      </Route>

      <Route element={<UserProtectedRoute />}>
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          
        </Route>
      </Route>

      <Route element={<AdminProtectedRoute />}>
        <Route path="admin">
          <Route index element={<AdminDashboard />} />
    
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
