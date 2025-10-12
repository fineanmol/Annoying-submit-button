import React, { useEffect, useState } from 'react'
import './App.css'
import Footer from './components/Footer'
import ThemeButton from './components/ThemeButton'
import useWindowDimensions from './custom-hooks/useWindowDimensions'

// Constants
const minPasswordLength = 6

// Validation function
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function App() {
  // State variables
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const [themeState, setThemeState] = useState('light')
  const [toggleClass, setToggleClass] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [isPasswordShown, setPasswordShown] = useState(false)

  const { height } = useWindowDimensions()

  // Form handlers
  const handleForm = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Annoying button function
  const annoyingSubmitButton = () => {
    // Add annoying behavior here
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.password.length < minPasswordLength
      || !validateEmail(form.email)) {
      setToggleClass((prevState) => !prevState)
      setShowToast(true)
      setTimeout(() => {
        setShowToast(false)
      }, 1000)
    } else {
      // call the API here o whatever action you need to do
    }
  }
  // To remember user's selected theme.
  useEffect(() => {
    localStorage.setItem('theme', themeState)
  }, [themeState])

  return (
    <div className="wrapper">
      <ThemeButton setThemeState={setThemeState} themeState={themeState} />
      <section className={`form-section ${themeState}-theme`}>
        <div className="link">
          <span className="mask">
            <div className="link-container">
              <span className="link-title1 title">
                <span className="hover">Annoying Submit Button</span>
                {' '}
                <span
                  className={`${form.password.length < minPasswordLength
                    || !validateEmail(form.email)
                    ? 'em em-rage'
                    : 'em em-smile'
                  }`}
                  style={{ height: 20 }}
                />
                {' '}
              </span>
              <span className="link-title2 title">
                <span className="hover">Annoying Submit Button</span>
                {' '}
                <span
                  className={`${form.password.length < minPasswordLength
                    || !validateEmail(form.email)
                    ? 'em em-rage'
                    : 'em em-face_with_hand_over_mouth'
                  }`}
                  style={{ height: 20 }}
                />
                {' '}
              </span>
            </div>
          </span>
        </div>

        <form
          autoComplete="false"
          action="https://formspree.io/f/xqkjbjzw"
          method="POST"
          onChange={handleForm}
          onSubmit={handleSubmit}
        >
          <div className="input-block">
            <label htmlFor="email" className={`label ${themeState}-theme`}>
              Email
              {' '}
              <span className="requiredLabel">*</span>
            </label>
            <input
              className={`input ${themeState}-theme ${!form.email ? 'empty' : ''
              } ${!validateEmail(form.email) ? 'wrong-input' : 'correct-input'
              }`}
              id="email"
              type="email"
              name="email"
              defaultValue={form.email}
              placeholder="Email"
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
              Password
              {' '}
              <span className="requiredLabel">*</span>
            </label>
            <span className="input-password-group">
              <input
                className={`input ${form.password.length < minPasswordLength
                  ? 'wrong-input'
                  : 'correct-input'
                } ${themeState}-theme ${!form.password ? 'empty' : ''}`}
                id="password"
                type={isPasswordShown ? 'text' : 'password'}
                name="password"
                defaultValue={form.password}
                minLength="6"
                tabIndex={2}
                required
              />

              <button className="toggle-btn" type="button" onClick={() => setPasswordShown(!isPasswordShown)}>{isPasswordShown ? <span className="fa fa-eye">{' '}</span> : <span className="fa fa-eye-slash">{' '}</span>}</button>

            </span>
          </div>
          <div>
            {form.password.length < minPasswordLength && (
              <p className={`${form.password ? 'warning-message' : 'none'}`}>
                Password should be at least 6 characters long
              </p>
            )}
          </div>
          <div
            style={{
              transform: `translateX(${toggleClass
                && !(
                  form.password.length >= minPasswordLength
                  && validateEmail(form.email)
                )
                ? '33vh'
                : '0'
              }`,
              transition: 'transform 190ms ease-in-out',
            }}
          >
            <button
              type="submit"
              tabIndex={3}
              className={`submit-button ${form.password.length >= minPasswordLength
                && validateEmail(form.email)
                ? 'button-success'
                : ''
              }`}
              onMouseEnter={annoyingSubmitButton}
            >
              Submit
            </button>
          </div>
          <div
            className={`toast ${showToast ? 'fadeIn' : 'fadeOut'
            } ${themeState}-theme-toast`}
          >
            You cannot submit until you fix all the validation errors...
          </div>
        </form>
      </section>
      {height < 680 ? null : <Footer theme={themeState} />}
    </div>
  )
}

export default App
