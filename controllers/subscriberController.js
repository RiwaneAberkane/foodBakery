const Subscriber = require("../models/subscriber");
const jwt = require("jsonwebtoken");

// POST ------------------------

exports.createSubscriber = async (req, res) => {
  try {
    const { name, email, zipCode } = req.body;
    const subscriber = await Subscriber.create(req.body);

    subscriber.token = jwt.sign(
      { subscriber_id: subscriber.id, subscriber_email: subscriber.email },
      process.env.TOKEN_KEY,
      { expiresIn: "2h" }
    );

    res.status(200).send({
      status: "success",
      message: "L'utilisateur s'abonne",
      subscriber,
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "error created",
    });
  }
};

//GET ALL------------------------

exports.getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.send(subscribers);
  } catch (err) {
    res.send(err);
  }
};

//GET BY ID------------------------

exports.getSubscriber = async (req, res) => {
  try {
    const subscribers = await Subscriber.findById(req.params.id);
    res.send(subscribers);
  } catch (err) {
    res.send(err);
  }
};

// UPDATE ----------------------

exports.updateSubscriber = async (req, res) => {
  try {
    await Subscriber.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.send({ message: "Subscriber updated" });
  } catch (err) {
    console.error(err);
  }
};

// DELETE -------------

exports.deleteSubscriber = async (req, res) => {
  try {
    await Subscriber.findOneAndDelete({ _id: req.params.id });
    res.send({ message: "Subscriber deleted" });
  } catch (err) {
    console.error(err);
  }
};
