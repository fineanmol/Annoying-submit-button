import React from "react";
import "./ThemeButton.css";

const ThemeButton = ({ setThemeState, themeState }) => {
  return (
    <div>
      <div className="theme-button-container">
        <div
          className={`theme-btn purple ${themeState}-d`}
          onClick={() => setThemeState("purple")}
        >
          <div className="tick"></div>
        </div>
        <div
          className={`theme-btn pink ${themeState}-c`}
          onClick={() => setThemeState("pink")}
        >
          <div className="tick"></div>
        </div>
        <div
          className={`theme-btn skin ${themeState}-b`}
          onClick={() => setThemeState("skin")}
        >
          <div className="tick"></div>
        </div>
        <div
          className={`theme-btn dark ${themeState}-a`}
          onClick={() => setThemeState("dark")}
        >
          <div className="tick"></div>
        </div>
      </div>
    </div>
  );
};

export default ThemeButton;
