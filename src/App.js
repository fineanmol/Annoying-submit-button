import React, { useEffect, useState } from 'react'
import './App.css'
import Footer from './components/Footer'
import ThemeButton from './components/ThemeButton'
import useWindowDimensions from './custom-hooks/useWindowDimensions'

function App() {
  const minPasswordLength = 6
  const { height } = useWindowDimensions()

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const [toggleClass, setToggleClass] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [isPasswordShown, setPasswordShown] = useState(false)
  const [isPasswordFocused, setPasswordFocused] = useState(false)
  const [themeState, setThemeState] = useState(
    localStorage.getItem('theme') || 'purple',
  )

  // updated into one handle
  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }
  const isPasswordValid = (password) => {
    // Check if the password length is at least 6
    if (password.length < minPasswordLength) {
      return false
    }
    // Check if the password contains at least one lowercase letter
    if (!/[a-z]/.test(password)) {
      return false
    }
    // Check if the password contains at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      return false
    }
    // Check if the password contains at least one special character
    if (!/[!@#$%^&*()_+{}:;<>,.?~\\-]/.test(password)) {
      return false
    }
    // Check if the password contains at least one numeric character
    if (!/\d/.test(password)) {
      return false
    }
    // All validation criteria passed
    return true
  }
  const validateEmail = (email) => String(email)
    .toLowerCase()
    .trim() // Trim to ignore spaces after user email input
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )

  // eslint-disable-next-line no-unused-vars
  const [emojiState, setEmojiState] = React.useState()
  const annoyingSubmitButton = () => {
    setShowToast(false)

    if (
      !isPasswordValid(form.password)
      || !validateEmail(form.email)
    ) {
      setToggleClass((prevState) => !prevState)
      setShowToast(true)
      setTimeout(() => {
        setShowToast(false)
      }, 1000)
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
                  className={`${emojiState} ${!isPasswordValid(form.password)
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
                  className={`${emojiState} ${!isPasswordValid(form.password)
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
                className={`input ${!isPasswordValid(form.password)
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
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
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
            {isPasswordFocused && (
              <div className={`password-rules-tooltip ${isPasswordFocused ? 'displayed' : ''}`}>
                <p>Password should include</p>
                <ul>
                  <li>At least 6 characters</li>
                  <li>At least 1 lowercase alphabet</li>
                  <li>At least 1 uppercase alphabet</li>
                  <li>At least 1 special character</li>
                  <li>At least 1 numeric character</li>
                </ul>
              </div>
            )}
          </div>
          <div
            style={{
              transform: `translateX(${toggleClass

                && !(
                  isPasswordValid(form.password)
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
              className={`submit-button ${isPasswordValid(form.password)
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
