import * as React from 'react';
import Header from 'components/Header';
import Project from 'components/Project';
import Tag from 'components/Tag';
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

        if (activeTags.includes(tag)) return;

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

        const activeTags = (
            <div className="active-tags">
                <span className="label">Active Filters:</span>
                {this.state.activeTags.map((tag, index) => (
                    <Tag key={index} tag={tag} onClick={this.removeTagFilter} />
                ))}
            </div>
        );

        return (
            <div className="portfolio">
                <Header />

                <div className="introduction">
                    <p>Hello! My name is Adnan, and I am a software
                        engineer located in the SF Bay Area.</p>
                    <p>My current expertise lies in modern JavaScript, and
                        frontend development.</p>
                    <p>In the past, I've worked with a range of projects, from
                        full-stack to embedded systems, and hold a B.A. degree
                        in Comp Sci, with a minor in Humanities.</p>
                    <p>Find me on&nbsp;
                        <a href="https://github.com/bttf">GitHub</a>,&nbsp;
                        <a href="https://twitter.com/_adnanchowdhury">Twitter</a>,&nbsp;
                        <a href="https://linkedin.com/in/adnanchowdhury88">LinkedIn</a>,&nbsp;
                        or check out my <a href="http://blog.88mph.io">Blog Posts</a>.
                        </p>
                </div>

                <div className="projects">
                    <div className="title">
                        Projects
                    </div>

                    {this.state.activeTags.length ? activeTags : null}

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

                <div className="footer">
                    <div className="links">
                    </div>
                    <div className="copyright">
                        © 2018 Adnan Chowdhury
                    </div>
                </div>
            </div>
        );
    }
}