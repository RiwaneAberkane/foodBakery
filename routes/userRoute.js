const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");

userRouter.get("/", userController.getAllUsers);

userRouter.post("/create", userController.createUser);

userRouter.post("/login", userController.login);

// userRouter.post("logout");

userRouter.get("/:id", userController.getUser);

userRouter.put("/:id/update", userController.updateUser);

userRouter.delete("/:id/delete", userController.deleteUser);

module.exports = userRouter;
