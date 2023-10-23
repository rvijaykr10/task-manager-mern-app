import path from "path";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import Task from "./models/taskModel.js";

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API's
app.get("/api/tasks", async (req, res) => {
  const tasks = await Task.find({});
  res.json(tasks);
});

app.post("/api/tasks", async (req, res) => {
  const { task } = req.body;
  await Task.create({ task });
  res.json({ task });
});

app.delete("/api/tasks/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (task) {
    await Task.deleteOne({ _id: task._id });
    res.json({ message: "deleted" });
  }
});

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
