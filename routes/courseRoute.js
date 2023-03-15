const express = require("express");
const courseRouter = express.Router();
const courseController = require("../controllers/courseController");
const verifyToken = require("../middleware/auth");

courseRouter.get("/", courseController.getAllCourses);

courseRouter.post("/create", verifyToken, courseController.createCourse);

courseRouter.get("/:id", courseController.getCourse);

courseRouter.put("/:id/update", verifyToken, courseController.updateCourses);

courseRouter.delete("/:id/delete", verifyToken, courseController.deleteCourses);

module.exports = courseRouter;
