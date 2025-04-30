import React, { useEffect } from 'react'
import {Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home'
import Courses from './pages/Courses';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth';
import CourseForm from './pages/CourseForm';
import UserProfile from './components/Profile/UserProfile';
import UserDashboard from './components/Profile/UserDashboard';
const App = () => {

  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    if(
      localStorage.getItem("id")&&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
  ){
    dispatch(authActions.login());
    dispatch(authActions.changeRole(localStorage.getItem("role")));
  }
  },[])
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route path="/allcourses" element={<Courses/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}>
        <Route index element={<UserProfile/>}/>
        <Route path="/dashboard/addcourses" element={<CourseForm/>}/>
        <Route path="/dashboard/coursedashboard" element={<UserDashboard/>}/>
        </Route>
      </Routes>
      <Footer></Footer>
    </div>
  )
}

export default App