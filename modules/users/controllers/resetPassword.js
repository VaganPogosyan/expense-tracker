const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const emailManager = require("../../../managers/emailManager");

const resetPassword = async (req, res) => {
  const usersModel = mongoose.model("users");

  const { email, new_password, reset_code } = req.body;

  if (!email) throw "Email is required";
  if (!new_password) throw "Please provide new password";
  if (!reset_code) throw "Reset code is required";
  if (new_password < 5) throw "Password must be at least 5 characters long";

  const getUserWithRestCode = await usersModel.findOne({
    email: email,
    reset_code: reset_code,
  });

  if (!getUserWithRestCode) throw "Reset code does not match";

  const hashedPasssword = await bcrypt.hash(new_password, 12);

  await usersModel.updateOne(
    { email: email },
    {
      password: hashedPasssword,
      reset_code: "",
    },
    { runValidators: true }
  );

  await emailManager(
    email,
    "Your password is reset successfully!",
    "Your password is reset successfully!",
    "Password reset successfully!"
  );

  res.status(200).json({
    status: "Password is reset successfully",
  });
};
module.exports = resetPassword;
