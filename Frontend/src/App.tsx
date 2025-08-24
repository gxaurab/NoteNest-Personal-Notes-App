import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import { LoginPage } from "./pages/Authentication/LoginPage"
import Dashboard from "./pages/DashboardPage"
import DashboardLayout from "./pages/DashboardLayout"
import SignupPage from "./pages/Authentication/SignupPage"

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
      </Routes>
    </>
  )
}

export default App
