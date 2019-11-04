import React from 'react';
import styled from 'styled-components';

import RainbowRippler from '../RainbowRippler';

const NameAndTitle = styled('div')`
  text-align: center;
  color: #333;
  text-shadow: 1px 1px 0 rgba(0, 0, 0, .2);
  margin-bottom: 1rem;
`;

const Name = styled('div')`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: .5rem;
`;

export const Divider = styled('hr')`
  width: 40%;
  border: 1px solid #eee;
`;

const Title = styled('div')`
  font-size: 2rem;
  font-weight: bold;
  font-style: italic;
`;

export default () => {
  return (
    <React.Fragment>
      <RainbowRippler />

      <NameAndTitle>
        <Name>Adnan Chowdhury</Name>
        <Divider />
        <Title>Software Engineer</Title>
      </NameAndTitle>
    </React.Fragment>
  );
};
