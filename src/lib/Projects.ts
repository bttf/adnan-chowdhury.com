export interface IProject {
    name: string;
    url: string;
    displayImg: string;
    demoImg: string;
    description: string;
}

class Project implements IProject {
    name: string;
    url: string;
    displayImg: string;
    demoImg: string;
    description: string;

    constructor({ name, url, displayImg, demoImg, description }: IProject) {
        this.name = name;
        this.url = url;
        this.displayImg = displayImg;
        this.demoImg = demoImg;
        this.description = description;
    }
}

export default [
    new Project({
        name: 'Quartzy',
        url: 'https://quartzy.com', 
        displayImg: 'http://chewbonga.com/chewbonga.jpg',
        demoImg: 'http://chewbonga.com/chewbonga.jpg',
        description: 'Quartzy is a poop platform',
    }),
];