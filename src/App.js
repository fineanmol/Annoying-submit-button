import React, { useEffect, useState } from 'react'
import './App.css'
import Footer from './components/Footer'
import ThemeButton from './components/ThemeButton'
import useWindowDimensions from './custom-hooks/useWindowDimensions'

const minPasswordLength = 6

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

function App() {
  const { height, width } = useWindowDimensions()
  const [form, setForm] = useState({ email: '', password: '' })
  const [toggleClass, setToggleClass] = useState(false)
  const [isPasswordShown, setPasswordShown] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [emojiState, setEmojiState] = useState('em em-rolling_on_the_floor_laughing')
  const [themeState, setThemeState] = useState(localStorage.getItem('theme') || 'bright')

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  // Annoying button function
  const annoyingSubmitButton = () => {
    if (form.password.length < minPasswordLength
      || !validateEmail(form.email)) {
      setToggleClass((prevState) => !prevState)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.password.length < minPasswordLength || !validateEmail(form.email)) {
      setToggleClass((prevState) => !prevState)
      setShowToast(true)
      setTimeout(() => {
        setShowToast(false)
      }, 2000)
    } else {
      // call the API here o whatever action you need to do
    }
  }
  // To remember user's selected theme.
  useEffect(() => {
    localStorage.setItem('theme', themeState)
  }, [themeState])

  useEffect(() => {
    if (width < 600) setEmojiState('em em-flushed')
    else setEmojiState('em em-rolling_on_the_floor_laughing')
  }, [width])

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
                    : `${emojiState} em em-smile`
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
                    : `${emojiState} em em-face_with_hand_over_mouth`
                  }`}
                  style={{ height: 20 }}
                />
                {' '}
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
              value={form.email}
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
                value={form.password}
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
