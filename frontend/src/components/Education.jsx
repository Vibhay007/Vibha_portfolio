import { motion } from "framer-motion";
import { SiLeetcode, SiGeeksforgeeks, SiCodeforces } from "react-icons/si";
import "./Education.css";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const Education = () => {
  return (
    <section className="education" id="education">
      <motion.div
  className="timeline"
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  {/* Item 1 */}
  <motion.div className="timeline-item" variants={itemVariants}>
    <span className="timeline-dot"></span>
    <div className="timeline-content">
      <h3>B.Tech in Mechanical Engineering</h3>
      <h4>National Institute of Technology, Hamirpur</h4>
      <span className="timeline-date">2024 – Present</span>
      <p>
        Pursuing Mechanical Engineering while independently developing strong
        problem-solving and software development skills.
      </p>
    </div>
  </motion.div>

  {/* Item 2 */}
  <motion.div className="timeline-item" variants={itemVariants}>
    <span className="timeline-dot"></span>
    <div className="timeline-content">
      <h3>Full Stack Web Development (MERN)</h3>
      <h4>Self-Learning & Online Platforms</h4>
 
      <p>
        Completed hands-on projects using MongoDB, Express, React, and Node.js,
        focusing on real-world application development.
      </p>
    </div>
  </motion.div>

  {/* Item 3 */}
{/* Item 3 – DSA */}
<motion.div className="timeline-item" variants={itemVariants}>
  <span className="timeline-dot"></span>
  <div className="timeline-content">
    <h3>Data Structures & Algorithms</h3>
    <h4>Self-Practice & Competitive Coding</h4>
    <span className="timeline-date">2024 – Present</span>

    <p>
      Actively solving DSA problems to strengthen logic, optimize solutions,
      and prepare for technical interviews.
    </p>

   <div className="coding-links">
  <a
    href="https://www.geeksforgeeks.org/profile/vibha07"
    target="_blank"
    rel="noopener noreferrer"
  >
    <SiGeeksforgeeks />
    <span>GeeksforGeeks</span>
  </a>

  <a
    href="https://leetcode.com/u/Vibha_07/"
    target="_blank"
    rel="noopener noreferrer"
  >
    <SiLeetcode />
    <span>LeetCode</span>
  </a>

  <a
    href="https://codeforces.com/profile/Vibha_07"
    target="_blank"
    rel="noopener noreferrer"
  >
    <SiCodeforces />
    <span>Codeforces</span>
  </a>
</div>
  </div>
</motion.div>

  {/* Item 4 */}
  <motion.div className="timeline-item" variants={itemVariants}>
    <span className="timeline-dot"></span>
    <div className="timeline-content">
      <h3>Senior Secondary Education (Class XII)</h3>
      <h4>Science Stream</h4>
      <span className="timeline-date">2020 – 2021</span>
      <p>
        Completed higher secondary education with a focus on Physics,
        Mathematics, and problem-solving fundamentals.
      </p>
    </div>
  </motion.div>
</motion.div>
    </section>
  );
};

export default Education;