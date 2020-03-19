const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AssetSchema = new Schema({
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
  currentValue: {
    type: Number,
    required: true
  },
  interestRate: {
    type: Number
  },
  quantity: {
    type: Number
  },
  user: {
    type: [Schema.Types.ObjectId],
    ref: "User"
  }
});

AssetSchema.index({
  "$**": "text"
});

module.exports = mongoose.model("Asset", AssetSchema);
