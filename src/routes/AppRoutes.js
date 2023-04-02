import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminHeader from '../AdminPanel/Components/AdminHeader/AdminHeader';
import AdminSidebar from '../AdminPanel/Components/AdminSifebar/AdminSidebar';
import AdminPages from '../AdminPanel/Pages/AdminPages/AdminPages';
import AdminPosts from '../AdminPanel/Pages/AdminPosts/AdminPosts';
import CreatePosts from '../AdminPanel/Pages/AdminPosts/CreatePosts';
import EditPost from '../AdminPanel/Pages/AdminPosts/EditPost';
import Comments from '../AdminPanel/Pages/Comments/Comments';
import EditComment from '../AdminPanel/Pages/Comments/EditComment';
import Dashboard from '../AdminPanel/Pages/Dashboard/Dashboard';
import EditSetting from '../AdminPanel/Pages/Settings/EditSetting';
import Settings from '../AdminPanel/Pages/Settings/Settings';
import Footer from '../components/Footer/Footer';
import FooterWidget from '../components/Footer/FooterWidget';
import Header from '../components/Header/Header';
import SinglePost from '../components/SinglePost/SinglePost';
import About from '../pages/About/About';
import AdminLogin from '../pages/AdminLogin/AdminLogin';
import Blog from '../pages/Blogs/Blog';
import CategorieFilterPosts from '../pages/Categories/CategorieFilterPosts';
import Categories from '../pages/Categories/Categories';
import Contact from '../pages/Contact/Contact';
import Home from "../pages/Home/Home.js";
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import SearchPage from '../pages/SearchPage/SearchPage';
import Danger from "../pages/Userdashboard/Danger/Danger";
import Setting from "../pages/Userdashboard/setting/Setting";
import Userdashboard from '../pages/Userdashboard/Userdashboard';
function AppRoutes() {
const [islogin, setIsLogin] = useState(false);

  return (
    <BrowserRouter>
    {islogin === false && <>
    
      <Header />
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/blogs' element={<Blog />}/>
      <Route path='/blogs/:id' element={<SinglePost />}/>
      <Route path='/categories' element={<Categories />}/>
      <Route path='/categories/filpost' element={<CategorieFilterPosts />}/>
      <Route path='/about' element={<About />}/>
      <Route path='/contact' element={<Contact />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/search' element={<SearchPage />}/>

      <Route path='/admin/login' element={<AdminLogin setIsLogin={setIsLogin}/>}/>

      <Route path='/user/dashboard' element={<Userdashboard />}>
      <Route path="/user/dashboard" element={<Setting />}/>
      <Route path="/user/dashboard/danger" element={<Danger />}/>
      <Route path="/user/dashboard/danger" element={<Danger />}/>
      </Route>
    </Routes>
    <FooterWidget />
    <Footer />
    </>}


      {islogin && <>
        <AdminHeader setIsLogin={setIsLogin}/>
    <Routes>
    <Route path='/' element={<Dashboard />}/>
      <Route path='/dashboard' element={<Dashboard />}/>
      <Route path='/posts' element={<AdminPosts />}/>
      <Route path='/posts/create' element={<CreatePosts />}/>
      <Route path='/posts/:id' element={<EditPost />}/>
      <Route path='/comment/:id' element={<EditComment />}/>
      <Route path='/pages' element={<AdminPages />}/>
      <Route path='/comments' element={<Comments />}/>
      <Route path='/settings' element={<Settings />}/>
      <Route path='/settings/:id' element={<EditSetting />}/>
    </Routes>
      <AdminSidebar />
      </>}

    </BrowserRouter>
  )
}

export default AppRoutes;
