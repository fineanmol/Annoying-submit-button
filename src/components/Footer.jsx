import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
<footer>
        <div className="footer-content">
            <h3>Hacktoberfest 2022</h3>
            <p>This Project is participating in <b>Hacktoberfest</b>. Copyright &copy; 2022.</p>
           
            <div className="footer-menu">
            <ul className="socials">
                <li><a href="https://www.facebook.com/fineanmol"><i className="fa fa-facebook"></i></a></li>
                <li><a href="https://twitter.com/fineanmol"><i className="fa fa-twitter"></i></a></li>
                <li><a href="https://www.instagram.com/fineanmol"><i className="fa fa-instagram"></i></a></li>
                <li><a href="https://www.instagram.com/fineanmol"><i className="fa fa-youtube"></i></a></li>
                <li><a href="https://www.linkedin.com/in/fineanmol/"><i className="fa fa-linkedin-square"></i></a></li>
            </ul>
            </div>
        </div>
    </footer>
  );
};

export default Footer;
