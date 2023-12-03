import path from "path";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// tasks
app.use("/api/tasks", taskRoutes);

// // get tasks
// app.get("/api/tasks", async (req, res) => {
//   try {
//     const tasks = await Task.find({});
//     res.status(200).json({ data: tasks });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// // add task
// app.post("/api/tasks", async (req, res) => {
//   try {
//     const { task } = req.body;
//     await Task.create({ task });
//     res.status(201).json({ task });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// // update task
// app.put("/api/tasks", async (req, res) => {
//   const { id, task } = req.body;

//   try {
//     const updatedTask = await Task.findByIdAndUpdate(
//       id,
//       { task },
//       { new: true }
//     );

//     res.status(200).json({ task: updatedTask });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// // delete task
// app.delete("/api/tasks/:id", async (req, res) => {
//   try {
//     const task = await Task.findById(req.params.id);
//     if (task) {
//       await Task.deleteOne({ _id: task._id });
//       res.status(200).json({ message: "deleted" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// Production Setup
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("API is running"));
}

//
app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);
