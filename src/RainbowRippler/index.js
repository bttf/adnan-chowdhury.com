import React from 'react';
import styled from 'styled-components';
import { range } from 'lodash';

import Ripple from './Ripple';

const RainbowRipplerContainer = styled('div')`
  position: relative;
  height: 150px;
  width: 150px;
  margin: 50px auto;
`;

const ImageWrapper = styled('div')`
  height: 150px;
  width: 150px;
  border-radius: 75px;
`;

const Image = styled('div')`
  background: url("/beavis.gif") no-repeat center -5px;
  background-size: 150%;
  border-radius: 75px;
  height: 100%;
  width: auto;
  filter: contrast(1.2) brightness(1);
  transition: transform .7s;
  box-shadow: 0 0 12px 0 rgba(150, 150, 150, 50);

  &:hover {
    transform: scale(1.4, 1.4);
  }
`;

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
