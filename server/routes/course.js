const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Course = require("../models/course");
const { storage } = require("../config/cloudinary");
const { authenticateToken } = require("./userAuth");
const multer = require("multer");

const upload = multer({ storage });
//add course
router.post(
  "/addcourse",
  upload.single("courseimgurl"),
  authenticateToken,
  async (req, res) => {
    try {
      // to check the id of the user
      const { id } = req.headers;
      const { coursename, coursecode, description, price, instructor } =
        req.body;
      const courseimgurl = req.file?.path;
      const user = await User.findById(id);
      if (user.role !== "admin") {
        return res
          .status(200)
          .json({ message: "You don't have access to do this feature" });
      }
      const course = new Course({
        coursename,
        coursecode,
        courseimgurl,
        description,
        price,
        instructor,
      });

      /* const course = new Course({
        coursename: req.body.coursename,
        coursecode: req.body.coursecode,
        courseimgurl: req.body.courseimgurl,
        description: req.body.description,
        price: req.body.price,
        instructor: req.body.instructor,
      }); */
      await course.save();
      res
        .status(200)
        .json({ message: "Course created successfully!!", course });
    } catch (error) {
      console.log(`An error occurred: ${error}`);
      return res
        .status(500)
        .json({ message: `An error occurred: ${error.message}` });
    }
  }
);

//update course

router.put("/updatecourse", authenticateToken, async (req, res) => {
  try {
    // to check the courseid of the course
    const { courseid } = req.headers;
    await Course.findByIdAndUpdate(courseid, {
      coursename: req.body.coursename,
      coursecode: req.body.coursecode,
      description: req.body.description,
      price: req.body.price,
      instructor: req.body.instructor,
    });
    return res.status(200).json({ message: "Course updated successfully!!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: `An error occurred: ${error.message}` });
  }
});

//delete course
router.delete("/deletecourse", authenticateToken, async (req, res) => {
  try {
    const { courseid } = req.headers;
    await Course.findByIdAndDelete(courseid);
    return res.status(200).json({
      message: "Course deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: `An error occurred: ${error.message}` });
  }
});

//get all course

router.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find()
      .sort({ createdAt: -1 })
      .populate("instructor");
    return res.json({
      status: "Success",
      data: courses,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: `An error occurred: ${error.message}` });
  }
});

//get recent courses limit to 4

router.get("/newcourses", async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 }).limit(4);
    return res.json({
      status: "Success",
      data: courses,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: `An error occurred: ${error.message}` });
  }
});

//get courses by id

router.get("/course/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    return res.json({
      status: "Success",
      data: course,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: `An error occurred: ${error.message}` });
  }
});

module.exports = router;
