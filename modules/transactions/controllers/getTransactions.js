const mongoose = require("mongoose");

const getTransactions = async (req, res) => {
  const transactionModel = mongoose.model("transactions");

  //   console.log(req.query); // { transaction_type: 'income' }

  const transactions = await transactionModel.find({
    user_id: req.user._id,
    ...req.query,
  });

  //   req.user._id;

  res.status(200).json({
    status: "success",
    data: transactions,
  });
};
module.exports = getTransactions;
