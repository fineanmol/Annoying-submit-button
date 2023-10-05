import React, { useEffect, useState } from 'react'
import './App.css'
import Footer from './components/Footer'
import ThemeButton from './components/ThemeButton'
import useWindowDimensions from './custom-hooks/useWindowDimensions'
// ...

const App = () => {
  // ... (existing code)

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setShowToast(false);

    if (
      form.password.length < minPasswordLength ||
      !validateEmail(form.email)
    ) {
      setToggleClass((prevState) => !prevState);
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
        {/* ... (existing code) */}
      </form>
    </div>
  );
};

export default App;
