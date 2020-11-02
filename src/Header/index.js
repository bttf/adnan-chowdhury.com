import React from 'react';

import RainbowRippler from '../RainbowRippler';

const NameAndTitle = ({ children }) => (
  <div
    style={{
      textAlign: 'center',
      color: '#333',
      textShadow: '1px 1px 0 rgba(0, 0, 0, .2)',
      marginBottom: '1rem',
    }}
  >{children}</div>
);

const Name = ({ children }) => (
  <div
    style={{
      fontSize: '3rem',
      fontWeight: 'bold',
      marginBottom: '.5rem',
    }}
  >{children}</div>
);

export const Divider = ({ children }) => (
  <hr
    style={{
      width: '40%',
      border: '1px solid #eee',
    }}
  >{children}</hr>
);

const Title = ({ children }) => (
  <div
    style={{
      fontSize: '2rem',
      fontWeight: 'bold',
      fontStyle: 'italic',
    }}
  >{children}</div>
);

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
