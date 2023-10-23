import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import styles from "./Tasklist.scss";

const Tasklist = () => {
  const [tasks, setTasks] = useState([]);

  const inputRef = useRef();

  const getTasks = async () => {
    const result = await axios("/api/tasks");
    const response = await result.data;
    setTasks(response?.data);
  };

  const deleteTask = async (taskId) => {
    await axios.delete(`/api/tasks/${taskId}`);
    getTasks();
  };

  useEffect(() => {
    getTasks();
  }, []);

  const addTask = async () => {
    if (inputRef?.current.value === "") return;
    await axios.post("/api/tasks", { task: inputRef.current.value });
    inputRef.current.value = "";
    getTasks();
  };

  return (
    <div className={styles.tasklistContainer}>
      <div className={styles.textButtonContainer}>
        <input
          type="text"
          name="task"
          id="task"
          ref={inputRef}
          placeholder="Please add task..."
        />
        <button onClick={addTask}>Add Task</button>
      </div>
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
                {/* <span>EDIT</span> */}
                <span>DELETE</span>
              </div>
            </li>
            {tasks?.map((obj, index) => (
              <li key={obj?._id}>
                <div>{index + 1}</div>
                <div>{obj?.task}</div>
                <div>
                  {/* <span>
                <button>edit</button>
              </span> */}
                  <span>
                    <button onClick={() => deleteTask(obj?._id)}>delete</button>
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
