const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  currentValue:{
    type: Number,
    default: 1,
    required: true,
  },
  targetValue: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["fitness", "career", "personal", "learning", "financial"],
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  createdAt:{
    type: Date,
    default: Date.now,
  },
  progress: {
    type: Number,
  }
});

const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;
