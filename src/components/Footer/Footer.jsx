import React from "react";
import "./Footer.css";

const Footer = ({theme}) => {
  return (
    <footer className={theme+"-footer"}>
      <div className="footer-content">
      <a href="https://hacktoberfest.com/"><h1 className="glitch">Hacktoberfest 2022</h1></a>
        <div className="footer-menu">
          <ul className="socials">
            <li>
              <a href="https://www.facebook.com/fineanmol">
                <i className="fa fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/fineanmol">
                <i className="fa fa-instagram"></i>
              </a>
            </li>
            <li>
              <a href="https://twitter.com/fineanmol">
                <i className="fa fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/fineanmol">
                <i className="fa fa-youtube"></i>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/fineanmol/">
                <i className="fa fa-linkedin-square"></i>
              </a>
            </li>
          </ul>
        </div>
        <p>
          This Project is participating in <b><a href="https://hacktoberfest.com/">Hacktoberfest</a></b>. Copyright
          &copy; 2022.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
