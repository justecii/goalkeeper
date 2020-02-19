const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GoalSchema = new Schema({
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
  username: {
    type: String
  },
  subgoals: {
    type: [Schema.Types.ObjectId],
    ref: "Subgoals"
  },
  goalTarget: {
    type: String,
    required: true
  },
  currentProgress: {
    type: String
  },
  progressPercent: {
    type: String
  }
});

GoalSchema.index({
  "$**": "text"
});

module.exports = mongoose.model("Goal", GoalSchema);
