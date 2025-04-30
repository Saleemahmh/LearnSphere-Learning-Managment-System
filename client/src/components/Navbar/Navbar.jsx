import { useState } from "react";
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import {authActions} from '../../store/auth';
import {useDispatch, useSelector} from 'react-redux';
const Navbar = () => {
  const dispatch = useDispatch();
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Courses",
      link: "/allcourses",
    },
    {
      title: "Dashboard",
      link: "/dashboard",
    },
  ];
  const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn);
  console.log(isLoggedIn);

  if(isLoggedIn === false){
    links.splice(2,2);
  }

  const [mobileNav, setMobileNav] = useState("hidden");
  return (
    <>
      <nav className="z-50 relative flex bg-cyan-950 text-cyan-200 px-8 py-4 items-center justify-between">
        <div className="flex items-center">
          <img
            className="h-10 me-4"
            src="/calligraphy-pen_3730113.png"
            alt="logo"
          ></img>
          <Link to='/'>
          <h1 className="text-2xl font-fredrick">LearnSphere</h1>
          </Link>
          
        </div>
        <div className="nav-links-learnsphere font-tapestry block md:flex items-center gap-4">
          <div className="hidden md:flex gap-4">
            {links.map((items, i) => (
              <Link
                to={items.link}
                className="hover:text-cyan-500 transition-all duration-300"
                key={i}
              >
                {items.title}{" "}
              </Link>
            ))}
          </div>
          {isLoggedIn === false && (
            <div className="hidden md:flex gap-4">
            <Link
              to="/login"
              className="hover:bg-cyan-500 hover:text-cyan-800 px-2 py-1 border border-cyan-500 rounded"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="hover:bg-cyan-800 hover:text-cyan-200 px-2 py-1 bg-cyan-500 text-cyan-950 rounded"
            >
              Register
            </Link>
          </div>
          )}
          {isLoggedIn === true && (
            <div className="hidden md:flex gap-4">
              <Link
              to="/"
              className="hover:bg-cyan-500 hover:text-cyan-800 px-2 py-1 border border-cyan-500 rounded"
              onClick={() => {
                dispatch(authActions.logout());
              }}
            >
              Log Out
            </Link>
          </div>
          )}
          <button
            className="text-cyan-200 text-2xl hover:text-cyan-400 lg:hidden"
            onClick={() =>
              mobileNav === "hidden"
                ? setMobileNav("block")
                : setMobileNav("hidden")
            }
          >
            <FaGripLines />
          </button>
        </div>
      </nav>

      <div className={`${mobileNav} bg-cyan-600 text-cyan-200 h-screen absolute font-tapestry top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
        {links.map((items, i) => (
          <Link
            to={items.link}
            className={`{${mobileNav} text-4xl mb-4 font-semibold font-tapestry hover:text-cyan-950 transition-all duration-300`}
            key={i}
            onClick={() =>
              mobileNav === "hidden"
                ? setMobileNav("block")
                : setMobileNav("hidden")
            }
          >
            {items.title}{" "}
          </Link>
        ))}
        {isLoggedIn=== false &&(
          <>
          <Link
          to="/login"
          className={`${mobileNav} px-8 mb-8 text-4xl font-semibold hover:bg-cyan-500 hover:text-cyan-800 py-2 border border-cyan-500 transition-all duration-300 rounded`}
        >
          Login
        </Link>
        <Link
          to="/register"
          className={`${mobileNav} px-8 mb-8 text-4xl font-semibold hover:bg-cyan-800 hover:text-cyan-200 py-2 bg-cyan-500 text-cyan-950 transition-all duration-300 rounded`}
        >
          Register
        </Link>
        </>
        )}
      </div>
    </>
  );
};

export default Navbar;
