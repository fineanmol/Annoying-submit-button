import React, { useEffect, useState } from "react";
import useMediaQuery from "../../custom-hooks/useMediaQuery";
import "./ThemeButton.css";

const ThemeButton = ({ setThemeState, themeState }) => {
  const themeNamesArr = ["purple", "pink", "skin", "blue","yellow" ,"dark"];
  const [display, setDisplay] = useState(true);
  const matches = useMediaQuery("(max-width:786px)");
  useEffect(() => {
    setDisplay(!matches);
  }, [matches])


  return (
    <div>
      <div className="theme-button-container">
        <button className="drop-down-btn" onClick={() => setDisplay(!display)} style={{ display: matches ? "flex" : "none" }}>=</button>
        <div className="drop-down-container" style={{ display: display ? "flex" : "none", flexDirection: matches ? "column" : "row" }}>

          {themeNamesArr.map((el) => (
            <div
              key={el}
              className={`theme-btn ${el} ${themeState}-d`}
              title={`${el}`}
              onClick={() => setThemeState(el)}
            >
              <div className="tick"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeButton;
