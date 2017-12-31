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
                    {Projects.map((project, index) => (
                        <Project key={index} index={index} project={project} bgBlack={project.name.indexOf('Starship Bridge') > -1} />
                    ))}
                </div>
            </div>
        );
    }
}