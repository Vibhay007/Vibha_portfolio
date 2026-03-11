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
import Background from "./components/Background";
import Cursor from "./components/Cursor";


const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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
        </div>
      )}
    </AnimatePresence>
  );
};

export default App;