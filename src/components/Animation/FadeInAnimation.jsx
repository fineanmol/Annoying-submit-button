import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import './FadeInAnimation.css'; // Import your animation styles

function FadeInAnimation() {
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    // Trigger the component to appear after a delay (you can change this logic)
    setTimeout(() => {
      setShowComponent(true);
    }, 1000); // Wait for 1 second before showing the component
  }, []);

  return (
    <CSSTransition
      in={showComponent}
      timeout={1000} // Animation duration in milliseconds
      classNames="fade"
      unmountOnExit
    >
      <div className="fade-in-element">This element will fade in</div>
    </CSSTransition>
  );
}

export default FadeInAnimation;
