import * as React from 'react';
import './CoolCircle.scss';

interface CoolCircleProps {
    key: number;
    index: number;
    animationDuration: number;
    totalCirclesLength: number;
}

export default class CoolCircle extends React.PureComponent<CoolCircleProps, {}> {
    render() {
        const borderColor = `hsl(${this.props.index * 30}, 58%, 50%)`;
        const animationDelay =
            (this.props.animationDuration / this.props.totalCirclesLength) * this.props.index;
        const style = {
            border: `2px solid ${borderColor}`,
            animationDelay: `${animationDelay}s`,
            animationDuration: `${this.props.animationDuration}s`,
        };

        return (<div className="cool-circle" style={style}></div>);
    }
}