import React from "react";
import styles from "./Tasklist.scss";

const Tasklist = () => {
  return (
    <div className={styles.tasklistContainer}>
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
          <li>
            <div>1</div>
            <div>go to office</div>
            <div>
              <span>
                <button>edit</button>
              </span>
              <span>
                <button>delete</button>
              </span>
            </div>
          </li>
          <li>
            <div>2</div>
            <div>attend stand up</div>
            <div>
              <span>
                <button>edit</button>
              </span>
              <span>
                <button>delete</button>
              </span>
            </div>
          </li>
          <li>
            <div>3</div>
            <div>go for a break</div>
            <div>
              <span>
                <button>edit</button>
              </span>
              <span>
                <button>delete</button>
              </span>
            </div>
          </li>
          <li>
            <div>4</div>
            <div>attend srum call</div>
            <div>
              <span>
                <button>edit</button>
              </span>
              <span>
                <button>delete</button>
              </span>
            </div>
          </li>
          <li>
            <div>5</div>
            <div>go for a break again</div>
            <div>
              <span>
                <button>edit</button>
              </span>
              <span>
                <button>delete</button>
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Tasklist;
