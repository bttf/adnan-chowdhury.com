import * as React from 'react';
import Tag from 'components/Tag';
import { IProject } from 'lib/Projects';
import { ITag } from 'lib/TagManager';
import _kebab = require('lodash/kebabCase');
import _keys = require('lodash/keys');
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
        const visitURL = this.props.project.urls && this.props.project.urls['Visit'];

        return (
            <div className={`project ${isEvenIndex ? 'even' : 'odd'} ${_kebab(this.props.project.name)}`}>
                <div className={`logo ${isBgBlack ? 'bg-black' : ''}`}><img src={this.props.project.displayImg} alt={this.props.project.name} /></div>

                <div className="name-and-description">
                    <div className="name">
                        {visitURL ?
                            (<a href={visitURL}>{this.props.project.name}</a>) : this.props.project.name}
                    </div>

                    <div className="description">
                        {this.props.project.description}
                        {_keys(this.props.project.urls).map((key, index) => (
                            <span key={index} className="url"> (<a href={this.props.project.urls[key]}>{key}</a>) </span>
                        ))}
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
