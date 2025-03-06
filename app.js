require("./db/connect.js");
const Task = require("./db/connect.js");
const express = require("express");
const app = express();

app.use(express.static("./public"));
app.use(express.json());

app.get("/api/tasks/get", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks: tasks });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
});

app.get("/api/tasks/get/:id", async (req, res) => {
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
});

app.post("/api/tasks/create", async (req, res) => {
  try {
    let task = await Task.create(req.body);
    res.status(201).json({ task: task });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
});

app.delete("/api/tasks/delete/:id", async (req, res) => {
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
});

app.patch("/api/tasks/patch/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const thatTask = await Task.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidator: true,
    });
    if (thatTask) {
      res.status(200).json({ thatTask });
    } else {
      res.status(404).json({ success: false, msg: "The task doesn't exist" });
    }
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
});

app.listen(5000, () => {
  console.log("The server is listen on port 5000");
});
