import { People } from '../models/people.models';
import { User } from '../models/User.model';

export class Comment {
    id: number;
    content: string;
    createdDate: Date;
    brick_id: number;

    constructor(contenu, createdDate) {
        this.content= contenu;
        this.createdDate= createdDate;
    }
}