import React, { useEffect, useState } from 'react';
import './App.css';
import Footer from './components/Footer';
import ThemeButton from './components/ThemeButton';
import useWindowDimensions from './custom-hooks/useWindowDimensions';

function App() {
  const { height } = useWindowDimensions();
  const [form, setForm] = useState({ email: '', password: '' });
  const [themeState, setThemeState] = useState('light');
  const [toggleClass, setToggleClass] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // Success pop-up state
  const [isPasswordShown, setPasswordShown] = useState(false);

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(form.password) || !validateEmail(form.email)) {
      setToggleClass((prevState) => !prevState);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 1000);
    } else {
      try {
        const response = await fetch('https://formspree.io/f/xqkjbjzw', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        });

        if (response.ok) {
          setForm({ email: '', password: '' });
          setShowSuccessPopup(true); // Show success pop-up after successful submission
        } else {
          alert('There was a problem submitting the form.');
        }
      } catch (error) {
        alert('Network error, please try again later.');
      }
    }
  };

  useEffect(() => {
    localStorage.setItem('theme', themeState);
  }, [themeState]);

  const annoyingSubmitButton = () => {
    if (!validatePassword(form.password) || !validateEmail(form.email)) {
      setToggleClass((prevState) => !prevState);
    }
  };

  return (
    <div className="wrapper">
      <ThemeButton setThemeState={setThemeState} themeState={themeState} />
      <section className={`form-section ${themeState}-theme`}>
        <div className="link">
          <span className="mask">
            <div className="link-container">
              <span className="link-title title">
                <span className="hover">Annoying Submit Button</span>
                <span
                  className={`${
                    !validatePassword(form.password) || !validateEmail(form.email)
                      ? 'em em-rage'
                      : 'em em-smile'
                  }`}
                />
              </span>
            </div>
          </span>
        </div>

        <form
          autoComplete="off"
          action="https://formspree.io/f/xqkjbjzw"
          method="POST"
          onChange={handleForm}
          onSubmit={handleSubmit}
        >
          <div className="input-block">
            <label htmlFor="email" className={`label ${themeState}-theme`}>
              Email <span className="requiredLabel">*</span>
            </label>
            <input
              className={`input ${themeState}-theme ${
                !form.email ? 'empty' : ''
              } ${!validateEmail(form.email) ? 'wrong-input' : 'correct-input'}`}
              id="email"
              type="email"
              name="email"
              value={form.email}
              placeholder="Email"
              tabIndex={1}
              required
            />
          </div>
          {!validateEmail(form.email) && (
            <p className="warning-message">Enter a valid email ID</p>
          )}
          <div className="input-block">
            <label htmlFor="password" className={`label ${themeState}-theme`}>
              Password <span className="requiredLabel">*</span>
            </label>
            <span className="input-password-group">
              <input
                className={`input ${
                  !validatePassword(form.password) ? 'wrong-input' : 'correct-input'
                } ${themeState}-theme ${!form.password ? 'empty' : ''}`}
                id="password"
                type={isPasswordShown ? 'text' : 'password'}
                name="password"
                value={form.password}
                minLength={8}
                tabIndex={2}
                required
              />
              <button
                className="toggle-btn"
                type="button"
                onClick={() => setPasswordShown(!isPasswordShown)}
              >
                {isPasswordShown ? (
                  <span className="fa fa-eye" />
                ) : (
                  <span className="fa fa-eye-slash" />
                )}
              </button>
            </span>
          </div>
          {!validatePassword(form.password) && (
            <p className="warning-message">
              Password must be at least 8 characters long, contain at least 1 uppercase letter, 1 special character, and 1 number.
            </p>
          )}
          <div className={`submit-container ${toggleClass ? 'shake' : ''}`}>
            <button
              type="submit"
              tabIndex={3}
              className={`submit-button ${
                validatePassword(form.password) && validateEmail(form.email)
                  ? 'button-success'
                  : ''
              }`}
              onMouseEnter={annoyingSubmitButton}
            >
              Submit
            </button>
          </div>
          <div className={`toast ${showToast ? 'fadeIn' : 'fadeOut'} ${themeState}-theme-toast`}>
            You cannot submit until you fix all the validation errors...
          </div>
        </form>
      </section>

      {showSuccessPopup && (
        <div className="success-popup">
          <div className="popup-content">
            <h3>Success!</h3>
            <p>Your form has been submitted successfully.</p>
            <button type="button" onClick={() => setShowSuccessPopup(false)}>Close</button>
          </div>
        </div>
      )}

      {height < 680 ? null : <Footer theme={themeState} />}
    </div>
  );
}

export default App;
