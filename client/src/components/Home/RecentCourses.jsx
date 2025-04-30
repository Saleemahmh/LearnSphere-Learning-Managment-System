import React,{useEffect, useState} from 'react';
import axios from "axios";
import CourseCard from '../CourseCard/CourseCard';
import Loader from '../Loader/Loader';
const RecentCourses = () => {
    const [data, setData] = useState();

    useEffect(() => {
        const fetch = async () =>{
           const response = await axios.get("http://localhost:5000/auth/newcourses");
           setData(response.data.data);
        };
        fetch();
    },[]);
  return (
    <div className="mt-8 px-4">
        <h4 className="text-3xl font-fredrick text-cyan-200">
        Recently added Courses
        </h4>
        {!data && <div className="flex items-center justify-center my-8"><Loader/>{" "}</div>}
        <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
            {data && data.map((items,i)=>(
                <div key={i}>
                    <CourseCard data={items} /> {" "}
                </div>
            ))}

        </div>
    </div>
  )
}

export default RecentCourses