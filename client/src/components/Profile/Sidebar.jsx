import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { RxAvatar } from "react-icons/rx";
import { FaBook } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';

const Sidebar = ({data}) => {
  const dispatch = useDispatch();
  const navigate= useNavigate();
  return (
    <div className='bg-cyan-500 rounded flex flex-col items-center justify-between p-4 font-tapestry text-cyan-950 h-[100%]'>
      <div className='flex items-center flex-col justify-center'>
        {" "}
      <img src='/avatar.png' className='h-[12vh]'/>
      <p className="mt-3 text-xl text-cyan-950 font-tapestry">{data.name}</p>
      <p className="mt-1 text-normal text-cyan-800 font-tapestry"> {data.email}</p>
      <div className="w-full mt-4 h-[1px] bg-cyan-500 hidden lg:block"></div>

      </div>
      <div className='w-full flex-col items-center justify-center hidden lg:flex'>
        <Link to="/dashboard" className='text-cyan-100 font-fredrick w-full py-2 flex items-center justify-center  text-center hover:bg-cyan-900 rounded transition-all duration-300'>
        Profile <RxAvatar className="ms-3"/>
        </Link>
        <Link to="/dashboard/addcourses" className='text-cyan-100 font-fredrick w-full py-2 flex items-center justify-center  text-center hover:bg-cyan-900 rounded transition-all duration-300'>
        Courses<FaBook className="ms-3"/>
        </Link>
        <Link to="/dashboard/coursedashboard" className='text-cyan-100 font-fredrick w-full py-2 flex items-center justify-center  text-center hover:bg-cyan-900 rounded transition-all duration-300'>
        Dashboard <MdDashboard className="ms-3"/>
        </Link>
      </div>
      <button className='bg-cyan-900 w-3/6 lg:w-full mt-4 lg:mt-0 text-cyan-200 font-fredrick flex items-center justify-center hover:bg-cyan-700 rounded transition-all duration-300' onClick={() => {
                      dispatch(authActions.logout());
                      dispatch(authActions.changeRole("user"));
                      localStorage.clear("id");
                      localStorage.clear("token");
                      localStorage.clear("role");
                      navigate("/")
                    }}>
      Log Out <FaArrowRightFromBracket className="ms-4"/>
      </button>
    </div>
  )
}

export default Sidebar