import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CustomButton, TextField } from "@elements";
import { Loader } from "../Loader/Loader.jsx";
import {
  fetchTasks,
  addTask,
  deleteTask,
  updateTask,
  editTaskDataHandler,
  resetTasksHandler,
} from "../../slices/taskSlice.js";
import styles from "./Tasklist.scss";

const Tasklist = () => {
  const [newTodo, setNewTodo] = useState("");
  const [editTodo, setEditTodo] = useState("");
  //
  const { tasks, editTaskData, status } = useSelector((state) => state.tasks);

  const navigate = useNavigate();

  //
  const dispatch = useDispatch();
  //
  useEffect(() => {
    dispatch(resetTasksHandler());
    dispatch(fetchTasks(navigate));
  }, []);
  //
  useEffect(() => {
    if (editTaskData?._id) {
      setEditTodo(editTaskData?.task);
    }
  }, [editTaskData?._id]);
  //

  //delete task
  const deleteTaskHandler = async (taskId) => {
    dispatch(deleteTask(taskId));
  };

  //add task
  const addTaskHandler = async () => {
    if (newTodo === "") return;
    dispatch(addTask({ task: newTodo }));
    setNewTodo("");
  };

  // update task
  const updateTaskHandler = () => {
    const { _id: id } = editTaskData;
    dispatch(updateTask({ id, task: editTodo }));
    setEditTodo("");
    dispatch(editTaskDataHandler({}));
  };

  // cancel update
  const cancelTaskHandler = () => {
    setEditTodo("");
    dispatch(editTaskDataHandler({}));
  };

  const addTodoOnChangeHandler = (e) => {
    setNewTodo(e.target.value);
  };

  const editTodoOnChangeHandler = (e) => {
    setEditTodo(e.target.value);
  };
  //
  const renderInputField = () => {
    if (Object.keys(editTaskData)?.length === 0) {
      return (
        <>
          <TextField
            type="text"
            name="task"
            id="task"
            value={newTodo}
            onChange={addTodoOnChangeHandler}
            placeholder="Please add task..."
          />
          <CustomButton name={"Add Task"} onClick={addTaskHandler} />
        </>
      );
    }

    return (
      <>
        <TextField
          type="text"
          name="task"
          id="task"
          value={editTodo}
          onChange={editTodoOnChangeHandler}
          placeholder="Please update task..."
        />
        <CustomButton name="Update" onClick={updateTaskHandler} />
        <CustomButton name="Cancel" onClick={cancelTaskHandler} />
      </>
    );
  };

  if (status === "loading")
    return (
      <div className={styles.taskListLoader}>
        <Loader />
      </div>
    );

  return (
    <div className={styles.tasklistContainer}>
      <div className={styles.textButtonContainer}>{renderInputField()}</div>
      {tasks?.length === 0 && (
        <div className={styles.noTasks}>
          <h3>No tasks to show</h3>
        </div>
      )}
      {tasks?.length > 0 && (
        <div className={styles.list}>
          <ul>
            <li>
              <div>#</div>
              <div>TASK</div>
              <div>
                <span>EDIT</span>
                <span>DELETE</span>
              </div>
            </li>
            {tasks?.map((obj, index) => (
              <li key={obj?._id}>
                <div>{index + 1}</div>
                <div>{obj?.task}</div>
                <div className={styles.btnContainer}>
                  <span>
                    <CustomButton
                      name="Edit"
                      onClick={() => dispatch(editTaskDataHandler(obj))}
                    />
                  </span>
                  <span>
                    <CustomButton
                      name="Delete"
                      onClick={() => deleteTaskHandler(obj?._id)}
                    />
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Tasklist;
