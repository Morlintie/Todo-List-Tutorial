const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_DB_KEY)
  .then(console.log("connected to the database"))
  .catch((err) => {
    console.log(err);
  });

const taskSchema = new mongoose.Schema({
  name: String,
  completed: Boolean,
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
