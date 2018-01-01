import TagManager, { ITag, ITagManager } from 'lib/TagManager';

export interface IProject {
    name: string;
    urls: { [key: string]: string; };
    displayImg: string;
    demoImg?: string;
    description: string;
    tags: Array<ITag>;
    tagManager: ITagManager;
}

class Project implements IProject {
    name: string;
    urls: { [key: string]: string; };
    displayImg: string;
    demoImg?: string;
    description: string;
    tags: Array<ITag>;
    tagManager: ITagManager;

    constructor({ name, urls, displayImg, demoImg, description, tags }: IProject) {
        this.name = name;
        this.urls = urls;
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
        urls: {
            'Visit': 'https://starship.88mph.io',
            'GitHub': 'https://github.com/bttf/starship-bridge-simulator',
        },
        displayImg: '/assets/starship-bridge.gif',
        description: 'In-browser starship simulator, modeled after Star Trek canon.',
        tags: tagManager.getTags(['TypeScript', 'React', 'Webpack']),
        tagManager,
    }),
    new Project({
        name: 'This Portfolio',
        urls: {
            'GitHub': 'https://github.com/bttf/adnan-chowdhury.com',
        },
        displayImg: '/assets/portfolio.png',
        description: 'A place to show off my cool projects.',
        tags: tagManager.getTags(['TypeScript', 'React', 'Webpack']),
        tagManager,
    }),
    new Project({
        name: 'Quartzy',
        urls: {
            'Visit': 'https://quartzy.com',
        },
        displayImg: '/assets/quartzy.png',
        description: 'Quartzy\'s frontend application uses Ember.js, and I played a big part in developing it.',
        tags: tagManager.getTags(['Ember.js']),
        tagManager,
    }),
    new Project({
        name: 'Scribble.today',
        urls: {
            'Visit': 'https://scribble.today',
        },
        displayImg: '/assets/scribble.svg',
        description: 'A full-stack journaling web application that inspires creativity by utilizing Impressionist art.',
        tags: tagManager.getTags(['Ember.js', 'Node.js', 'PostgreSQL', 'Docker']),
        tagManager,
    }),
    new Project({
        name: 'Slushi.es',
        urls: {
            'Visit': 'https://slushi.es',
        },
        displayImg: '/assets/slushies.png',
        description: 'A cloud bookmarking solution made as a utility for browsing the web.',
        tags: tagManager.getTags(['Ember.js', 'Node.js', 'PostgreSQL', 'Docker']),
        tagManager,
    }),
    new Project({
        name: 'I-Ching Hexagram Generator',
        urls: {
            'GitHub': 'https://github.com/bttf/i-ching-nds',
        },
        displayImg: '/assets/i-ching-nds.gif',
        description: 'A fortune telling app for the Nintendo DS; based on I-Ching divination methods.',
        tags: tagManager.getTags(['C', 'gcc', 'gdb']),
        tagManager,
    }),
    new Project({
        name: 'Meditation with Talah Rama',
        urls: {
            'Read': 'https://earthboundcentral.com/2009/04/meditation-with-talah-rama/',
        },
        displayImg: '/assets/meditation1.png',
        description: 'A meditation timer built for the NintendoDS.',
        tags: tagManager.getTags(['C', 'gcc', 'gdb']),
        tagManager,
    }),
];