import React, { useMemo } from 'react'
import './Footer.css'

function Footer({ theme }) {
  const year = useMemo(() => {
    const dateObj = new Date()
    return dateObj.getFullYear()
  }, [])

  return (
    <footer className={`${theme}-footer`}>
      <div className="footer-content">
        <a href="https://hacktoberfest.com/">
          <h1 className="glitch" id="hacktoberfest-text">
            Hacktoberfest
            {` ${year}`}
          </h1>
        </a>
        <div className="footer-menu">
          <ul className="socials">
            <li>
              <a href="https://www.facebook.com/fineanmol" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="fa fa-facebook" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/fineanmol/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i className="fa fa-linkedin-square" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/fineanmol" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="fa fa-instagram" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/fineanmol" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <i className="fa fa-twitter" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href="https://github.com/fineanmol" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <i className="fa fa-github" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
        <p id="footer-text">
          This Project is participating in
          {' '}
          <b>
            <a href="https://hacktoberfest.com/" id="hf-theme" target="_blank" rel="noopener noreferrer">
              Hacktoberfest
            </a>
          </b>
          {' '}
          <br />
          Copyright &copy;
          {`${year}`}
          .
        </p>
      </div>
    </footer>
  )
}

export default Footer
