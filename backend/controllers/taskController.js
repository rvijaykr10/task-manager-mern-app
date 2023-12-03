import Task from "../models/taskModel.js";
// import asyncHandler from "../middleware/asyncHandler";

// get tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ data: tasks });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// add task
const addTask = async (req, res) => {
  try {
    const { task } = req.body;
    await Task.create({ task, user: req.user._id });
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// update task
const updateTask = async (req, res) => {
  const { id, task } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { task },
      { new: true }
    );

    res.status(200).json({ task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// delete task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task) {
      await Task.deleteOne({ _id: task._id });
      res.status(200).json({ message: "deleted" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { getTasks, addTask, updateTask, deleteTask };
