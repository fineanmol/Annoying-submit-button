/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import ThemeButton from "./components/ThemeButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;

function App() {
  const minPasswordLength = 6;

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [toggleClass, setToggleClass] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const [themeState, setThemeState] = React.useState(
    localStorage.getItem("theme") || "purple"
  );

  // updated into one handle
  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // eslint-disable-next-line no-unused-vars
  const [emojiState, setEmojiState] = React.useState();
  const annoyingSubmitButton = () => {
    setShowToast(false);

    if (
      form.password.length < minPasswordLength ||
      !validateEmail(form.email)
    ) {
      setToggleClass((prevState) => !prevState);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 1000);
    }
  };
  // toggle password handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .trim() //Trim to ignore spaces after user email input
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  // To remember user's selected theme.
  useEffect(() => {
    localStorage.setItem("theme", themeState);
  }, [themeState]);

  return (
    <>
      <ThemeButton setThemeState={setThemeState} themeState={themeState} />
      <section className={`form-section ${themeState}-theme`}>
        <div className="link">
          <span className="mask">
            <div className="link-container">
              <span className="link-title1 title">
                <span className="hover">Annoying Submit Button</span>{" "}
                <span
                  className={`${emojiState} ${
                    form.password.length < minPasswordLength ||
                    !validateEmail(form.email)
                      ? "em em-rage"
                      : "em em-smile"
                  }`}
                  style={{ height: 20 }}
                ></span>{" "}
              </span>
              <span className="link-title2 title">
                <span className="hover">Annoying Submit Button</span>{" "}
                <span
                  className={`${emojiState} ${
                    form.password.length < minPasswordLength ||
                    !validateEmail(form.email)
                      ? "em em-rage"
                      : "em em-face_with_hand_over_mouth"
                  }`}
                  style={{ height: 20 }}
                ></span>{" "}
              </span>
            </div>
          </span>
        </div>

        <form
          autoComplete="false"
          action="https://formspree.io/f/xqkjbjzw"
          method="POST"
          onChange={handleForm}
        >
          <div className="input-block">
            <label htmlFor="email" className={`label ${themeState}-theme`}>
              Email <span className="requiredLabel">*</span>
            </label>
            <input
              className={`input ${themeState}-theme ${
                !form.email ? "empty" : ""
              } ${
                !validateEmail(form.email) ? "wrong-input" : "correct-input"
              }`}
              id="email"
              type="email"
              name="email"
              defaultValue={form.email}
              placeholder="coffeewithanmol@gmail.com"
              tabIndex={1}
              required
            />
          </div>
          <div>
            {!validateEmail(form.email) && (
              <p className="warning-message">Enter a valid email ID</p>
            )}
          </div>
          <div className="input-block">
            <label htmlFor="password" className={`label ${themeState}-theme`}>
              Password <span className="requiredLabel">*</span>
            </label>
            <div className="password-input">
              <input
                className={`input ${
                  form.password.length < minPasswordLength
                    ? "wrong-input"
                    : "correct-input"
                } ${themeState}-theme ${!form.password ? "empty" : ""}`}
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                defaultValue={form.password}
                minLength="6"
                tabIndex={2}
                required
              />
              <i onClick={togglePassword}>{eye}</i>
            </div>
          </div>
          <div>
            {form.password.length < minPasswordLength && (
              <p className={`${form.password ? "warning-message" : "none"}`}>
                Password should be at least 6 characters long
              </p>
            )}
          </div>
          <div
            style={{
              transform: `translateX(${
                toggleClass &&
                !(
                  form.password.length >= minPasswordLength &&
                  validateEmail(form.email)
                )
                  ? "33vh"
                  : "0"
              }`,
              transition: "transform 190ms ease-in-out",
            }}
          >
            <button
              tabIndex={3}
              className={`submit-button ${
                form.password.length >= minPasswordLength &&
                validateEmail(form.email)
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
