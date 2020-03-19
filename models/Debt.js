const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DebtSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  currentDebt: {
    type: Number,
    required: true
  },
  totalCreditLine: {
    type: Number
  },
  interestRate: {
    type: Number
  },
  debtAtCreation: {
    type: Number,
    required: true
  },
  user: {
    type: [Schema.Types.ObjectId],
    ref: "User"
  }
});

DebtSchema.index({
  "$**": "text"
});

module.exports = mongoose.model("Debt", DebtSchema);
