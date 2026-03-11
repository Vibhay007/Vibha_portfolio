import { motion } from "framer-motion";
import "./Skills.css";

const skills = [
  { name: "HTML", icon: "ri-html5-fill", color: "#E34F26" },
  { name: "CSS", icon: "ri-css3-fill", color: "#1572B6" },
  { name: "JavaScript", icon: "ri-javascript-fill", color: "#F7DF1E" },
  { name: "React", icon: "ri-reactjs-fill", color: "#61DAFB" },

  { name: "MongoDB", icon: "ri-database-2-fill", color: "#4DB33D" },
  { name: "Git", icon: "ri-git-branch-line", color: "#F05032" },
  { name: "GitHub", icon: "ri-github-fill", color: "#FFFFFF" },
{ name: "Node.js", icon: "ri-terminal-box-fill", color: "#339933" },
{ name: "Docker", icon: "ri-cloud-fill", color: "#2496ED" },
  { name: "Postman", icon: "ri-send-plane-fill", color: "#FF6C37" }
];

const Skills = () => {
  return (
    <section id="skills">
      <h2>Skills</h2>
      <div className="skills-wrapper">
        {skills.map((skill, index) => (
          <motion.div
            className="skill"
            key={index}
            whileHover={{ boxShadow: `0 0 20px ${skill.color}, 0 0 40px ${skill.color}50` }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <motion.i
              className={skill.icon}
              style={{ color: skill.color }}
              whileHover={{ scale: 1.5, rotate: 15 }}
              whileTap={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 200 }}
            ></motion.i>
            <span>{skill.name}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;


