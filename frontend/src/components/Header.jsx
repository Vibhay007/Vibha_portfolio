import { useState, useEffect } from "react";
import "./Header.css";

const menuItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""} ${menuOpen ? "menu-active" : ""}`}>
      
      <div className="logo">
        Vibha <span>Yadav</span>
      </div>

      <nav className={`navbar ${menuOpen ? "active" : ""}`}>
        {menuItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="nav-btn"
            onClick={() => setMenuOpen(false)}
          >
            {item.name}
          </a>
        ))}
      </nav>

      {/* Social Icons */}
      <div className="social-icons">
        <a href="https://github.com/Vibhay007"><i className="ri-github-fill"></i></a>
        <a href="https://www.linkedin.com/in/vibha-yadav1106/"><i className="ri-linkedin-box-fill"></i></a>
        <a href="#"><i className="ri-twitter-x-line"></i></a>
       <a href="mailto:vibha0700@gmail.com?subject=Portfolio Contact">
  <i className="ri-mail-line"></i>
</a>
      </div>

      <div className="menu-icon-wrapper" onClick={() => setMenuOpen(!menuOpen)}>
        <i className={`ri ${menuOpen ? "ri-close-line" : "ri-menu-line"}`} id="menu-icon"></i>
      </div>

    </header>
  );
};

export default Header;