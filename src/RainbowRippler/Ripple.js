import React from 'react';
import styled from 'styled-components';

const Ripple = styled('div')`
  @keyframes rippleEffect {
      0% { transform: scale(.9, .9); opacity: 1; }
      10% { opacity: 1; }
      40% { opacity: 0; }
      100% { transform: scale(2, 2); opacity: 0; }
  }

  position: absolute;
  top: 0;
  z-index: -9;

  height: 150px;
  width: 150px;

  border-radius: 75px;
  border: 2px solid ${p => p.borderColor};

  opacity: 0;

  animation-name: rippleEffect;
  animation-iteration-count: infinite;
  animation-delay: ${p => p.delay}s;
  animation-duration: ${p => p.duration}s;
`;

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
