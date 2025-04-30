import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const CourseForm = () => {
  const navigate = useNavigate();

  const [formData,setFormData] = useState({
    coursename:"",
    coursecode:"",
    description:"",
    price:"",
    courseimgurl:"",
  })
const [previewThumbnail,setPreviewThumbnail]= useState()
const [successMessage,setSuccessMessage] = useState("")

const handleChange = (e)=>{
  const {name,value} = e.target;
  setFormData({...formData,[name]:value})
}

const selectThumbnail = (e)=>{
  const file = e.target.files?.[0];
  if(file){
    setFormData({...formData,courseimgurl:file});
    const fileReader = new FileReader()
    fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
    fileReader.readAsDataURL(file)
  }
}

const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    const course_form = new FormData()

    for (var key in formData) {
      course_form.append(key, formData[key])
    }
    const headers = {
      id:localStorage.getItem("id"),
      authorization:`Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data",
    };
    
    const response = await axios.post("http://localhost:5000/auth/addcourse", course_form,{headers});
  setSuccessMessage("Course has been created successfully!");
  console.log("Success triggered");
  console.log(response.data.message);
  setTimeout(() => {
    navigate("/dashboard");
  }, 2000); // 2-second delay

  } catch (err) {
    console.log("Course could not be added", err.message)
  }
}
  return (
    <>
    <div className="relative bg-cyan-500 h-[100%] rounded shadow-md overflow-y-auto">
      <div className="p-16 ">
        <h2 className="text-xl font-fredrick text-cyan-100 mb-2">
          Basic Course Information.
        </h2>
        <p className="text-gray-600 mb-4">

          Make sure to click save once you have given all the course
          information.
        </p>
        <form className="course_form" onSubmit={handleSubmit}>
        <div className="absolute top-4 right-4 space-x-2">
          <button className="bg-cyan-900 text-cyan-100 font-fredrick px-4 py-2 rounded hover:bg-cyan-700 rounded transition-all duration-300 text-sm">
            Publish
          </button>
          <button className="bg-cyan-900 text-cyan-100 font-fredrick px-4 py-2 rounded hover:bg-cyan-700 rounded transition-all duration-300 text-sm">
            Delete
          </button>
        </div>
        <div className="m-8">
          <label
            className="block text-cyan-900 text-xl font-tapestry mb-2"
            htmlFor="coursename"
          >
            Course Name
          </label>
          <input
            className="shadow appearance-none border border-cyan-100 bg-cyan-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="coursename"
            value={formData.coursename}
            onChange={handleChange}
            type="text"
            name="coursename"
            placeholder="Course Title"
          />
        </div>
        <div className="m-8">
          <label
            className="block text-cyan-900 text-xl font-tapestry mb-2"
            htmlFor="coursecode"
          >
            Course Code
          </label>
          <input
            className="shadow appearance-none border border-cyan-100 bg-cyan-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="coursecode"
            value={formData.coursecode}
            onChange={handleChange}
            type="text"
            name="coursecode"
            placeholder="Course Code"
          />
        </div>
        <div className="m-8">
          <label
            className="block text-cyan-900 text-xl font-tapestry mb-2"
            htmlFor="description"
          >
            Course Description
          </label>
          <input
            className="shadow appearance-none border border-cyan-100 bg-cyan-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            value={formData.description}
            onChange={handleChange}
            name="description"
            type="text"
            placeholder="description"
          />
        </div>
        <div className="m-8">
          <label
            className="block text-cyan-900 text-xl font-tapestry mb-2"
            htmlFor="price"
          >
            Course Price
          </label>
          <input
            className="shadow appearance-none border border-cyan-100 bg-cyan-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            value={formData.price}
            onChange={handleChange}
            name="price"
            type="number"
            placeholder="price"
          />
        </div>
        <div className="m-8">
          <label
            className="block text-cyan-900 text-xl font-tapestry mb-2"
            htmlFor="courseimgurl"
          >
            Course Thumbnail
          </label>
          <input
            type="file"
            name="courseimgurl"
            onChange={selectThumbnail}
            className="w-fit shadow appearance-none border border-cyan-100 bg-cyan-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="courseimgurl"
            accept="image/*"
            placeholder="Images"
          />
          {
            previewThumbnail && (
              <img src={previewThumbnail} alt="thumbnail" className="w-64 my-2"></img>
            )
          }
        </div>
        <div className="flex gap-2">
          <button
            className="bg-cyan-900 text-cyan-100 font-fredrick px-4 py-2 rounded hover:bg-cyan-700 rounded transition-all duration-300 text-sm"
            onClick={() => navigate("/dashboard")}
          >
            Cancel
          </button>
          <button type="submit"
            className="bg-cyan-900 text-cyan-100 font-fredrick px-4 py-2 rounded hover:bg-cyan-700 rounded transition-all duration-300 text-sm"
          >
            Save
          </button>
          
    
        </div>    
       </form>
      </div>
    </div>
    {successMessage && (
<div class="bg-cyan-900 text-center py-4 lg:px-4">
  <div class="p-2 bg-cyan-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
    <span class="flex rounded-full bg-cyan-500 uppercase px-2 py-1 text-xs font-fredrick mr-3">Success!!</span>
    <span class="font-tapestry mr-2 text-left flex-auto">{successMessage}</span>
    <svg class="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
  </div>
</div>
  )}
    </>
  );
};

export default CourseForm;
