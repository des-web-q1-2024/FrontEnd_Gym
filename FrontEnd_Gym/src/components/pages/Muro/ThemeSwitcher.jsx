import React, { useEffect, useState } from 'react';
import './ThemeSwitcher.css'; // Asegúrate de tener los estilos necesarios

const ThemeSwitcher = () => {
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("darkmode");
    } else {
      document.body.classList.remove("darkmode");
    }
  }, [isDarkMode]);

  const switchTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="theme-switcher">
      <button onClick={switchTheme} className="toggle">
        {isDarkMode ? (
          <i className="sun">🌞</i>
        ) : (
          <i className="moon">🌜</i>
        )}
      </button>
      {/* {isDarkMode ? (
        <img src="src/assets/noche.jpg" alt="Night" className="night-img" />
      ) : (
        <img src="src/assets/dia.jpg" alt="Morning" className="morning-img" />
      )} */}
    </div>
  );
};

export default ThemeSwitcher;
