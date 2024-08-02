/* eslint-disable no-unused-vars */
import Navbar from '../components/Navbar';
import HomePage from '../components/HomePage';

import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import About from './pages/About';
import Register from '../components/Register';
import Login from '../components/Login';
import VerifyPage from '../components/VerifyPage';
import ForgotPassword from '../components/ForgetPassword';
import ResetPassword from '../components/RestPassword';
import Logout from '../components/Logout';
import Cookies from 'js-cookie';
import CreateBlogPost from '../components/CreateBlog';


function App() {

  return (
    <>

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/about" element={<About />} />
          <Route path="/verifypage" element={<VerifyPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:id" element={<ResetPassword />} />
          <Route path="/createblog" element={<CreateBlogPost />} />

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
