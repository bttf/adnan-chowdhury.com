import * as React from 'react';
import { ITag } from 'lib/TagManager';
import './styles.scss';

interface TagProps {
    key: number;
    tag: ITag;
    onClick: (tag: ITag) => void;
}

export default class Tag extends React.PureComponent<TagProps, {}> {
    clickHandler() {
        this.props.onClick(this.props.tag);
    }

    render() {
        const style = {
            backgroundColor: this.props.tag.color,
        };

        return(
            <div className="tag" onClick={this.clickHandler.bind(this)} style={style}>
                {this.props.tag.name}
            </div>
        );
    }
}