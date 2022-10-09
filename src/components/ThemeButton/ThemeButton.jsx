import React from "react";
import "./ThemeButton.css";

const ThemeButton = ({ setThemeState, themeState }) => {
  return (
    <div className="theme-container" title="Change Theme">
      <div onClick={() => {
        setThemeState(() => themeState === "bright" ? "dark" : "bright");
      }} className={`theme-button-container ${themeState}`}>
      <p className="theme" style={{color:`${themeState === "bright" ? "black":"white"}`}}>{`${themeState === "bright" ? "Dark":"Bright"} Theme`}</p>
        <button
          className={`button-blob ${themeState === "bright" ? "dark-blob" : "bright-blob"
            }`}

        ></button>
      </div>
    </div>
  );
};

export default ThemeButton;
