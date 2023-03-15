const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth");

// POST ------------------------

exports.createUser = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  try {
    const user = new User({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      zipCode: req.body.zipCode,
    });

    // Valider si le user existe déja
    const oldUser = await User.findOne({ email: user.email });
    if (oldUser) {
      return res.status(200).send({
        success: false,
        message: "User already exists, please login",
      });
    }
    await user.save();
    user.token = jwt.sign(
      { user_id: user.id, user_email: user.email },
      process.env.TOKEN_KEY,
      { expiresIn: "2h" }
    );
    res.send(user);
  } catch (err) {
    res.send(err);
  }
};

//GET ALL------------------------

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.send(err);
  }
};

//GET BY ID------------------------

exports.getUser = async (req, res) => {
  try {
    const users = await User.findById(req.params.id);
    res.send(users);
  } catch (err) {
    res.send(err);
  }
};

/* -----------------LOGIN________________________ */

exports.login = async (req, res) => {
  try {
    // On recupere l'email et le password du req
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).send({
        success: false,
        message: "All input are required",
      });
    }
    // on trouve le user en fct de email
    const user = await User.findOne({ email });
    //si ya pas user:
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user.id, email },
        process.env.TOKEN_KEY,
        { expiresIn: "2h" }
      );
      user.token = token;
      return res.status(200).send({
        success: true,
        message: "Le user a  été Trouvé",
        user,
      });
    } else {
      return res.status(400).send({
        success: false,
        message: "Wrong email or password",
      });
    }
    // om compare le password avec celui hashé
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE ----------------------

exports.updateUser = async (req, res) => {
  try {
    await User.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.send({ message: "User updated" });
  } catch (err) {
    console.error(err);
  }
};

// DELETE -------------

exports.deleteUser = async (req, res) => {
  try {
    await User.findOneAndDelete({ _id: req.params.id });
    res.send({ message: "User deleted" });
  } catch (err) {
    console.error(err);
  }
};

// LOGOUT --------------

exports.logout = async (req, res) => {
  User.findById(req.user._id).then((rUser) => {
    req.logout();
    res.send({ message: "Logout Success" });
    // res.redirect("/");
  });
};
