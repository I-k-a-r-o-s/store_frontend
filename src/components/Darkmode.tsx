import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const DarkMode = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <div>
      <label className="swap swap-rotate mx-5 mb-0.5">
        <input
          type="checkbox"
          className="theme-controller"
          onChange={toggleTheme}
          checked={theme === "dark"}
        />
        <Sun className="text-yellow-400 swap-off h-8 w-8 fill-current" />
        <Moon className="text-gray-400 swap-on h-8 w-8 fill-current" />
      </label>
    </div>
  );
};

export default DarkMode;
