const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwtManager = require("../../../managers/jwtManager");
const emailManager = require("../../../managers/emailManager");

const register = async (req, res) => {
  const usersModel = mongoose.model("users");

  const { email, password, confirm_password, name, balance } = req.body;

  const getDuplicateEmail = await usersModel.findOne({
    email: email,
  });

  //   Validations:
  if (getDuplicateEmail) throw "This email already exists!";
  if (!name) throw "Name is required!";
  if (!email) throw "Email must be provided!";
  if (!password) throw "Password must be provided!";
  if (password.length < 5) throw "Password must be at least 5 characters long.";
  if (password !== confirm_password)
    throw "Password and confirmed password does not match!";

  const hashedPasssword = await bcrypt.hash(password, 12);

  const createdUser = await usersModel.create({
    name,
    email,
    password: hashedPasssword,
    balance,
  });

  const accessToken = jwtManager(createdUser);

  await emailManager(
    createdUser.email,
    "Welcome to expense tracker. We hope you can manage your expenses easily from our platform.",
    "<h1>Welcome to expense tracker.</h1><br/><br/> We hope you can manage your expenses easily from our platform.",
    "Welcome to expense tracker!"
  );

  res.status(201).json({
    status: "User registered successfully",
    accessToken,
  });
};

module.exports = register;
