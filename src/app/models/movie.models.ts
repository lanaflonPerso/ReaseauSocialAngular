import { People } from "./people.models";

export class Movie {
    id: number;
    title: string;
    releaseDate: number;
    studio: string;
    picture: string;
    synopsis: string;
    actors: People[];

    dislikeCount: number;
    likeCount: number;

    constructor(title, releaseDate, synopsis) {
        this.title= title;
        this.releaseDate= releaseDate;
        this.synopsis= synopsis;
    }
}