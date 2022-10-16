import React, { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import ToggleButton from "../sidebar/ToggleButton";

const ThemeButton = ({ setThemeState, themeState }) => {

  const [Toggle, setToggle] = useState({
    sidebar: "-250px",
    toggle: false
  })

  return (
    <div>
      {
        Toggle?<><Sidebar themeState={themeState} setThemeState={setThemeState} Toggle={Toggle}/></>:<></>
      }
      <ToggleButton themeState={themeState} Toggle = {Toggle} setToggle={setToggle}/>
    </div>
  );
};

export default ThemeButton;
