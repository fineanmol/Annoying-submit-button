import React, { useEffect, useState } from 'react';
import './App.css';
import Footer from './components/Footer';
import ThemeButton from './components/ThemeButton';
import useWindowDimensions from './custom-hooks/useWindowDimensions';

const App = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showToast, setShowToast] = useState(false);
  const [toggleClass, setToggleClass] = useState(false);
  const [isPasswordShown, setPasswordShown] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [themeState, setThemeState] = useState(localStorage.getItem('theme') || 'light');
  const { height } = useWindowDimensions();
  const minPasswordLength = 6;

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePasswordStrength = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minPasswordLength) {
      return 'Password should be at least 6 characters long';
    } else if (!hasUpperCase) {
      return 'Password should contain at least one uppercase letter';
    } else if (!hasLowerCase) {
      return 'Password should contain at least one lowercase letter';
    } else if (!hasNumbers) {
      return 'Password should contain at least one number';
    } else if (!hasSpecialChar) {
      return 'Password should contain at least one special character';
    } else {
      return 'Strong password';
    }
  };

  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
    if (name === 'password') {
      const strength = validatePasswordStrength(value);
      setPasswordStrength(strength);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setShowToast(false);

    if (form.password.length < minPasswordLength || !validateEmail(form.email)) {
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
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form),
        });

        if (response.ok) {
          // Handle successful form submission
        } else {
          // Handle form submission errors
        }
      } catch (error) {
        console.error('Form submission failed:', error);
      }
    }
  };

  useEffect(() => {
    localStorage.setItem('theme', themeState);
  }, [themeState]);

  const annoyingSubmitButton = () => {
    if (form.password.length < minPasswordLength || !validateEmail(form.email)) {
      setToggleClass((prevState) => !prevState);
    }
  };

  return (
    <div className="wrapper">
      <ThemeButton setThemeState={setThemeState} themeState={themeState} />
      <section className={`form-section ${themeState}-theme`}>
        <form
          autoComplete="off"
          method="POST"
          onChange={handleForm}
          onSubmit={handleFormSubmit}
        >
          <div className="input-block">
            <label htmlFor="email" className={`label ${themeState}-theme`}>
              Email <span className="requiredLabel">*</span>
            </label>
            <input
              className={`input ${themeState}-theme ${!form.email ? 'empty' : ''} ${!validateEmail(form.email) ? 'wrong-input' : 'correct-input'}`}
              id="email"
              type="email"
              name="email"
              value={form.email}
              placeholder="Email"
              tabIndex={1}
              required
            />
          </div>
          {!validateEmail(form.email) && <p className="warning-message">Enter a valid email ID</p>}

          <div className="input-block">
            <label htmlFor="password" className={`label ${themeState}-theme`}>
              Password <span className="requiredLabel">*</span>
            </label>
            <span className="input-password-group">
              <input
                className={`input ${form.password.length < minPasswordLength ? 'wrong-input' : 'correct-input'} ${themeState}-theme ${!form.password ? 'empty' : ''}`}
                id="password"
                type={isPasswordShown ? 'text' : 'password'}
                name="password"
                value={form.password}
                minLength="6"
                tabIndex={2}
                required
              />
              <button className="toggle-btn" type="button" onClick={() => setPasswordShown(!isPasswordShown)}>
                {isPasswordShown ? <span className="fa fa-eye"></span> : <span className="fa fa-eye-slash"></span>}
              </button>
            </span>
          </div>
          {form.password && <p className="warning-message">{passwordStrength}</p>}

          <div
            style={{
              transform: `translateX(${toggleClass &&
                !(form.password.length >= minPasswordLength && validateEmail(form.email)) ? '33vh' : '0'
              }`,
              transition: 'transform 190ms ease-in-out',
            }}
          >
            <button
              type="submit"
              tabIndex={3}
              className={`submit-button ${form.password.length >= minPasswordLength && validateEmail(form.email) ? 'button-success' : ''}`}
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
      {height < 680 ? null : <Footer theme={themeState} />}
    </div>
  );
};

export default App;
