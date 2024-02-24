import React from "react";
import styles from "./About.scss";

const About = () => {
  return (
    <div className={styles.about}>
      <ul>
        <li>
          <h3>🚀 Register and Login</h3>
          <p>
            Seamlessly create your account to unlock the full potential of Task
            Manager. Enjoy a secure login process to access your personalized
            task management dashboard.
          </p>
        </li>
        <li>
          <h3>✍️ Create Tasks</h3>
          <p>
            Effortlessly add new tasks with detailed descriptions to capture all
            the essential information. Categorize your tasks to keep things
            organized and easily accessible.
          </p>
        </li>
        <li>
          <h3>🔄 Update Tasks</h3>
          <p>
            Stay on top of your to-do list by updating task details as
            priorities or deadlines change. Mark tasks as in-progress or
            completed to track your progress.
          </p>
        </li>
        <li>
          <h3>🗑️ Delete Tasks</h3>
          <p>
            Remove completed or no-longer-relevant tasks with a simple delete
            function. Keep your task list clean and focused on what matters
            most.
          </p>
        </li>
        <li>
          <h3>📅 Deadline Alerts</h3>
          <p>
            Receive timely reminders for approaching task deadlines to help you
            stay proactive. Customize notification settings based on your
            preferences.
          </p>
        </li>
        <li>
          <h3>🔄 Sync Across Devices</h3>
          <p>
            Access your tasks seamlessly across various devices, ensuring you
            never miss a beat. Synchronize your task data for a consistent
            experience on the go.
          </p>
        </li>
        <li>
          <h3>🔒 Secure and Private</h3>
          <p>
            Rest easy knowing that your task data is kept secure and private.
            Task Manager employs robust security measures to protect your
            information.
          </p>
        </li>
        <li>
          <h3>🌐 User-Friendly Interface</h3>
          <p>
            Navigate through the application effortlessly with our intuitive and
            user-friendly design. Enjoy a visually appealing and efficient task
            management experience.
          </p>
        </li>
      </ul>
    </div>
  );
};

export default About;
