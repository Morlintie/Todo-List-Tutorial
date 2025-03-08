const Task = require("../db/connect.js");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks: tasks });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const getThatTask = async (req, res) => {
  try {
    const { id } = req.params;

    const thatTask = await Task.findOne({ _id: id });
    if (thatTask) {
      res.status(200).json({ task: thatTask });
    } else {
      res.status(404).json({ msg: "The task doesn't exists" });
    }
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const postTask = async (req, res) => {
  try {
    let task = await Task.create(req.body);
    res.status(201).json({ task: task });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const deleteThatTask = async (req, res) => {
  try {
    const { id } = req.params;
    const thatTask = await Task.findOneAndDelete({ _id: id });
    if (thatTask) {
      res
        .status(200)
        .json({ success: true, msg: "The task is successfully removed" });
    } else {
      res.status(404).json({ success: false, msg: "Task doesn't exists" });
    }
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
};

const patchThatTask = async (req, res) => {
  try {
    const { id } = req.params;
    const thatTask = await Task.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (thatTask) {
      res.status(200).json({ thatTask });
    } else {
      res.status(404).json({ success: false, msg: "The task doesn't exist" });
    }
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
};

module.exports = {
  getAllTasks,
  getThatTask,
  postTask,
  deleteThatTask,
  patchThatTask,
};
