import React, { useEffect, useState } from 'react'
import './App.css'
import Footer from './components/Footer'
import ThemeButton from './components/ThemeButton'
import useWindowDimensions from './custom-hooks/useWindowDimensions'
// ...

function App() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [isPasswordShown, setPasswordShown] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toggleClass, setToggleClass] = useState(false)
  const [themeState, setThemeState] = useState('bright')
  const minPasswordLength = 6
  const { height } = useWindowDimensions()

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email)

  const annoyingSubmitButton = () => ('Mouse entered the submit button')

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setShowToast(false)

    if (form.password.length < minPasswordLength || !validateEmail(form.email)) {
      setToggleClass((prevState) => !prevState)
      setToastMessage('You cannot submit until you fix all the validation errors...')
      setShowToast(true)
      setTimeout(() => {
        setShowToast(false)
      }, 1000)
    } else {
      // Form is valid, submit the form to the server or take necessary action.
      try {
        const response = await fetch('https://formspree.io/f/xqkjbjzw', {
          method: 'POST',
          body: JSON.stringify(form),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          setToastMessage('Submission successful! Thank you.')
        } else if (response.status >= 400 && response.status < 500) {
          setToastMessage('Client error: Please check your input and try again.')
        } else {
          setToastMessage('Server error: Please try again later.')
        }
      } catch (error) {
        setToastMessage('Network error: Please check your internet connection.')
      } finally {
        setShowToast(true)
        setTimeout(() => {
          setShowToast(false)
        }, 3000)
      }
    }
  }

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
                <span className={`emoji ${form.password.length < minPasswordLength || !validateEmail(form.email) ? 'em em-rage' : 'em em-smile'}`} style={{ height: 20 }} />
                {' '}
              </span>
              <span className="link-title2 title">
                <span className="hover">Annoying Submit Button</span>
                {' '}
                <span className={`emoji ${form.password.length < minPasswordLength || !validateEmail(form.email) ? 'em em-rage' : 'em em-face_with_hand_over_mouth'}`} style={{ height: 20 }} />
                {' '}
              </span>
            </div>
          </span>
        </div>

        <form
          autoComplete="false"
          onSubmit={handleFormSubmit}
        >
          <div className="input-block">
            <label htmlFor="email" className={`label ${themeState}-theme`}>
              Email
              {' '}
              <span className="requiredLabel">*</span>
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
              onChange={(e) => setForm({ ...form, email: e.target.value })}
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
                className={`input ${form.password.length < minPasswordLength ? 'wrong-input' : 'correct-input'} ${themeState}-theme ${!form.password ? 'empty' : ''}`}
                id="password"
                type={isPasswordShown ? 'text' : 'password'}
                name="password"
                value={form.password}
                minLength="6"
                tabIndex={2}
                required
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <button className="toggle-btn" type="button" onClick={() => setPasswordShown(!isPasswordShown)}>
                {isPasswordShown ? <span className="fa fa-eye">{' '}</span> : <span className="fa fa-eye-slash">{' '}</span>}
              </button>
            </span>
          </div>
          <div>
            {form.password.length < minPasswordLength && (
              <p className={`${form.password ? 'warning-message' : 'none'}`}>
                Password should be at least 6 characters long
              </p>
            )}
          </div>
          <div style={{
            transform: `translateX(${toggleClass && !(form.password.length >= minPasswordLength && validateEmail(form.email)) ? '33vh' : '0'})`,
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
            {toastMessage}
          </div>
        </form>
      </section>
      {height < 680 ? null : <Footer theme={themeState} />}
    </div>
  )
}

export default App
