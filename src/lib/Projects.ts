export interface IProject {
    name: string;
    url?: string;
    displayImg: string;
    demoImg?: string;
    description: string;
}

class Project implements IProject {
    name: string;
    url?: string;
    displayImg: string;
    demoImg?: string;
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
        name: 'Starship Bridge Simulator',
        url: 'https://starship.88mph.io',
        displayImg: '/assets/starship.png',
        description: 'In-browser game simulator, modeled after Star Trek motifs, built with TypeScript, React.js, and Webpack.',
    }),
    new Project({
        name: 'This Portfolio',
        url: 'https://adnan-chowdhury.com',
        displayImg: '',
        description: 'Built with TypeScript, React.js, and Webpack.',
    }),
    new Project({
        name: 'Quartzy',
        url: 'https://quartzy.com', 
        displayImg: '/assets/quartzy.png',
        description: 'Built Quartzy\'s frontend application using Ember.js',
    }),
    new Project({
        name: 'Scribble.today',
        url: 'https://scribble.today',
        displayImg: '/assets/scribble.svg',
        description: 'Full-stack journaling web application, utilizing Ember.js and Node.js, coupled with PostgreSQL, Gulp, and Docker.',
    }),
    new Project({
        name: 'Slushi.es',
        url: 'https://slushi.es',
        displayImg: '/assets/slushies.png',
        description: 'Cloud bookmarking solution, built with Ember.js, Node.js, Gulp, PostgreSQL, and Docker.',
    }),
    new Project({
        name: 'SubwayPOS - IPC',
        url: 'https://www.ipcoop.com/about-ipc',
        displayImg: '/assets/subwaypos.png',
        description: 'Built CI/CD pipeline with Puppet, Ruby, and Windows Powershell to fully automate build and test process for SubwayPOS application, built with C# and .NET.',
    }),
    new Project({
        name: 'Meditation with Talah Rama',
        url: 'https://earthboundcentral.com/2009/04/meditation-with-talah-rama/',
        displayImg: '/assets/meditation1.png',
        description: 'NintendoDS Homebrew ROM, built using homebrew library ‘libnds’, implemented in C, using gcc and gdb.',
    }),
];