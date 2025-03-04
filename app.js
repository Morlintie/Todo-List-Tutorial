require("./db/connect.js");
const Task = require("./db/connect.js");
const express = require("express");
const app = express();

app.use(express.static("./public"));
app.use(express.json());

app.post("/test", async (req, res) => {
  try {
    console.log(req.body);
    let test = await Task.create(req.body);
    res.status(201).json(test);
  } catch (err) {
    console.log(err);
  }
});

app.listen(5000, () => {
  console.log("The server is listen on port 5000");
});
