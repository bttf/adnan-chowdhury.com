import TagManager, { ITag } from 'lib/TagManager';

export interface IProject {
    name: string;
    url?: string;
    displayImg: string;
    demoImg?: string;
    description: string;
    tags: Array<ITag>;
}

class Project implements IProject {
    name: string;
    url?: string;
    displayImg: string;
    demoImg?: string;
    description: string;
    tags: Array<ITag>;

    constructor({ name, url, displayImg, demoImg, description, tags }: IProject) {
        this.name = name;
        this.url = url;
        this.displayImg = displayImg;
        this.demoImg = demoImg;
        this.description = description;
        this.tags = tags;
    }
}

const tagManager = new TagManager();

tagManager.createTags([
    'TypeScript',
    'React',
    'Webpack',
    'Ember.js',
    'Node.js',
    'PostgreSQL',
    'Docker',
    'C',
    'gcc',
    'gdb',
]);

export default [
    new Project({
        name: 'Starship Bridge Simulator',
        url: 'https://starship.88mph.io',
        displayImg: '/assets/starship.png',
        description: 'In-browser starship simulator, modeled after Star Trek canon.',
        tags: tagManager.getTags(['TypeScript', 'React', 'Webpack']),
    }),
    new Project({
        name: 'This Portfolio',
        url: 'https://adnan-chowdhury.com',
        displayImg: '',
        description: 'A place to show off my cool projects.',
        tags: tagManager.getTags(['TypeScript', 'React', 'Webpack']),
    }),
    new Project({
        name: 'Quartzy',
        url: 'https://quartzy.com', 
        displayImg: '/assets/quartzy.png',
        description: 'Quartzy\'s frontend application uses Ember.js, and I devoted a lot of time developing it.',
        tags: tagManager.getTags(['Ember.js']),
    }),
    new Project({
        name: 'Scribble.today',
        url: 'https://scribble.today',
        displayImg: '/assets/scribble.svg',
        description: 'A full-stack journaling web application that inspires creativity by utilizing Impressionist art.',
        tags: tagManager.getTags(['Ember.js', 'Node.js', 'PostgreSQL', 'Docker']),
    }),
    new Project({
        name: 'Slushi.es',
        url: 'https://slushi.es',
        displayImg: '/assets/slushies.png',
        description: 'A cloud bookmarking solution made as a utility for browsing the web.',
        tags: tagManager.getTags(['Ember.js', 'Node.js', 'PostgreSQL', 'Docker']),
    }),
    new Project({
        name: 'SubwayPOS - IPC',
        url: 'https://www.ipcoop.com/about-ipc',
        displayImg: '/assets/subwaypos.png',
        description: 'Built CI/CD pipeline with Puppet, Ruby, and Windows Powershell to fully automate build and test process for SubwayPOS application, built with C# and .NET.',
        tags: tagManager.getTags(['Ember.js', 'Node.js', 'PostgreSQL', 'Docker']),
    }),
    new Project({
        name: 'Meditation with Talah Rama',
        url: 'https://earthboundcentral.com/2009/04/meditation-with-talah-rama/',
        displayImg: '/assets/meditation1.png',
        description: 'A meditation timer built for the NintendoDS.',
        tags: tagManager.getTags(['C', 'gcc', 'gdb']),
    }),
];