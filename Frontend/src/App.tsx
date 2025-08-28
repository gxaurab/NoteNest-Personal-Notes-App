import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import { LoginPage } from "./pages/Authentication/LoginPage"
import Dashboard from "./pages/DashboardPage"
import DashboardLayout from "./Layout/DashboardLayout"
import SignupPage from "./pages/Authentication/SignupPage"
import AdminDashboard from "./pages/Admin/AdminDashboard"

function App() {

  return (
    <>
      <Routes>
        <Route index element= {<Home/>}/>
        <Route path="login" element={<LoginPage/>}/>
        <Route path="signup" element={<SignupPage/>}/>
        <Route path="dashboard" element={<DashboardLayout/>}>
          <Route index element={<Dashboard/>}/>  
        </Route>
        <Route path="/admin" element={<AdminDashboard/>}/>
      </Routes>
    </>
  )
}

export default App
