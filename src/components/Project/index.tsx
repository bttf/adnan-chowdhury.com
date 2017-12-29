import * as React from 'react';
import { IProject } from 'lib/Projects';

interface ProjectProps {
    project: IProject;
}

export default class Project extends React.PureComponent<ProjectProps, {}> {
    render() {
        console.log('project', this.props.project);
        return (
            <div className="project">
                <h1>{this.props.project.name}</h1>
            </div>
        );
    }
}