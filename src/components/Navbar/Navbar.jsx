import React from 'react';
import './Navbar.css';


// import logo from "../../images/logo.png";

const Navbar = ({theme}) => {
  return (
    <header className={theme+"-navbar"}>
      <div className='navbar'>
      <div className='navbar__title'>
        HacktoberFest Project
      </div>
      <div className='btn'>
        
          <a href='https://github.com/fineanmol/Annoying-submit-button '>Contribute Here</a>
         
          </div>
          </div>
  </header>
  );
};

export default Navbar;