import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import Projects from './Projects';

export const MAX_WIDTH = '800px';

const Container = ({ children }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
      alignItems: 'center',
    }}
  >
      {children}
  </div>
);

const IntroductoryText = ({ children }) => (
  <div style={{
    flex: 1,
    maxWidth: MAX_WIDTH,
    fontSize: '1rem',
  }}>{children}</div>
);

const P = ({ children }) => (
  <p style={{
    maxWidth: MAX_WIDTH,
    fontSize: '1rem',
  }}>
    {children}
  </p>
);

const Copyright = ({children}) => (
    <div style={{ textAlign: 'center', marginBottom: '2rem'}}>{children}</div>
);

const App = () => (
    <Container>
      <Header />

      <IntroductoryText>
        <p>Hello! My name is Adnan, and I am a software
          engineer located in the SF Bay Area.</p>
        <p>My current expertise lies in modern JavaScript, and
          frontend development.</p>
        <p>In the past, I've worked with a range of projects, from
          full-stack web applications to embedded systems. I hold a B.A.
          in Computer Science, with a minor in Humanities.</p>
        <p>Find me on&nbsp;
          <a href="https://github.com/bttf">GitHub</a>,&nbsp;
          <a href="https://twitter.com/_adnanchowdhury">Twitter</a>,&nbsp;
          <a href="https://linkedin.com/in/adnanchowdhury88">LinkedIn</a>,
          or check out my <a href="http://blog.88mph.io">Blog Posts</a>.
        </p>
      </IntroductoryText>

      <Switch>
        <Route exact path="/" component={() => <Projects />} />
      </Switch>

      <Copyright>
        © {new Date().getFullYear()} Adnan Chowdhury
      </Copyright>
    </Container>
);

export default App;
