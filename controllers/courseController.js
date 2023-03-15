const Course = require("../models/course");
const User = require("../models/user");

// POST ------------------------

exports.createCourse = async (req, res) => {
  try {
    const course = new Course({
      title: req.body.title,
      description: req.body.description,
      maxStudents: req.body.maxStudents,
      cost: req.body.cost,
    });
    await course.save();
    res.send(course);
  } catch (err) {
    res.send(err);
  }
};

//GET ALL------------------------

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.send(courses);
  } catch (err) {
    res.send(err);
  }
};

//GET BY ID------------------------

exports.getCourse = async (req, res) => {
  try {
    const courses = await Course.findById(req.params.id);
    res.send(courses);
  } catch (err) {
    res.send(err);
  }
};

// UPDATE ----------------------

exports.updateCourses = async (req, res) => {
  try {
    await Course.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.send({ message: "Course updated" });
  } catch (err) {
    console.error(err);
  }
};

// DELETE -------------

exports.deleteCourses = async (req, res) => {
  try {
    await Course.findOneAndDelete({ _id: req.params.id });
    res.send({ message: "Course deleted" });
  } catch (err) {
    console.error(err);
  }
};
