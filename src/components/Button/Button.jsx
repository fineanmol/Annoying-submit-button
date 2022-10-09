import React from 'react';
import './Button.css';

const Button = ({ onHover, isFormValid, text, type }) => {
    return (
        <button
            tabIndex={-1}
            className={`
                submit-button 
                ${isFormValid() ? "button-success" : ""}
                ${type === 'pill' ? 'btn-pill' : ''}
            `}
            onMouseEnter={onHover}
        >
            {text}
        </button>
    );
};

export default Button;
