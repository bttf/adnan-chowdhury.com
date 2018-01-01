import * as React from 'react';
import Tag from 'components/Tag';
import { IProject } from 'lib/Projects';
import { ITag } from 'lib/TagManager';
import './styles.scss';

interface ProjectProps {
    index: number;
    project: IProject;
    bgBlack?: boolean;
    addTagFilter: (tag: ITag) => void;
}

export default class Project extends React.PureComponent<ProjectProps, {}> {
    render() {
        const isBgBlack = !!this.props.bgBlack;
        const isEvenIndex = this.props.index % 2 === 0;

        return (
            <div className={`project ${isEvenIndex ? 'even' : 'odd'}`}>
                <div className={`logo ${isBgBlack ? 'bg-black' : ''}`}><img src={this.props.project.displayImg} alt={this.props.project.name} /></div>

                <div className="name-and-description">
                    <div className="name">
                        {this.props.project.name}
                    </div>

                    <div className="description">
                        {this.props.project.description}
                    </div>

                    <div className="tags">
                        {this.props.project.tags.map((tag, index) =>
                            (<Tag key={index} tag={tag} onClick={this.props.addTagFilter} />))}
                    </div>
                </div>
            </div>
        );
    }
}