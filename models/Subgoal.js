const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubgoalSchema = new Schema({
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
  goal: {
    type: [Schema.Types.ObjectId],
    ref: "Goals"
  },
  goalTarget: {
    type: String,
    required: true
  },
  targetDate: {
    type: Date
  },
  currentProgress: {
    type: String
  },
  progressPercent: {
    type: String
  }
});

SubgoalSchema.index({
  "$**": "text"
});

module.exports = mongoose.model("Subgoal", SubgoalSchema);
