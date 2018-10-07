import { People } from "./people.models";
import { Category } from "./category.model";

export class Movie {
    id: number;
    title: string;
    releaseDate: number;
    studio: string;
    picture: string;
    synopsis: string;
    actors: People[];
    categorys: Category[];

    dislikeCount: number;
    likeCount: number;

    constructor(title, releaseDate, picture, synopsis) {
        this.title= title;
        this.releaseDate= releaseDate;
        this.picture= picture;
        this.synopsis= synopsis;
    }
}