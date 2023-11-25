import React, { useEffect, useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks, addTask, deleteTask } from "../../slices/taskSlice";
import styles from "./Tasklist.scss";

const Tasklist = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  //
  const dispatch = useDispatch();
  //
  useEffect(() => {
    //load tasks
    dispatch(fetchTasks());
  }, []);

  const inputRef = useRef();

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
        <button onClick={addTaskHandler}>Add Task</button>
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
