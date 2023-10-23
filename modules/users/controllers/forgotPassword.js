const mongoose = require("mongoose");
const emailManager = require("../../../managers/emailManager");

const forgotPassword = async (req, res) => {
  const usersModel = mongoose.model("users");

  const { email } = req.body;
  if (!email) throw "Email is required!";

  const getUser = await usersModel.findOne({
    email: email,
  });

  if (!getUser) throw "This email does not exist in the system";

  const resetCode = Math.floor(10000 + Math.random() * 90000);

  await usersModel.updateOne(
    { email: email },
    { reset_code: resetCode },
    { runValidators: true }
  );

  await emailManager(
    email,
    "Youre paswrod rest code is " + resetCode,
    "Youre paswrod rest code is " + resetCode,
    "Reset your password"
  );

  res.status(200).json({
    status: "Reset code sent to email successfully",
  });
};

module.exports = forgotPassword;
