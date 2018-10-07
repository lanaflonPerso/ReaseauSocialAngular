import { User } from "./User.model";
import { Movie } from "./movie.models";
import { People } from "./people.models";
import { Album } from "./album.model";

export class LikeDislike {
    user:User;
    typeVote:number;

    movie:Movie;
    people:People;
    album:Album;
}