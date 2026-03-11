import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import "./About.css";
import profile from "../assets/vibha1.jpeg";

// About text with keyword placeholders
const aboutText =
"I am currently pursuing B.Tech in Mechanical Engineering at NIT Hamirpur. Alongside my academics, I have developed a strong interest in software development and problem-solving. I have completed full-stack web development using the MERN stack and enjoy building web applications from scratch I actively practice Data Structures and Algorithms, focusing on improving my logical thinking, code efficiency, and consistency. Solving DSA problems has become a regular part of my routine and helps me think more clearly while coding.I am continuously learning, refining my skills, and working towards becoming a better developer through practice and real-world projects."
const About = () => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < aboutText.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + aboutText[index]);
        setIndex(index + 1);
      }, 28);

      return () => clearTimeout(timeout);
    }
  }, [index]);

  // Convert keyword placeholders to spans for glowing effect
  const formatText = (raw) => {
    return raw
      .replace(
        /<designer>(.*?)<\/designer>/g,
        '<span class="highlight designer">$1</span>'
      )
      .replace(
        /<dsa>(.*?)<\/dsa>/g,
        '<span class="highlight dsa">$1</span>'
      );
  };

  return (
    <section className="about" id="about">
      <motion.div
        className="about-img"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <img src={profile} alt="About Vibha" />
      </motion.div>

      <motion.div
        className="about-content"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2>About Me</h2>
        <p
          className="typing-paragraph"
          dangerouslySetInnerHTML={{
            __html: formatText(text) + '<span class="cursor">|</span>',
          }}
        />
      </motion.div>
    </section>
  );
};

export default About;
