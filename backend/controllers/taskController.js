const Task = require("../models/Task");

exports.getallTask = async (req, res) => {
  try {
    const tasks = await Task.find({userId: req.user.id});
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

exports.addTask = async (req, res) => {
  try {
    const newTask = new Task({ ...req.body, userId: req.user.id });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Error adding task", error });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { taskid } = req.params;
    const updatedTask = await Task.findOneAndUpdate({ _id: taskid, userId: req.user.id }, req.body, {
      new: true,
    });
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { taskid } = req.params;
    const deletedTask = await Task.findOneAndDelete({ _id: taskid, userId: req.user.id });
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};

exports.getTaskByMonth = async (req, res) => {
  try {
    const { month } = req.params; // e.g., "2025-08"

    const [year, monthNum] = month.split('-').map(Number);

    const startDate = new Date(year, monthNum - 1, 1); // first day of month
    const endDate = new Date(year, monthNum, 0, 23, 59, 59, 999); // last day of month

    const tasks = await Task.find({
      userId: req.user.id,
      date: { $gte: startDate, $lte: endDate }
    });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks by date", error });
  }
};

exports.updateCompleteState = async (req, res) => {
  try {
    const { taskid } = req.params;
    const task = await Task.findById(taskid);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskid, userId: req.user.id },
      { completed: !task.completed },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task completion state:", error);
    res
      .status(500)
      .json({ message: "Error updating task completion state", error });
  }
};
