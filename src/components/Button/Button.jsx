import React from 'react';
import './Button.css';

function Button({
  onHover, isFormValid, text, type,
}) {
  const handleMouseEnter = () => {
    // Add a random effect to the button movement
    const randomX = Math.floor(Math.random() * 10 - 5); // Random number between -5 and 5
    const randomY = Math.floor(Math.random() * 10 - 5); // Random number between -5 and 5

    // Apply the random effect to the button
    const button = document.querySelector('.submit-button');
    button.style.transform = `translate(${randomX}px, ${randomY}px)`;
    
    // Call the original onHover function
    onHover();
  };

  return (
    <button
      type="button"
      tabIndex={-1}
      className={`
          submit-button 
          ${isFormValid() ? 'button-success' : ''}
          ${type === 'pill' ? 'btn-pill' : ''}
      `}
      onMouseEnter={handleMouseEnter}
    >
      {text}
    </button>
  );
}

export default Button;
