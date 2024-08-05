/* eslint-disable no-unused-vars */

import HomePage from "../../components/HomePage"
import Login from "../../components/Login"
import Logout from "../../components/Logout"
import Navbar from "../../components/Navbar"
import Register from "../../components/Register"
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom"
import About from "../pages/About"
import VerifyPage from "../../components/VerifyPage"
import ForgotPassword from "../../components/ForgetPassword"
import ResetPassword from "../../components/RestPassword"
import CreateBlogPost from "../../components/CreateBlog"
import DraftPosts from "../../components/BlogDraftForm"
import Cookies from "js-cookie"
import { useContext, useEffect } from "react"
import { AuthContext } from "../store/auth-context"
import ContactForm from "../../components/ContactPage"
import AdminDashboard from "../../components/AdminDashboard"
import ShowBlogPosts from "../../components/ShowBlogPosts"
import UserTable from "../../components/UserTable"



function Router() {
    let token = Cookies.get('token');
    const Navigation = useNavigate();
    const location = useLocation();
    const urlPath = location.pathname;
    const {isLoggedIn}=useContext(AuthContext)
    useEffect(() => {
        token = Cookies.get('token');
        if (token && (urlPath == "/login" || urlPath == "/register")) {
          Navigate('/')
        }
      }, [token])
  return (
    <>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/verifypage" element={<VerifyPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:id" element={<ResetPassword />} />
          <Route path="/createblog" element={token ? <CreateBlogPost /> : <Navigate to="/login" />} />
          <Route path="/draftblogs" element={token ? <DraftPosts /> : <Navigate to="/login" />} />
          <Route path="/dashboard" element={token ? <AdminDashboard /> : <Navigate to="/login" />} />
          <Route path="/blogs" element={<ShowBlogPosts />} />
          <Route path="/users" element={token ? <UserTable /> : <Navigate to="/login" />} />

        </Routes>
    </>
  )
}

export default Router
