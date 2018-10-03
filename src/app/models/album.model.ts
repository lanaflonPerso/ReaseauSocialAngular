import { Group } from "./group.model";

export class Album {
    id: number;
    title: string;
    releaseDate: number;
    group: Group;
    songs: string[];
    picture: string;
    description: string;

    constructor(group: Group, title: string, releaseDate: number) {
        this.group= group;
        this.title= title;
        this.releaseDate= releaseDate;
    }
}