import * as React from 'react';
import CoolCircle from './CoolCircle';
import _range = require('lodash/range');
import './styles.scss';

export default class Headshot extends React.PureComponent {
    render() {
        const numberOfCoolCircles = 24;

        return (
            <div className="headshot">
                <div className="image-wrapper">
                    <div className="image" title="Spirit Animal"></div>
                    {_range(numberOfCoolCircles).map((val, index) =>
                        (<CoolCircle key={index} index={index} animationDuration={12} totalCirclesLength={numberOfCoolCircles} />))}
                </div>
            </div>
        );
    }
}