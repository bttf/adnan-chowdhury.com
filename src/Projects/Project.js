import React from 'react';
import styled from 'styled-components';
import { values } from 'lodash';
import './Project.css';

import { TAGS } from '.';

const getTagColor = tag => {
  const index = values(TAGS).indexOf(tag);
  return `hsl(${(index * 66) + 200}, 70%, 50%)`;
};

const Container = ({ children }) => (
  <div className="container">
    {children}
  </div>
)

const Logo = ({ alignRight, bgColor, children }) => (
  <div
    className={`logo ${alignRight ? 'right' : ''}`}
    style={{
      backgroundColor: bgColor || 'white',
    }}
  >
      {children}
  </div>
);

const NameAndDescription = ({ alignRight, children }) => (
  <div className={`name-and-description ${alignRight ? 'right' : ''}`}>
    {children}
  </div>
);

const Name = ({ children }) => (
  <div
    className="name"
  >
    {children}
  </div>
);

const Description = styled('div')`
  margin-bottom: 1rem;
  font-size: 1.2rem;
  text-align: center;

  @media(min-width: 550px) {
    flex: 1;
    text-align: ${p => p.alignRight ? 'right' : 'left'};
  }
`;

const Tags = styled('div')`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 1rem;
  width: 100%;

  @media(min-width: 550px) {
    justify-content: ${p => p.alignRight ? 'flex-end' : 'flex-start'};
  }
`;

const Tag = styled('div')`
  margin-bottom: .5rem;
  color: white;
  padding: .25rem .5rem;
  margin-right: .5rem;
  border-radius: .5rem;
  background-color: ${p => getTagColor(p.tag)};

  &:last-child {
    margin-right: 0;
  }
`;

export default ({
  name,
  urls,
  displayImg,
  description,
  tags,
  index,
  bgColor,
}) => {
  const firstUrl = urls[Object.keys(urls)[0]];
  const reverseOrder = index % 2 === 1;
  return (
    <Container>
      <Logo alignRight={reverseOrder} bgColor={bgColor}>
        <img src={displayImg} alt={name} />
      </Logo>

      <NameAndDescription alignRight={!reverseOrder}>
        <Name>
          <a href={firstUrl}>{name}</a>
        </Name>

        <Description alignRight={reverseOrder}>
          {description}

          {Object.keys(urls).map(cta => (
            <span key={cta}> (<a href={urls[cta]}>{cta}</a>)</span>
          ))}
        </Description>

        <Tags alignRight={reverseOrder}>
          {tags.map((t, i) => (<Tag key={t} index={i} tag={t}>{t}</Tag>))}
        </Tags>
      </NameAndDescription>
    </Container>
  );
};
