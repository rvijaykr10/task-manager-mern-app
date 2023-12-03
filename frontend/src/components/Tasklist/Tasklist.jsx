import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  fetchTasks,
  addTask,
  deleteTask,
  updateTask,
  editTaskData,
} from "../../slices/taskSlice.js";
import styles from "./Tasklist.scss";

const Tasklist = () => {
  const inputRef = useRef();
  const editinputRef = useRef(null);
  //
  const tasks = useSelector((state) => state.tasks.tasks);
  const taskToUpdate = useSelector((state) => state.tasks.editTaskData);
  const navigate = useNavigate();

  //
  const dispatch = useDispatch();
  //

  useEffect(() => {
    //load tasks
    dispatch(fetchTasks(navigate));
  }, []);
  //
  useEffect(() => {
    if (taskToUpdate._id) {
      editinputRef.current.value = taskToUpdate.task;
    }
  }, [taskToUpdate._id]);
  //

  //delete task
  const deleteTaskHandler = async (taskId) => {
    dispatch(deleteTask(taskId));
  };

  //add task
  const addTaskHandler = async () => {
    if (inputRef?.current.value === "") return;
    dispatch(addTask({ task: inputRef.current.value }));
    inputRef.current.value = "";
  };

  // update task
  const updateTaskHandler = () => {
    const { _id: id } = taskToUpdate;
    dispatch(updateTask({ id, task: editinputRef.current.value }));
    editinputRef.current.value = "";
    dispatch(editTaskData({}));
  };

  // cancel update
  const cancelTaskHandler = () => {
    editinputRef.current.value = "";
    dispatch(editTaskData({}));
  };

  const renderInputField = () => {
    if (Object.keys(taskToUpdate)?.length === 0) {
      return (
        <>
          <input
            type="text"
            name="task"
            id="task"
            ref={inputRef}
            placeholder="Please add task..."
          />
          <button onClick={addTaskHandler}>Add Task</button>
        </>
      );
    }

    return (
      <>
        <input
          type="text"
          name="task"
          id="task"
          ref={editinputRef}
          value={editinputRef?.current?.value}
          placeholder="Please update task..."
        />
        <button onClick={updateTaskHandler}>Update</button>
        <button onClick={cancelTaskHandler}>Cancel</button>
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
                <div>
                  <span>
                    <button onClick={() => dispatch(editTaskData(obj))}>
                      edit
                    </button>
                  </span>
                  <span>
                    <button onClick={() => deleteTaskHandler(obj?._id)}>
                      delete
                    </button>
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
