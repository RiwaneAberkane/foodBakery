const Subscriber = require("../models/subscriber");

// POST ------------------------

exports.createSubscriber = async (req, res) => {
  try {
    const subscriber = new Subscriber({
      name: req.body.name,
      email: req.body.email,
      zipCode: req.body.zipCode,
    });
    const isSubscriber = await Subscriber.findOne({ email: req.body.email });
    if (isSubscriber) {
      subscriber.token = jwt.sign(
        { subscriber_id: subscriber.id, subscriber_email: subscriber.email },
        process.env.TOKEN_KEY,
        { expiresIn: "2h" }
      );
      res.status(200).send({ status: "success", message: "Déjà abbonné" });
    } else {
      await subscriber.save();
      subscriber.token = jwt.sign(
        { subscriber_id: subscriber.id, subscriber_email: subscriber.email },
        process.env.TOKEN_KEY,
        { expiresIn: "2h" }
      );
      res
        .status(200)
        .send({ status: "success", message: "L'utilisateur s'abonne" });
    }
    await subscriber.save();
    res.send(subscriber);
  } catch (err) {
    res.send(err);
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
