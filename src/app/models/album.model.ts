import { Group } from "./group.model";
import { Song } from "./song.model";

export class Album {
    id: number;
    title: string;
    releaseDate: number;
    group: Group;
    songs: Song[];
    picture: string;
    description: string;

    dislikeCount: number;
    likeCount: number;

    constructor(group: Group, title: string, releaseDate: number) {
        this.group= group;
        this.title= title;
        this.releaseDate= releaseDate;
    }
}