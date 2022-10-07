import React from "react";
import "./ThemeButton.css";

const ThemeButton = ({ setThemeState, themeState }) => {
  return (
    <>
      <div className={`theme-button-container ${themeState}`}>
        <button
          className={`button-blob ${
            themeState === "bright" ? "dark-blob" : "bright-blob"
          }`}
          onClick={() => {
            setThemeState(()=>themeState === "bright" ? "dark" : "bright");
          }}
        ></button>
      </div>
    </>
  );
};

export default ThemeButton;
