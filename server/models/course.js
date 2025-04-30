const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    coursename: {
      type: String,
      required: true,
    },
    coursecode: {
      type: String,
      required: true,
      unique: true,
    },
    courseimgurl: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    enrolledStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    lecture: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lecture",
      },
    ],
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
