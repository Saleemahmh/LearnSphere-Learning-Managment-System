import React,{useEffect, useState} from 'react';
import axios from "axios";
import Loader from '../components/Loader/Loader';
import CourseCard from '../components/CourseCard/CourseCard';
const Courses = () => {
   const [data, setData] = useState();
  
      useEffect(() => {
          const fetch = async () =>{
             const response = await axios.get("http://localhost:5000/auth/courses");
             setData(response.data.data);
          };
          fetch();
      },[]);
  return (
    <div className='bg-cyan-700 h-auto px-12 py-8'>
       <h4 className="text-3xl font-fredrick text-cyan-200">
   All Courses
    </h4>
    {!data && <div className="flex items-center justify-center my-8"><Loader/>{" "}</div>}
    <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {data && data.map((items,i)=>(
            <div key={i}>
                <CourseCard data={items} /> {" "}
            </div>
        ))}

    </div></div>
  )
}

export default Courses