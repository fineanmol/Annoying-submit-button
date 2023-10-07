import React, { useEffect, useState } from 'react';
import './App.css';
import Footer from './components/Footer';
import ThemeButton from './components/ThemeButton';
import useWindowDimensions from './custom-hooks/useWindowDimensions';

const App = () => {
  // ... (existing code)
  
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setShowToast(false);

    setEmailError(''); // Clear previous error messages
    setPasswordError('');

    if (form.password.length < minPasswordLength) {
      setPasswordError('Password must be at least ' + minPasswordLength + ' characters long.');
    }

    if (!validateEmail(form.email)) {
      setEmailError('Please enter a valid email address.');
    }

    if (passwordError || emailError) {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 1000);
    } else {
      // Form is valid, submit the form to the server or take necessary action.
      try {
        const response = await fetch('https://formspree.io/f/xqkjbjzw', {
          method: 'POST',
          body: JSON.stringify(form),
        });

        if (response.ok) {
          // Handle a successful submission, e.g., redirect the user.
        } else {
          // Handle errors from the server.
        }
      } catch (error) {
        // Handle network or other errors.
      }
    }
  };

  return (
    <div className="wrapper">
      {/* ... (existing code) */}
      <form
        autoComplete="false"
        action="https://formspree.io/f/xqkjbjzw"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleInputChange}
            required
          />
          {emailError && <div className="error">{emailError}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleInputChange}
            required
          />
          {passwordError && <div className="error">{passwordError}</div>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
