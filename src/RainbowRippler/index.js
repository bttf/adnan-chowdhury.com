import React from 'react';
import styled from 'styled-components';
import { range } from 'lodash';

import Ripple from './Ripple';

const RainbowRipplerContainer = ({ children }) => (
  <div
    style={{
      position: 'relative',
      height: '150px',
      width: '150px',
      margin: '50px auto',
    }}
  >{children}</div>
);

const ImageWrapper = ({ children }) => (
  <div
    style={{
      width: '150px',
      height: '150px',
      borderRadius: '75px',
    }}
  >{children}</div>
);

const Image = ({ children }) => (
  <div
    style={{
      background: 'url("/beavis.gif") no-repeat center -5px',
      backgroundSize: '150%',
      borderRadius: '75px',
      height: '100%',
      width: 'auto',
      filter: 'contrast(1.2) brightness(1)',
      transition: 'transform .7s',
      boxShadow: '0 0 12px 0 rgba(150, 150, 150, 50)',
    }}
  >
      {children}
  </div>
);

export default () => {
  return (
    <RainbowRipplerContainer>
      <ImageWrapper>
        <Image />

        {range(24).map(i => (
          <Ripple
            key={i}
            index={i}
            animationDuration={12}
            totalRipples={24}
          />
        ))}
      </ImageWrapper>
    </RainbowRipplerContainer>
  );
};
