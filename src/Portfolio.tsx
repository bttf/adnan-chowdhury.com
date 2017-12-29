import * as React from 'react';
import Header from 'components/Header';
import Project from 'components/Project';
import Projects from 'lib/Projects';
import './Portfolio.scss';

export default class Portfolio extends React.PureComponent {
    render() {
        console.log('projects', Projects);
        return (
            <div className="portfolio">
                <Header />

                <div className="projects">
                    <div className="section-header">Projects</div>
                    {Projects.map((project, index) => (
                        <Project key={index} project={project} />
                    ))}
                </div>
            </div>
        );
    }
}