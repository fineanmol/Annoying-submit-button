import React, {useMemo} from "react"
import "./Footer.css"

function Footer({theme}) {
  const year = useMemo(() => {
    const dateObj = new Date()
    return dateObj.getFullYear()
  }, [])

  return (
    <footer className={`${theme}-footer`}>
      <div className="footer-content">
        <a href="https://hacktoberfest.com/">
          <h1 className="glitch" id="hacktoberfest-text">
            Hacktoberfest 2022
          </h1>
        </a>
        <div className="footer-menu">
          <ul className="socials">
            <li>
              <a href="https://www.facebook.com/fineanmol">
                <i className="fa fa-facebook" />
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/fineanmol/">
                <i className="fa fa-linkedin-square" />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/fineanmol">
                <i className="fa fa-instagram" />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/fineanmol">
                <i className="fa fa-twitter" />
              </a>
            </li>
            <li>
              <a href="https://github.com/fineanmol">
                <i className="fa fa-github" />
              </a>
            </li>
          </ul>
        </div>
        <p id="footer-text">
          This Project is participating in{" "}
          <b>
            <a href="https://hacktoberfest.com/" id="hf-theme">
              Hacktoberfest
            </a>
          </b>{" "}
          <br />
          Copyright &copy;
          {`${year}`}.
        </p>
      </div>
    </footer>
  )
}

export default Footer
