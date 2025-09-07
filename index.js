const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT;
app.use(express.json());
const cors = require("cors");
app.use(cors());

const {taskRouter} = require('./taskRouter');
app.use('/task', taskRouter);

app.get("/", (req, res) => {
  res.send({
    message: "server running smoothly",
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
