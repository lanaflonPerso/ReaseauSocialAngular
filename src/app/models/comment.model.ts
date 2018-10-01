import { People } from '../models/people.models'
import { User } from '../models/User.model'
export class Comment {
    id: number;
    contenu: string;
    createDate: Date;

    constructor(id, contenu) {
        this.id= id;
        this.contenu= contenu;
    }
}