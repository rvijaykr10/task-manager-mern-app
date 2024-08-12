import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@elements";
import {
  fetchTasks,
  addTask,
  deleteTask,
  updateTask,
  editTaskData,
} from "../../slices/taskSlice.js";
import styles from "./Tasklist.scss";

const Tasklist = () => {
  const [newTodo, setNewTodo] = useState("");
  const [editTodo, setEditTodo] = useState("");
  //
  const tasks = useSelector((state) => state.tasks.tasks);
  const taskToUpdate = useSelector((state) => state.tasks.editTaskData);
  const navigate = useNavigate();

  //
  const dispatch = useDispatch();
  //
  useEffect(() => {
    dispatch(fetchTasks(navigate));
  }, []);
  //
  useEffect(() => {
    if (taskToUpdate._id) {
      setEditTodo(taskToUpdate.task);
    }
  }, [taskToUpdate._id]);
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
    const { _id: id } = taskToUpdate;
    dispatch(updateTask({ id, task: editTodo }));
    setEditTodo("");
    dispatch(editTaskData({}));
  };

  // cancel update
  const cancelTaskHandler = () => {
    setEditTodo("");
    dispatch(editTaskData({}));
  };

  const addTodoOnChangeHandler = (e) => {
    setNewTodo(e.target.value);
  };

  const editTodoOnChangeHandler = (e) => {
    setEditTodo(e.target.value);
  };

  const renderInputField = () => {
    if (Object.keys(taskToUpdate)?.length === 0) {
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
          <Button name={"Add Task"} onClick={addTaskHandler} />
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
        <Button name="Update" onClick={updateTaskHandler} />
        <Button name="Cancel" onClick={cancelTaskHandler} />
      </>
    );
  };

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
                    <Button
                      name="Edit"
                      onClick={() => dispatch(editTaskData(obj))}
                    />
                  </span>
                  <span>
                    <Button
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
