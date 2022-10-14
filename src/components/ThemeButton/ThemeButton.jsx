import React from "react";
import "./ThemeButton.css";

const ThemeButton = ({ setThemeState, themeState }) => {
  const themeNamesArr = ["purple", "pink", "skin", "dark"];
  return (
    <div>
      <div className="theme-button-container">
        {themeNamesArr.map((el) => (
          <div
            key={el}
            className={`theme-btn ${el} ${themeState}-d`}
            onClick={() => setThemeState(el)}
          >
            <div className="tick"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemeButton;
