const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middleware/auth");

userRouter.get("/", userController.getAllUsers);

userRouter.post("/create", userController.createUser);

userRouter.post("/login", userController.login);

userRouter.post("/logout", userController.logout);

userRouter.get("/:id", userController.getUser);

userRouter.put("/:id/update", verifyToken, userController.updateUser);

userRouter.delete("/:id/delete", verifyToken, userController.deleteUser);

module.exports = userRouter;
