const express = require("express");
const courseRouter = express.Router();
const courseController = require("../controllers/courseController");

courseRouter.get("/", courseController.getAllCourses);

courseRouter.post("/create", courseController.createCourse);

courseRouter.get("/:id", courseController.getCourse);

courseRouter.put("/:id/update", courseController.updateCourses);

courseRouter.delete("/:id/delete", courseController.deleteCourses);

module.exports = courseRouter;
