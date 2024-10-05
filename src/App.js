import React, { useEffect, useState } from 'react'
import './App.css'
import Footer from './components/Footer'
import ThemeButton from './components/ThemeButton'
import useWindowDimensions from './custom-hooks/useWindowDimensions'

function App() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [themeState, setThemeState] = useState('light')
  const [isPasswordShown, setPasswordShown] = useState(false)
  const [toggleClass, setToggleClass] = useState(false)
  const [showToast, setShowToast] = useState(false)
  /* eslint no-unused-vars: "error" */
  const [emojiState, setEmojiState] = useState('')
  const { height } = useWindowDimensions()

  const validatePassword = (password) => {
    const passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/
    return passRegex.test(password)
  }

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/
    return re.test(email)
  }

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const annoyingSubmitButton = () => {
    if (!validatePassword(form.password) || !validateEmail(form.email)) {
      setToggleClass((prevState) => !prevState)
    }
  }

  /* eslint-disable no-unused-vars */
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setShowToast(false)

    if (validatePassword(form.password) || !validateEmail(form.email)) {
      setToggleClass((prevState) => !prevState)
      setShowToast(true)
      setTimeout(() => {
        setShowToast(false)
      }, 1000)
    } else {
      // Form is valid, submit the form to the server or take necessary action.
      try {
        const response = await fetch('https://formspree.io/f/xqkjbjzw', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        })

        if (response.ok) {
          // Handle a successful submission, e.g., redirect the user.
        } else {
          // Handle errors from the server.
        }
      } catch (error) {
        // Handle network or other errors.
      }
    }
  }
  /* eslint-enable no-unused-vars */

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validatePassword(form.password) || !validateEmail(form.email)) {
      setToggleClass((prevState) => !prevState)
      setShowToast(true)
      setTimeout(() => {
        setShowToast(false)
      }, 1000)
    } else {
      // Call the API or any other action
    }
  }

  // To remember the user's selected theme in local storage
  useEffect(() => {
    localStorage.setItem('theme', themeState)
  }, [themeState])

  useEffect(() => {
    if (!validatePassword(form.password) || !validateEmail(form.email)) {
      setEmojiState('em em-rage')
    } else {
      setEmojiState('em em-smile')
    }
  }, [form])
  return (
    <div className="wrapper">
      <ThemeButton setThemeState={setThemeState} themeState={themeState} />
      <section className={`form-section ${themeState}-theme`}>
        <div className="link">
          <span className="mask">
            <div className="link-container">
              <span className="link-title1 title">
                <span className="hover">Annoying Submit Button</span>
                <span
                  className={`${emojiState} ${!validatePassword(form.password)
                      || !validateEmail(form.email)
                    ? 'em em-rage'
                    : 'em em-smile'
                  }`}
                  style={{ height: 20 }}
                />
              </span>
              <span className="link-title2 title">
                <span className="hover">Annoying Submit Button</span>
                <span
                  className={`${emojiState} ${!validatePassword(form.password)
                      || !validateEmail(form.email)
                    ? 'em em-rage'
                    : 'em em-face_with_hand_over_mouth'
                  }`}
                  style={{ height: 20 }}
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
                className={`input ${validatePassword(form.password)
                  ? 'correct-input'
                  : 'wrong-input'
                } ${themeState}-theme ${!form.password ? 'empty' : ''}`}
                id="password"
                type={isPasswordShown ? 'text' : 'password'}
                name="password"
                value={form.password}
                minLength="6"
                maxLength="12"
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
          <div>
            {!validatePassword(form.password) && (
              <p className="warning-message">
                Password should be at least 6 characters long
              </p>
            )}
          </div>
          <div
            style={{
              transform: `translateX(${toggleClass
                  && !(
                    validatePassword(form.password)
                    && validateEmail(form.email)
                  )
                ? '33vh'
                : '0'
              })`,
              transition: 'transform 190ms ease-in-out',
            }}
          >
            <button
              type="submit"
              tabIndex={3}
              className={`submit-button ${validatePassword(form.password)
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
            className={`toast ${showToast ? 'fadeIn' : 'fadeOut'} ${themeState}-theme-toast`}
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
