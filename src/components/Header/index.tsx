import * as React from 'react';
import Headshot from 'components/Headshot';
import './styles.scss';

export default class Portfolio extends React.PureComponent {
  render() {
    return (
      <div className="header">
        <Headshot />
        <div className="name-and-title">
          <div className="name">Adnan Chowdhury</div>
          <hr />
          <div className="title">Software Engineer</div>
        </div>
      </div>
    );
  }
}
