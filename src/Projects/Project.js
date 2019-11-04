import React from 'react';
import styled from 'styled-components';
import { values } from 'lodash';

import { TAGS } from '.';

const getTagColor = tag => {
  const index = values(TAGS).indexOf(tag);
  return `hsl(${(index * 66) + 200}, 70%, 50%)`;
};

const Container = styled('div')`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 2rem;

  transition: all .5s;

  @media(min-width: 550px) {
    display: flex;
    align-items: center;
    margin-bottom: 4rem;
  }
`;

const Logo = styled('div')`
  flex: 1 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  max-width: 200px;
  height: 200px;
  padding: 1rem;
  margin-bottom: 1rem;
  overflow: hidden;

  border-radius: 1rem;

  box-sizing: border-box;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);

  background-color: ${p => p.bgColor ? p.bgColor : 'white'};

  img {
    width: 100%;
    height: auto;
  }

  @media(min-width: 550px) {
    order: ${p => p.alignRight ? 1 : 0};

    flex: 1;

    display: flex;
    align-items: center;
    justify-content: center;

    max-width: 200px;
    height: 200px;

    margin: 0 2rem;
    padding: .5rem 1rem;
    box-sizing: border-box;

    border-radius: 24px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);

    overflow: hidden;

    img {
      width: 100%;
    }
  }
`;

const NameAndDescription = styled('div')`
  flex: 1 100%;

  padding: 0 2rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media(min-width: 400px) {
    padding: 0 3rem;
  }

  @media(min-width: 550px) {
    order: ${p => p.alignRight ? 1 : 0};

    align-items: ${p => p.alignRight ? 'flex-start' : 'flex-end'};
    text-align: left;

    flex: 1;
    padding: 0 1rem;
    height: 200px;
  }
`;

const Name = styled('div')`
  font-size: 2rem;
  font-weight: 400;

  margin-bottom: 1rem;

  text-align: center;

  a {
    color: #333;
    text-decoration: none;
  }

  @media(min-width: 550px) {
    flex: 1;

    display: flex;
    align-items: center;

    font-size: 2rem;
    font-weight: 400;

    padding: .5rem 0;
    margin-bottom: 0;
  }
`;

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
            <span> (<a href={urls[cta]}>{cta}</a>)</span>
          ))}
        </Description>

        <Tags alignRight={reverseOrder}>
          {tags.map((t, i) => (<Tag index={i} tag={t}>{t}</Tag>))}
        </Tags>
      </NameAndDescription>
    </Container>
  );
};
