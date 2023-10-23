import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Tasklist.scss";

const Tasklist = () => {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    const result = await axios("/api/tasks");
    const response = await result.data;
    setTasks(response);
  };

  const deleteTask = async (taskId) => {
    await axios.delete(`/api/tasks/${taskId}`);
    getTasks();
  };

  useEffect(() => {
    getTasks();
  }, []);

  if (tasks?.length === 0) {
    return (
      <div className={styles.tasklistContainer}>
        <h2>No tasks to show</h2>
      </div>
    );
  }

  return (
    <div className={styles.tasklistContainer}>
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
    </div>
  );
};

export default Tasklist;
