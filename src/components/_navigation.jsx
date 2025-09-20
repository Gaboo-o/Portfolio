import { useState } from "react";
import smoothScroll from "../utils/_smoothScroll";

export default function Navigation({ data }) {
  const [isActive, setIsActive] = useState(false);
  const [menuIcon, setMenuIcon] = useState({
    src: data.menu.close.src,
    alt: data.menu.close.alt,
  });

  const toggleMenu = () => {
    if (!isActive) {
      setMenuIcon({ src: data.menu.open.src, alt: data.menu.open.alt });
    } else {
      setMenuIcon({ src: data.menu.close.src, alt: data.menu.close.alt });
    }
    setIsActive(!isActive);
  };

  const handleHoverOn = () => {
    if (isActive) {
      setMenuIcon({ src: data.menu.openFill.src, alt: data.menu.openFill.alt });
    } else {
      setMenuIcon({
        src: data.menu.closeFill.src,
        alt: data.menu.closeFill.alt,
      });
    }
  };

  const handleHoverOff = () => {
    if (isActive) {
      setMenuIcon({ src: data.menu.open.src, alt: data.menu.open.alt });
    } else {
      setMenuIcon({ src: data.menu.close.src, alt: data.menu.close.alt });
    }
  };

  const handleNavClick = (item, e) => {
    e.preventDefault();
    const targetElement = document.querySelector(item.href);
    if (targetElement) {
      smoothScroll(targetElement);
    }
    if (item.text === "About") {
      const event = new Event("open");
      document.querySelector(".toggle-about-img")?.dispatchEvent(event);
    }
    if (item.alt !== "Logo" || isActive) {
      toggleMenu();
    }
  };

  return (
    <nav className="nav-bar">
      <ul className="nav-list">
        {/* Logo */}
        <li className="nav-list-left">
          <a onClick={(e) => handleNavClick(data.logo, e)}>
            <img
              className="nav-list-img"
              src={data.logo.src}
              alt={data.logo.alt}
              style={{ width: "3.0em" }}
            />
          </a>
        </li>
        {/* Menu toggle */}
        <li className="menu-toggle">
          <button
            onClick={toggleMenu}
            onMouseOver={handleHoverOn}
            onMouseOut={handleHoverOff}
          >
            <img src={menuIcon.src} alt={menuIcon.alt} />
          </button>
        </li>
        {/* Nav items */}
        <li className={`nav-list-right ${isActive ? "active" : ""}`}>
          {data.navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className={`nav-button ${isActive ? "active" : ""}`}
              onClick={(e) => handleNavClick(item, e)}
            >
              <img
                className="nav-list-img"
                src={item.src}
                alt={`${item.text} Icon`}
              />
              <span>{item.text}</span>
            </a>
          ))}
        </li>
      </ul>
    </nav>
  );
}
