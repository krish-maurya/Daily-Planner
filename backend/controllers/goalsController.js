const Goals = require("../models/Goals");

exports.getallGoals = async (req, res) => {
  try {
    const goals = await Goals.find();
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ message: "Error fetching goals", error });
  }
};

exports.addGoals = async (req, res) => {
  try {
    const newGoals = new Goals(req.body);
    await newGoals.save();
    res.status(201).json(newGoals);
  } catch (error) {
    res.status(500).json({ message: "Error adding goal", error });
  }
};

exports.updateGoals = async (req, res) => {
  try {
    const { goalId } = req.params;
    const updatedGoals = await Goals.findByIdAndUpdate(goalId, req.body, {
      new: true,
    });
    if (!updatedGoals) {
      return res.status(404).json({ message: "Goals not found" });
    }
    res.status(200).json(updatedGoals);
  } catch (error) {
    res.status(500).json({ message: "Error updating goal", error });
  }
};

exports.deleteGoals = async (req, res) => {
  try {
    const { goalId } = req.params;
    console.log(goalId)
    const deletedGoals = await Goals.findByIdAndDelete(goalId);
    if (!deletedGoals) {
      return res.status(404).json({ message: "Goals not found" });
    }
    res.status(200).json({ message: "Goals deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting goal", error });
  }
};

exports.getGoalsByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const goals = await Goals.find({ date: date });
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ message: "Error fetching goals by date", error });
  }
};

exports.updateProgress = async (req, res) => {
  try {
    const { goalId } = req.params;
    const {currentValue} = req.body;
    const goal = await Goals.findById(goalId);
    if (!goal) {
      return res.status(404).json({ message: "Goals not found" });
    }
    const updatedGoals = await Goals.findByIdAndUpdate(
      goalId,
      { currentValue: currentValue },
      { new: true }
    );

    if (!updatedGoals) {
      return res.status(404).json({ message: "Goals not found" });
    }

    res.status(200).json(updatedGoals);
  } catch (error) {
    console.error("Error updating goal completion state:", error);
    res
      .status(500)
      .json({ message: "Error updating goal completion state", error });
  }
};
