import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import "./Home.css";
import profile from "../assets/vibha1.jpeg";
// IMPORT YOUR PDF HERE
import resumeFile from "../assets/Vibha_Yadav_resume.pdf"; 

const roles = ["MERN Developer"];

const Home = () => {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = roles[wordIndex];
    let timeout;

    if (!isDeleting) {
      timeout = setTimeout(() => {
        setText(currentWord.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
        if (charIndex === currentWord.length) {
          setTimeout(() => setIsDeleting(true), 1200);
        }
      }, 120);
    } else {
      timeout = setTimeout(() => {
        setText(currentWord.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
        if (charIndex === 0) {
          setIsDeleting(false);
          setWordIndex((wordIndex + 1) % roles.length);
        }
      }, 80);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex]);

  return (
    <section className="home" id="home">
      <motion.div
        className="home-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Hi, I'm Vibha</h1>
        <h3>
          I am a <span className="typing-text">{text}</span>
        </h3>
        <p>
          I build clean, scalable, and user-focused web applications using
          modern technologies.
        </p>

        {/* RESUME BUTTONS USING THE IMPORTED FILE */}
        <div className="btn-group">
          <a href={resumeFile} download="Vibha_Yadav_Resume.pdf" className="btn-resume">
            Download Resume
          </a>
          <a href={resumeFile} target="_blank" rel="noreferrer" className="btn-view">
            View Resume
          </a>
        </div>
      </motion.div>

      <motion.div
        className="home-img"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <img src={profile} alt="Vibha" />
      </motion.div>
    </section>
  );
};

export default Home;