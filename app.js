require("./db/connect.js");
const Task = require("./db/connect.js");
const router = require("./routes/routes.js");

const express = require("express");
const app = express();

app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/tasks", router);

app.listen(5000, () => {
  console.log("The server is listen on port 5000");
});
