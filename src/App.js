/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import "./App.css";
import Footer from "./components/Footer";
import ThemeButton from "./components/ThemeButton";

function App() {
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });

  const [toggleClass, setToggleClass] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);
  const [themeState, setThemeState] = React.useState(localStorage.getItem("theme") || "dark");

  const handleForm = (e) => {
    setForm((formProps) => ({ ...formProps, [e.target.name]: e.target.value }));
  };

  const annoyingSubmitButton = () => {
    setShowToast(false);

    if (form.password.length <= 6 || !validateEmail(form.email)) {
      setToggleClass((prevState) => !prevState);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 1000);
    }
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase().trim() //Trim to ignore spaces after user email input
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  // To remember user's selected theme.
  useEffect(() => {
    localStorage.setItem("theme",themeState)
  }, [themeState])
  
  return (
    <>
      <ThemeButton setThemeState={setThemeState} themeState={themeState} />
      <section className={`form-section ${themeState}-theme`}>

        <a href="#" className="link">
          <span className="mask">
            <div className="link-container">
              <span className="link-title1 title">Annoying Submit Button {form.password.length > 6 && validateEmail(form.email)?"😄":"😡"}</span>
              <span className="link-title2 title">Annoying Submit Button {form.password.length > 6 && validateEmail(form.email)?"😄":"😡"}</span>
            </div>
          </span>
        </a>
        
        <form
          autoComplete="false"
          action="https://formspree.io/f/xqkjbjzw"
          method="POST"
        >
          <div className="input-block">
            <label className={`label ${themeState}-theme`}>
              Email <span className="requiredLabel">*</span>
            </label>
            <input
              className={`input ${themeState}-theme ${
                !validateEmail(form.email) ? "wrong-input" : "correct-input"
              }`}
              type="email"
              name="email"
              value={form.email}
              onChange={handleForm}
              placeholder="coffeewithanmol@gmail.com"
              tabIndex={-1}
              required
            />
          </div>
          <div>
            {!validateEmail(form.email) && <p className="warning-message">Enter a valid email ID</p> }
          </div>
          <div className="input-block">
            <label className={`label ${themeState}-theme`}>
              Password <span className="requiredLabel">*</span>
            </label>
            <input
              className={`input ${
                form.password.length <= 6 ? "wrong-input" : "correct-input"
              } ${themeState}-theme`}
              type="password"
              name="password"
              value={form.password}
              onChange={handleForm}
              minLength="6"
              tabIndex={-1}
              required
            />
          </div>
          <div>
            {form.password.length <= 6 && <p className="warning-message">
                Password should be at least 7 characters long
              </p>
            }
          </div>
          <div
            style={{
              transform: `translateX(${
                toggleClass &&
                !(form.password.length > 6 && validateEmail(form.email))
                  ? "25vh"
                  : "0"
              }`,
              transition: "transform 190ms ease-in-out",
            }}
            // className={`submit-button-wrapper ${toggleClass ? 'float-end' : 'float-start'}`}
          >
            <button
              tabIndex={-1}
              className={`submit-button ${
                form.password.length > 6 && validateEmail(form.email)
                  ? "button-success"
                  : ""
              }`}
              onMouseEnter={annoyingSubmitButton}
            >
              Submit
            </button>
          </div>
          <div
            className={`toast ${
              showToast ? "fadeIn" : "fadeOut"
            } ${themeState}-theme-toast`}
          >
            You cannot submit until you fix all the validation errors...
          </div>
        </form>
      </section>
      <Footer theme={themeState} />
    </>
  );
}

export default App;
