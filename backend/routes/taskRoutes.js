import express from "express";
const router = express.Router();

import {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

router.route("/").get(getTasks).post(addTask).put(updateTask);
router.route("/:id").delete(deleteTask);

export default router;
