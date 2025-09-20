import { useEffect, useState } from "react";

function getCurrentTheme() {
  return (
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light")
  );
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getCurrentTheme);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("light-mode", theme === "light");
  }, [theme]);

  return (
    <label className="toggle-theme-container">
      <input
        type="checkbox"
        className="toggle-theme"
        checked={theme === "light"}
        onChange={(e) => setTheme(e.target.checked ? "light" : "dark")}
      />
      <span className="toggle-ball"></span>
    </label>
  );
}
