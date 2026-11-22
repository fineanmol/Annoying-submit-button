import { useState } from 'react'
import './annoying-submit-button.css'
import useBoing from '../custom-hooks/useBoing'

/**
 * Submit button that slides away on hover when the form is still invalid —
 * classic "annoying submit" UX.
 */
export default function AnnoyingSubmitButton({
  isValid,
  children = 'Submit',
  slideDistance = '33vh',
  transition = 'transform 190ms ease-in-out',
  wrapperClassName,
  className,
  type = 'submit',
  tabIndex = 3,
  sound = false,
  ...buttonProps
}) {
  const [toggleSlide, setToggleSlide] = useState(false)
  const boing = useBoing(sound)

  const { onMouseEnter, ...restButtonProps } = buttonProps

  const handleMouseEnter = (e) => {
    if (!isValid) {
      boing()
      setToggleSlide((prev) => !prev)
    }
    onMouseEnter?.(e)
  }

  return (
    <div
      className={wrapperClassName}
      style={{
        transform: `translateX(${
          toggleSlide && !isValid ? slideDistance : '0'
        })`,
        transition,
      }}
    >
      <button
        type={type === 'button' ? 'button' : 'submit'}
        tabIndex={tabIndex}
        className={className}
        {...restButtonProps}
        onMouseEnter={handleMouseEnter}
      >
        {children}
      </button>
    </div>
  )
}
