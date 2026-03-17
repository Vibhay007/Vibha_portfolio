import { motion } from "framer-motion";
import "./Footer.css";

const quote =
  "Failing in different ways until no other way to fail remains.";

const Footer = () => {
  return (
    <footer className="footer">

      {/* QUOTE */}
      <motion.p
        className="footer-quote"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {quote}
      </motion.p>

      {/* COPYRIGHT */}
      <p className="footer-copy">
        © {new Date().getFullYear()} Vibha Yadav. All rights reserved.
      </p>

    </footer>
  );
};

export default Footer;
