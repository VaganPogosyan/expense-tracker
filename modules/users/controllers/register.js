const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

  await usersModel.create({
    name,
    email,
    password: hashedPasssword,
    balance,
  });

  res.status(201).json({
    status: "User registered successfully",
  });
};

module.exports = register;