const express = require("express");
const subscriberRouter = express.Router();
const subscriberController = require("../controllers/subscriberController");

subscriberRouter.get("/", subscriberController.getAllSubscribers);

subscriberRouter.post("/create", subscriberController.createSubscriber);

subscriberRouter.get("/:id", subscriberController.getSubscriber);

subscriberRouter.put("/:id/update", subscriberController.updateSubscriber);

subscriberRouter.delete("/:id/delete", subscriberController.deleteSubscriber);

module.exports = subscriberRouter;
