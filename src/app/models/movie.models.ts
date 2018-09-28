import { People } from "./people.models";

export class Movie {
    id: number;
    title: string;
    releaseDate: number;
    studio: string;
    picture: string;
    synopsis: string;
    actors: People[];

    constructor(title, releaseDate, synopsis) {
        this.title= title;
        this.releaseDate= releaseDate;
        this.synopsis= synopsis;
    }
}