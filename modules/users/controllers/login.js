const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwtManager = require("../../../managers/jwtManager");
const jsonwebtoken = require("jsonwebtoken");

const login = async (req, res) => {
  const usersModel = mongoose.model("users");

  const { email, password } = req.body;

  const getUser = await usersModel.findOne({
    email: email,
  });

  if (!getUser) throw "This email does not exits in the system";

  // console.log(getUser);

  const comparePassword = await bcrypt.compare(password, getUser.password);
  // console.log(password, getUser.password);
  // console.log(comparePassword);

  if (!comparePassword) throw "Email and password do not match";

  // used to create a valid id card for a user to authenticate them
  const accessToken = jwtManager(getUser);

  // Success response
  res.status(200).json({
    status: "Success",
    message: "User logged in successfully",
    accessToken,
  });
};
module.exports = login;
