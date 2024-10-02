import './Button.css'

function Button({
  onHover, isFormValid, text, type,
}) {
  return (
    <button
      type="button"
      tabIndex={-1}
      className={`
          submit-button 
          ${isFormValid() ? 'button-success' : ''}
          ${type === 'pill' ? 'btn-pill' : ''}
      `}
      onMouseEnter={onHover}
    >
      {text}
    </button>
  )
}

export default Button
