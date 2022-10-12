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


  const [themeState, setThemeState] = React.useState(localStorage.getItem("theme") || "purple");

  const [Email, setEmail] = React.useState(null);
  const [Password, setPassword] = React.useState(null);
  const [emojiState, setEmojiState] = React.useState();
  console.log(setEmojiState);
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setForm((formProps) => ({ ...formProps, [e.target.name]: e.target.value }));
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
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

        <div className="link">

          <span className="mask">
            <div className="link-container">
   
            <span className="link-title1 title"><span className="hover">Annoying Submit Button</span> <span className={`${emojiState} ${
                form.password.length <= 6 || !validateEmail(form.email) ? "em em-rage" : "em em-smile"
              }`} style={ { height: 20 } }></span> </span>
              <span className="link-title2 title"><span className="hover">Annoying Submit Button</span> <span className={`${emojiState} ${
                form.password.length <= 6 || !validateEmail(form.email) ? "em em-rage" : "em em-face_with_hand_over_mouth"
              }`} style={ { height: 20 } }></span> </span>


            </div>
          </span>
        </div>

        <form
          autoComplete="false"
          action="https://formspree.io/f/xqkjbjzw"
          method="POST"
        >
          <div className="input-block">
            <label for="email" className={`label ${themeState}-theme`}>
              Email <span className="requiredLabel">*</span>
            </label>
            <input
              className={`input ${themeState}-theme ${!Email ? "empty" : ""} ${
                !validateEmail(form.email) ? "wrong-input" : "correct-input"
              }`}
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={(e) => handleEmail(e)}
              placeholder="coffeewithanmol@gmail.com"
              tabIndex={1}
              required
            />
          </div>
          <div>

            {!validateEmail(form.email) && <p className="warning-message">Enter a valid email ID</p> }

          </div>
          <div className="input-block">
            <label for="password" className={`label ${themeState}-theme`}>
              Password <span className="requiredLabel">*</span>
            </label>
            <input
              className={`input ${
                form.password.length <= 6 ? "wrong-input" : "correct-input"
              } ${themeState}-theme ${!Password ? "empty" : ""}`}
              id="password"
              type="password"
              name="password"
              value={form.password}
              onChange={(e) => handlePassword(e)}
              minLength="6"
              tabIndex={2}
              required
            />
          </div>
          <div>

            {form.password.length <= 6 && <p className={`${Password ? "warning-message" : "none"}`}>
                Password should be at least 6 characters long
              </p>
            }
          </div>
          <div
            style={{
              transform: `translateX(${
                toggleClass &&
                !(form.password.length >= 6 && validateEmail(form.email))
                  ? "25vh"
                  : "0"
              }`,
              transition: "transform 190ms ease-in-out",
            }}
          >
            <button
              tabIndex={3}
              className={`submit-button ${
                form.password.length >= 6 && validateEmail(form.email)
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
