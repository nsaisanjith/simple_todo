const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
exports.signUp = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  bcrypt
    .hash(password, 8)
    .then((hashPassword) => {
      const user = new User({
        name,
        email,
        password: hashPassword,
      });
      return user.save();
    })
    .then((user) => {
      res.status(201).json({
        user,
        message: "user created",
      });
    })
    .catch((e) => {
      if (!e.status) {
        e.status = 500;
      }
      next(e);
    });
};
exports.signIn = (req, res, next) => {
  let userinfo;
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (!user) {
        const error = new Error("User Not Found");
        error.status = 404;
        throw error;
      }

      userinfo = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((isValid) => {
      console.log(req.body);
      if (!isValid) {
        const error = new Error("Incorrect Password");
        error.status = 404;
        throw error;
      }
      const token = jwt.sign(
        {
          userId: userinfo._id,
        },
        "secrete",
        { expiresIn: "1hr" }
      );

      res.status(200).json({
        user: userinfo,
        message: "loggedIn",
        token,
      });
    })
    .catch((e) => {
      if (!e.status) {
        e.status = 500;
      }
      next(e);
    });
};
