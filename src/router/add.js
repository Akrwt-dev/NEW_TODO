const express = require("express");
const addRouter = express.Router();
const Task = require("../modules/task");
const User = require("../modules/user")
const userAuth = require("../middlewares/auth");
const { validateEnteredTask, updateData } = require("../utils/validation");

addRouter.post("/add", userAuth, async (req, res) => {
  try {
    validateEnteredTask(req.body);
    const { title, description, dueDate, priority,photoURL } = req.body;
    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      photoURL,
      userId: req.user._id,
    });
    const taskSave = await task.save();
    res.json({
      message: "Task added successfully",
      data: taskSave,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

addRouter.delete("/delete/:taskId", userAuth, async (req, res) => {
  try {
    const deleteTaskId = req.params.taskId;

    const deletedTask = await Task.findOneAndDelete({
      _id: deleteTaskId,
      userId: req.user._id,
    });

    if (!deletedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await Task.deleteOne({ _id: deleteTaskId, userId: req.user._id });

    res.json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

addRouter.patch("/complete/:taskId", userAuth, async (req, res) => {
  try {
    const updateTaskId = req.params.taskId;
    const task = await Task.findOne({
      _id: updateTaskId,
      userId: req.user._id,
    });
    if (!task) {
      return res.status(404).json({
        message: "Task is not present",
      });
    }
    task.completed = !task.completed;
    await task.save();
    res.json({
      message: "Task completion toggled",
      completed: task.completed,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

addRouter.get("/task", userAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    const task = await Task.find({ userId: userId }).populate("userId");
    res.json({
      success: true,
      tasks: task,
    });
  } catch(error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

addRouter.get("/profile", userAuth, async (req, res) => {
  try {
    res.json(req.user);
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});


addRouter.get("/health",(req,res)=>{
  res.send("all ok")
})


addRouter.patch("/profile/edit", userAuth , async(req,res)=>{
  try {
    if (!updateData(req)) throw new Error("Cannot update this");

    const loginUser = req.user;
    Object.keys(req.body).forEach((key) => {
      loginUser[key] = req.body[key];
    });

    await loginUser.save();

    res.json({
      message: "Data updated successfully",
      data: loginUser,
    });
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});

module.exports = addRouter;
