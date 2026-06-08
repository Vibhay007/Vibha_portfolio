import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import Loader from "./components/Loader";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CodingStats from "./components/CodingStats";

import Background from "./components/Background";
import Cursor from "./components/Cursor";

import "./App.css";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <Loader />
      ) : (
        <div className="app-wrapper">

          {/* BACKGROUND FIRST */}
          <Background />

          {/* CURSOR ABOVE EVERYTHING */}
          <Cursor />

          {/* MAIN CONTENT */}
          <Header />
          <Home />
          <About />
          <Education />
          <Skills />
          <Projects />
          <CodingStats />
          <Contact />
          <Footer />

          {/* SCROLL BUTTON */}
          <button
            id="scroll-top"
            onClick={scrollToTop}
            className={showScroll ? "active" : ""}
          >
            ↑
          </button>

        </div>
      )}
    </AnimatePresence>
  );
};

export default App;