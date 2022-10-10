/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
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
  const [themeState, setThemeState] = React.useState("dark");

  const handleForm = (e) => {
    setForm((formProps) => ({ ...formProps, [e.target.name]: e.target.value }));
  };

  const annoyingSubmitButton = () => {
    setShowToast(false);

    if (!validatePassword(form.password) || !validateEmail(form.email)) {
      setToggleClass((prevState) => !prevState);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 1000);
    }
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePassword = (password) => {
    return String(password).match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    );
  };

  return (
    <>
      <ThemeButton setThemeState={setThemeState} themeState={themeState} />
      <section className={`form-section ${themeState}-theme`}>
        <a href="#" className="link">
          <span className="mask">
            <div className="link-container">
              <span className="link-title1 title">
                Annoying Submit Button 😡🙃
              </span>
              <span className="link-title2 title">
                Annoying Submit Button 😡🙃
              </span>
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
            {!validateEmail(form.email) ? (
              <p className="warning-message">Enter a valid email ID</p>
            ) : (
              ""
            )}
          </div>
          <div className="input-block">
            <label className={`label ${themeState}-theme`}>
              Password <span className="requiredLabel">*</span>
            </label>
            <input
              className={`input ${
                !validatePassword(form.password)
                  ? "wrong-input"
                  : "correct-input"
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
            {!validatePassword(form.password) ? (
              <p className="warning-message">
                Password should be at least 8 characters long and should
                contain: <br />
                at least one uppercase letter, one lowercase letter and one
                number.
              </p>
            ) : (
              ""
            )}
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
            You can not submit until you fix all the validation errors...
          </div>
        </form>
      </section>
      <Footer theme={themeState} />
    </>
  );
}

export default App;
