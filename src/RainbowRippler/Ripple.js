import React from 'react';
import './Rippple.css';

const Ripple = ({ borderColor, children, delay, duration }) => (
  <div
    className="ripple"
    style={{
      border: `2px solid ${borderColor}`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
    }}
  >{children}</div>
);

export default ({
  index,
  animationDuration,
  totalRipples,
}) => {
  const borderColor = `hsl(${index * 30}, 58%, 50%)`;
  const animationDelay = (animationDuration / totalRipples) * index;

  return (
    <Ripple
      borderColor={borderColor}
      delay={animationDelay}
      duration={animationDuration}
    />
  );
};
