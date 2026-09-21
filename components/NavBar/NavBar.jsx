import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { FaBars } from "react-icons/fa6";
import "./NavBar.css";

const NavBar = ({ logo, items }) => {
  const [show, setShow] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");

  const toggleRef = useRef(null);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow((prev) => !prev);
  };

  // Navbar scroll and active section behavior
useEffect(() => {
  const handleScroll = () => {
    const scrollPosition = window.scrollY + 150;

    // Scrolled navbar
    setScrolled(window.scrollY > 10);

    // Active section
    let currentSection = "#hero";

    items?.forEach((item) => {
      // const section = document.getElementById(
      //   item.url.replace("#", "")
      // );
      const sectionId = item.url.split("#")[1];
      const section = document.getElementById(sectionId);

      if (section && section.offsetTop <= scrollPosition) {
        currentSection = item.url;
      }
    });

    setActiveSection(currentSection);
  };

  window.addEventListener("scroll", handleScroll);

  handleScroll();

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, [items]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        toggleRef.current &&
        !toggleRef.current.contains(event.target)
      ) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className={scrolled ? "navbar scrolled" : "navbar"}>
      {/* Logo */}
      <div className="logo">
        <a href="#hero"><img src="/images/logo.png" alt="M & R" /></a>
      </div>

      {/* Desktop Navigation */}
      <ul className="nav-ul">
        {items?.map((item, index) => (
          <li key={index}>
            <a
              href={item.url}
              className={activeSection === item.url ? "active" : ""}
            >
              {item.content}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile Navigation */}
      <div className="toggle" ref={toggleRef}>
        <Button className="toggle-btn" onClick={handleShow}>
          <FaBars />
        </Button>

        {show && (
          <div className="mobile-menu">
            <ul className="toggle-ul">
              {items?.map((item, index) => (
                <li key={index} onClick={handleClose}>
                  <a
                    href={item.url}
                    className={
                      activeSection === item.url ? "active" : ""
                    }
                  >
                    {item.content}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

