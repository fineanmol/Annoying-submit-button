/* eslint linebreak-style: ["error", "windows"] */

import React, { useEffect, useState } from 'react'
import useMediaQuery from '../../custom-hooks/useMediaQuery'
import './ThemeButton.css'

function ThemeButton({ setThemeState, themeState }) {
  const themeNamesArr = ['purple', 'pink', 'skin', 'blue', 'yellow', 'dark', 'green']
  const [display, setDisplay] = useState(true)
  const matches = useMediaQuery('(max-width:786px)')
  useEffect(() => {
    setDisplay(!matches)
  }, [matches])

  return (
    <div>
      <div className="theme-button-container">
        <button type="button" className="drop-down-btn" onClick={() => setDisplay(!display)} style={{ display: matches ? 'flex' : 'none' }}>=</button>
        <div className="drop-down-container" style={{ display: display ? 'flex' : 'none', flexDirection: matches ? 'column' : 'row' }}>

          {themeNamesArr.map((element) => (
            <div
              aria-hidden="true"
              key={element}
              className={`theme-btn ${element} ${themeState}-d`}
              title={`${element}`}
              onClick={() => setThemeState(element)}
            >
              <div className="tick" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ThemeButton
