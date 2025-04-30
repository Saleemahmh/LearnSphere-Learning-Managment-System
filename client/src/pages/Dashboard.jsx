import React,{useEffect, useState} from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from "../components/Profile/Sidebar";
import axios from 'axios';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader/Loader';
const Dashboard = () => {
  //const isLoggedIn = useSelector();
  const [profile, setProfile] = useState()
const headers = {
  id:localStorage.getItem("id"),
  authorization:`Bearer ${localStorage.getItem("token")}`,
};

  useEffect(() =>{
    const fetch = async ()=>{
      const response = await axios.get("http://localhost:5000/auth/getuserinfo",{headers});
      setProfile(response.data);
    };
    fetch();
  },[])

  return (
    <div className='bg-cyan-900 px-2 md:px-12 flex flex-col md:flex-row h-screen py-8 gap-4 text-cyan-200'>
      {!profile? (
        <div className='w-full justify-center h-[100%] items-center flex'>
          <Loader/></div>
        ) : (
         <>
          <div className='w-full md:w-1/6'>
              <Sidebar data ={profile}/>
          </div>
          <div className='w-full md:w-5/6'>
              <Outlet/>
          </div>
          </>)}



        
    </div>
  )
}

export default Dashboard