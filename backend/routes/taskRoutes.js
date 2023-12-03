import express from "express";
const router = express.Router();

import {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

import { protect } from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(protect, getTasks)
  .post(protect, addTask)
  .put(protect, updateTask);
router.route("/:id").delete(protect, deleteTask);

export default router;
