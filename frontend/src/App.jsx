import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import "./App.css";

import Loader from "./components/Loader";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Background from "./components/Background";
import Cursor from "./components/Cursor";

const App = () => {
  const [loading, setLoading] = useState(true);

  // ✅ NEW: scroll button state
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // ✅ NEW: scroll detection (separate, doesn't touch your logic)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ NEW: scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <Loader key="loader" />
      ) : (
        <div className="app-wrapper">
          <Cursor />
          <Background />

          <Header />
          <Home />
          <About />
          <Education />
          <Skills />
          <Projects />
          <Contact />
          <Footer />


          <button
            id="scroll-top"
            onClick={scrollToTop}
            className={showScroll ? "active" : ""}
            aria-label="Scroll to top"
          >
            ↑
          </button>
        </div>
      )}
    </AnimatePresence>
  );
};

export default App;