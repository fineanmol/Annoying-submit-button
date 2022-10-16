import React from "react";
import "./Sidebar.css";

const Sidebar = ({ Toggle, themeState, setThemeState }) => {
  const themes = [
    {
      theme: "purple",
    },
    {
      theme: "pink",
    },
    {
      theme: "skin",
    },
    {
      theme: "dark",
    },
    {
      theme: "lemon",
    },
    {
      theme: "orange",
    },
    {
      theme: "teal",
    },
    {
      theme: "coral",
    },
  ];

  return (
    <>
      <div
        style={{
          right: `${Toggle.sidebar}`,
        }}
        className="sidebar"
      >
        <div className="inside">
          <div className="heading">Themes</div>
          <div
            style={{
              animation: `${Toggle.toggle ? "fade 2s" : ""}`,
            }}
            className="themes-menu"
          >
            {themes.map((el) => (
              <div
                onClick={() => setThemeState(el.theme)}
                className={`btn ${el.theme}`}
              ></div>
            ))}
          </div>
          <div className="heading">Premium ⭐</div>
          <div
            style={{
              animation: `${Toggle.toggle ? "fade 3s" : ""}`,
            }}
            className="themes-menu"
          >
            <div className="btn"></div>
            <div className="btn"></div>
            <div className="btn"></div>
            <div className="btn"></div>
            <div className="btn"></div>
            <div className="btn"></div>
            <div className="btn"></div>
            <div className="btn"></div>
          </div>
          <h1 className="uns">Currently, No Premium Themes Support 😒</h1>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
