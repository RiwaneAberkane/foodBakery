const express = require("express");
const subscriberRouter = express.Router();
const subscriberController = require("../controllers/subscriberController");
const verifyToken = require("../middleware/auth");

subscriberRouter.get("/", subscriberController.getAllSubscribers);

subscriberRouter.post("/create", subscriberController.createSubscriber);

subscriberRouter.get("/:id", subscriberController.getSubscriber);

subscriberRouter.put(
  "/:id/update",
  verifyToken,
  subscriberController.updateSubscriber
);

subscriberRouter.delete(
  "/:id/delete",
  verifyToken,
  subscriberController.deleteSubscriber
);

module.exports = subscriberRouter;
