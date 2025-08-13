const Task = require("../models/Task");

exports.getallTask = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

exports.addTask = async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Error adding task", error });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { taskid } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(taskid, req.body, {
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
    const deletedTask = await Task.findByIdAndDelete(taskid);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};

exports.getTaskByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const tasks = await Task.find({ date: date });
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
    const updatedTask = await Task.findByIdAndUpdate(
      taskid,
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
