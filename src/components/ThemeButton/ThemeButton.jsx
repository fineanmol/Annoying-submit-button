import React from "react";
import "./ThemeButton.css";

const ThemeButton = ({ setThemeState, themeState }) => {
  return (
    <div className="theme-container">
      <div onClick={() => {
        setThemeState(() => themeState === "bright" ? "dark" : "bright");
      }} className={`theme-button-container ${themeState}`}>
        <button
          className={`button-blob ${themeState === "bright" ? "dark-blob" : "bright-blob"
            }`}

        ></button>
      </div>
    </div>
  );
};

export default ThemeButton;
