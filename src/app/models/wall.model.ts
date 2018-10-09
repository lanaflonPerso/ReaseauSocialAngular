import { Comment } from '../models/comment.model';
import { Likable } from '../models/likable.model';

export class Wall {
    id: number;
    type: string;
    html: string;
    share: boolean;

    likable: Likable;
    comments: Comment[];

    icone: string;

    constructor(id, type, html) {
        this.id= id;
        this.type= type;
        this.html= html;

    }
}