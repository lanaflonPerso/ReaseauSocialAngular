import { People } from "./people.models";
import { Category } from "./category.model";
import { Likable } from "./likable.model";

export class Movie extends Likable{
	title: string;
  releaseDate: number;
  studio: string;
  picture: string;
  synopsis: string;
  actors: People[];
	categorys: Category[];

	constructor(title, releaseDate, picture, synopsis) {
		super();
		this.title= title;
		this.releaseDate= releaseDate;
		this.picture= picture;
		this.synopsis= synopsis;
	}
}