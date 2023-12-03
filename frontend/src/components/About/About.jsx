import React from "react";
import styles from "./About.scss";

const About = () => {
  return (
    <div className={styles.about}>
      <ul>
        <li>
          🌐 Introducing "Task Manager"! I'm taking a step forward in my journey
          from React to full-stack development by exploring the MERN stack.
        </li>
        <li>
          🔍 Project Insights: Developed with technologies like Webpack, SCSS,
          and Babel, Task Manager is a testament to my growing skills in
          full-stack development.
        </li>
        <li>
          🌟 Future Enhancements: I'm planning to incorporate features such as
          user authentication, user-specific tasks, and pagination, aiming to
          create a more dynamic and user-friendly experience.
        </li>
        <li>
          📈 This endeavor signifies a pivotal shift in my career, expanding
          from front-end to encompass full-stack capabilities. Stay connected
          for more updates!
        </li>
      </ul>
    </div>
  );
};

export default About;
