const express = require("express");
const taskRouter = express.Router();
const { db } = require("./db");

taskRouter.get("/", (req, res) => {
  res.send({
    message: "task route",
  });
});

taskRouter.get("/allTasks", (req, res) => {
  db.query(`SELECT * FROM crud_db`, (err, result) => {
    if (err) {
      res.send({
        message: err.message,
      });
    } else {
      res.send({
        message: "tasks fetched",
        tasks: result,
      });
    }
  });
});

taskRouter.post("/addTask", (req, res) => {
  const { task } = req.body;
  if (!task) {
    res.send({
      message: "task cannot be empty",
    });
  }
  if (task.length > 255) {
    res.send({
      message: "task cannot be more than 255 characters",
    });
  }
  db.query(`INSERT INTO crud_db (task) VALUES ('${task}')`, (err, result) => {
    if (err) {
      res.send({
        message: err.message,
      });
    } else {
      res.send({
        message: "task added",
        task: result,
      });
    }
  });
});

taskRouter.put("/updateTask/:id", (req, res) => {
  const { task } = req.body;
  if (!task) {
    res.send({
      message: "task cannot be empty",
    });
  }
  if (task.length > 255) {
    res.send({
      message: "task cannot be more than 255 characters",
    });
  }
  db.query(
    `UPDATE crud_db SET task = '${task}' WHERE id = ${req.params.id}`,
    (err, result) => {
      if (err) {
        res.send({
          message: err.message,
        });
      } else {
        res.send({
          message: "task updated",
        });
      }
    }
  );
});

taskRouter.delete("/deleteTask/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM crud_db WHERE id = ?", id, (err, result) => {
    if (err) {
      res.send({
        message: err.message,
      });
    } else {
      res.send({
        message: "task deleted",
      });
    }
  });
});

module.exports = { taskRouter };
