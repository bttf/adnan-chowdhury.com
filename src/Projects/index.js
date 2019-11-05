import React from 'react';
import styled from 'styled-components';

import { MAX_WIDTH } from '../App'
import { Divider } from '../Header';
import Project from './Project';

const Container = styled('div')`
  flex: 1;
  margin-top: 2rem;
  max-width: 800px;
`;

const Title = styled('div')`
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  font-style: italic;
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.2);
  margin-bottom: 1rem;
`;

export const TAGS = {
  WEBPACK: 'Webpack',
  EMBER: 'Ember.js',
  NODE: 'Node.js',
  POSTGRES: 'PostgreSQL',
  DOCKER: 'Docker',
  TYPESCRIPT: 'TypeScript',
  REACT: 'React',
  C: 'C',
  GCC: 'gcc',
  GDB: 'gdb',
  REACT_NATIVE: 'React Native',
  GRAPHQL: 'GraphQL',
  FLOW: 'Flow',
  KUBERNETES: 'Kubernetes',
  JAVASCRIPT: 'JavaScript',
  JASMINE: 'Jasmine',
  THREEJS: 'Three.js',
  GRUNT: 'Grunt',
};

export default () => {
  return (
    <Container>
      <Title>Incomplete Projects</Title>

      <Divider style={{ marginBottom: '2rem' }} />

      {incompleteProjects.map((project, i) => (
        <Project
          key={project.name}
          index={i}
          {...project}
        />
      ))}

      <Title>Completed Projects</Title>

      <Divider style={{ marginBottom: '2rem' }} />

      {completedProjects.map((project, i) => (
        <Project
          key={project.name}
          index={i}
          {...project}
        />
      ))}
    </Container>
  );
};

const completedProjects = [{
  name: 'Slushi.es',
  urls: {
    'Visit': 'http://slushies.redpine.software',
  },
  displayImg: '/slushies.png',
  description: 'A cloud bookmarking solution made as a utility for browsing the web.',
  tags: [TAGS.EMBER, TAGS.NODE, TAGS.POSTGRES, TAGS.DOCKER],
}, {
  name: 'Scribble.today',
  urls: {
    'Visit': 'https://scribble.today',
  },
  displayImg: '/scribble.svg',
  description: 'A full-stack journaling web application that inspires creativity by utilizing Impressionist art.',
  tags: [TAGS.EMBER, TAGS.NODE, TAGS.POSTGRES, TAGS.DOCKER],
}, {
  name: 'Quartzy',
  urls: {
    'Visit': 'https://quartzy.com',
  },
  displayImg: '/quartzy.png',
  description: 'Quartzy redesigned their frontend application to use Ember.js, and I helped lead the development of it.',
  tags: [TAGS.EMBER, TAGS.NODE],
}, {
  name: 'One Bullet',
  urls: {
    'Visit': 'http://chewbonga.com/onebullet',
    'GitHub': 'https://github.com/bttf/one_bullet',
  },
  displayImg: '/one-bullet.png',
  description: 'Browser based-video game submitted for Ludum Dare #28. Won #12th in the Humor category.',
  tags: [TAGS.JAVASCRIPT],
}, {
  name: 'I-Ching Hexagram Generator',
  urls: {
    'GitHub': 'https://github.com/bttf/i-ching-nds',
  },
  displayImg: '/i-ching-nds.gif',
  description: 'A fortune telling app for the Nintendo DS; based on I-Ching divination methods.',
  tags: [TAGS.C, TAGS.GCC, TAGS.GDB],
}, {
  name: 'Meditation with Talah Rama',
  urls: {
    'Visit': 'https://earthboundcentral.com/2009/04/meditation-with-talah-rama/',
  },
  displayImg: '/meditation1.png',
  description: 'A meditation timer built for the NintendoDS.',
  tags: [TAGS.C, TAGS.GCC, TAGS.GDB],
}];

const incompleteProjects = [{
  name: 'Capital Calendar',
  urls: {
    'Visit': 'https://capcal.redpine.software',
  },
  displayImg: '/capcal.png',
  description: 'Track your expenses on a daily basis using Google Calendar.',
  tags: [TAGS.NODE, TAGS.POSTGRES, TAGS.DOCKER, TAGS.KUBERNETES, TAGS.REACT, TAGS.GRAPHQL]
}, {
  name: 'Sweat Club',
  urls: {
    'Visit': 'https://sweat.club/',
  },
  displayImg: '/sweater.png',
  description: 'A mobile app to find your local sauna, or to purchase and host your own.',
  tags: [TAGS.REACT, TAGS.REACT_NATIVE, TAGS.GRAPHQL],
}, {
  name: 'Starship Bridge Simulator',
  urls: {
      'Visit': 'http://chewbonga.com/starship',
      'GitHub': 'https://github.com/bttf/starship-bridge-simulator',
  },
  bgColor: '#000',
  displayImg: '/starship-bridge.gif',
  description: 'In-browser starship simulator, modeled after Star Trek canon.',
  tags: [TAGS.TYPESCRIPT, TAGS.REACT, TAGS.WEBPACK],
}, {
  name: 'Desert World',
  urls: {
    'Visit': 'http://chewbonga.com/desert-world',
    'GitHub': 'https://github.com/bttf/simple-world-threejs',
  },
  displayImg: '/desert-world.gif',
  description: 'A browser-based 3D experiment simulating a bleak desert reality.',
  tags: [TAGS.THREEJS, TAGS.GRUNT, TAGS.JAVASCRIPT],
}, {
  name: 'Hot Pies',
  urls: {
      'Visit': 'http://chewbonga.com/hot-pies',
      'GitHub': 'https://github.com/bttf/hot-pies',
  },
  displayImg: '/hot-pies.gif',
  description: 'A browser-based video game where you play a farmer with a shotgun, protecting his cattle from greedy UFOs. (Spacebar + Click to shoot)',
  tags: [TAGS.JAVASCRIPT, TAGS.JASMINE],
}];
