import { useState, useEffect } from "react";
import "./Header.css";
import { SiHashnode } from "react-icons/si";

const menuItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "CP", href: "#coding-stats" }, // 🎯 Dynamically linked to your coding stats container id
  { name: "Contact", href: "#contact" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const current = window.scrollY;

      // shrink header on scroll
      setScrolled(current > 50);

      // hide on scroll down, show on scroll up
      if (current > lastScrollY && current > 120) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScrollY = current;

      // active section detection
      const sections = document.querySelectorAll("section");

      sections.forEach((section) => {
        const top = section.offsetTop - 180;
        const bottom = top + section.offsetHeight;

        if (current >= top && current < bottom) {
          setActive(`#${section.id}`);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Magnetic effect (runs once)
    const buttons = document.querySelectorAll(".nav-btn");

    buttons.forEach((btn) => {
      const handleMouseMove = (e) => {
        const rect = btn.getBoundingClientRect();

        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);

        btn.style.setProperty("--x", `${x * 0.3}px`);
        btn.style.setProperty("--y", `${y * 0.3}px`);
      };

      const reset = () => {
        btn.style.setProperty("--x", "0px");
        btn.style.setProperty("--y", "0px");
      };

      btn.addEventListener("mousemove", handleMouseMove);
      btn.addEventListener("mouseleave", reset);
    });
  }, []);

  return (
    <>
      {/* HEADER */}
      <header
        className={`header
        ${scrolled ? "scrolled" : ""}
        ${hidden ? "hidden" : ""}
        ${menuOpen ? "menu-active" : ""}`}
      >
        {/* LOGO */}
        <div className="logo">
          Vibha <span>Yadav</span>
        </div>

        {/* NAV */}
        <nav className={`navbar ${menuOpen ? "active" : ""}`}>
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`nav-btn ${
                active === item.href ? "active" : ""
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* SOCIAL ICONS */}
        <div className="social-icons">
          <a href="https://github.com/Vibhay007" target="_blank" rel="noreferrer">
            <i className="ri-github-fill"></i>
          </a>

          <a
            href="https://www.linkedin.com/in/vibha-yadav1106/"
            target="_blank"
            rel="noreferrer"
          >
            <i className="ri-linkedin-box-fill"></i>
          </a>

          <a href="#">
            <i className="ri-twitter-x-line"></i>
          </a>

          <a href="mailto:vibha0700@gmail.com?subject=Portfolio Contact">
            <i className="ri-mail-line"></i>
          </a>

          <a
            href="https://hashnode.com/@vibha07"
            target="_blank"
            rel="noreferrer"
          >
            <SiHashnode size={20} />
          </a>
        </div>

        {/* MOBILE MENU ICON */}
        <div
          className="menu-icon-wrapper"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i
            className={`ri ${menuOpen ? "ri-close-line" : "ri-menu-line"}`}
            id="menu-icon"
          ></i>
        </div>
      </header>
    </>
  );
};

export default Header;