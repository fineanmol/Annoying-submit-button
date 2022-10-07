import React from 'react';
import './App.css';
import Footer from './components/Footer';
import ThemeButton from './components/ThemeButton'

function App() {
  const [form, setForm] = React.useState({
    email: '',
    password: '',
  });

  const [toggleClass, setToggleClass] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);
  const [themeState, setThemeState] = React.useState("dark")

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
      }, 1000)
    }


  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  return (
    <>
      <ThemeButton setThemeState={setThemeState} themeState={themeState}/>
      <section className={`form-section ${themeState}-theme`}>
        <h1 className="heading">Annoying Submit Button 😡🙃</h1>
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
              className={`input ${themeState}-theme ${!validateEmail(form.email) ? 'wrong-input' : 'correct-input'
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
              <p className="warning-message">
                Enter a valid email id
              </p>
            ) : (
              ''
            )}
          </div>
          <div className="input-block">
            <label className={`label ${themeState}-theme`}>
              Password <span className="requiredLabel">*</span>
            </label>
            <input
              className={`input ${form.password.length <= 6 ? 'wrong-input' : 'correct-input'
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
            {form.password.length <= 6 ? (
              <p className="warning-message">
                Password length should be more than 6
              </p>
            ) : (
              ''
            )}
          </div>
          <div
            className={`submit-button-wrapper ${toggleClass ? 'float-end' : 'float-start'}`}
          >
            <button
              tabIndex={-1}
              className={`submit-button ${(form.password.length > 6 && validateEmail(form.email) )? 'button-success' : ''
                }`}
              onMouseEnter={annoyingSubmitButton}
            >
              Submit
            </button>
          </div>
          <div className={`toast ${showToast ? 'fadeIn' : 'fadeOut'} ${themeState}-theme-toast`}>
            You can not submit until you fix all the validation errors...
          </div>
        </form>
      </section>
      <Footer theme={themeState}/>
    </>
  );
}

export default App;
