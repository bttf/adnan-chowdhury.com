import _head = require('lodash/head');
import _compact = require('lodash/compact');

export interface ITag {
    name: string;
    color: string;
}

class Tag implements ITag {
    name: string;
    color: string;

    constructor({ name, color }: ITag) {
        this.name = name;
        this.color = color;
    }
}

export interface ITagManager {
    tags: Array<ITag>;
}

export default class TagManager implements ITagManager {
    tags: Array<ITag>;

    constructor() {
        this.tags = [];
    }

    createTag(name: string) {
        const color = `hsl(${(this.tags.length * 66) + 200}, 70%, 50%)`;
        this.tags.push(new Tag({ name, color }));
    }

    createTags(names: Array<string>) {
        names.forEach(name => this.createTag(name));
    }

    getTag(name: string) {
        return _head(this.tags.filter(tag => tag.name === name));
    }

    getTags(names: Array<string>) {
        return _compact(names.map(name => this.getTag(name)));
    }
}
