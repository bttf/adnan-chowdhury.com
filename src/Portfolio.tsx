import * as React from 'react';
import Header from 'components/Header';
import Project from 'components/Project';
import Projects from 'lib/Projects';
import { ITag } from 'lib/TagManager';
import _intersectionWith = require('lodash/intersectionWith');
import './Portfolio.scss';

interface PortfolioState {
    activeTags: Array<ITag>;
}

export default class Portfolio extends React.PureComponent<{}, PortfolioState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            activeTags: [],
        };

        this.addTagFilter = this.addTagFilter.bind(this);
        this.removeTagFilter = this.removeTagFilter.bind(this);
    }

    addTagFilter(tag: ITag) {
        const activeTags = this.state.activeTags.slice();
        activeTags.push(tag);
        this.setState({ activeTags });
    }

    removeTagFilter(tag: ITag) {
        const activeTags = this.state.activeTags.filter(activeTag =>
            activeTag.name !== tag.name);
        this.setState({ activeTags });
    }

    render() {
        const projects = Projects.filter(project => {
            const activeTags = this.state.activeTags;
            const projectTags = project.tags;

            if (!activeTags.length) return true;

            return _intersectionWith(activeTags, projectTags, (x: ITag, y: ITag) => x.name === y.name).length;
        });

        return (
            <div className="portfolio">
                <Header />

                <div className="active-tags">
                    {this.state.activeTags.map((tag, index) => (
                        <div key={index} className="active-tag">{tag.name}</div>
                    ))}
                </div>

                <div className="projects">
                    {projects.map((project, index) => (
                        <Project
                            key={index}
                            index={index}
                            project={project}
                            addTagFilter={this.addTagFilter}
                            bgBlack={project.name.indexOf('Starship Bridge') > -1} 
                        />
                    ))}
                </div>
            </div>
        );
    }
}