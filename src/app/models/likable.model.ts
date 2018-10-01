import { User } from './User.model'

export class Likable {
    id: number;
    createdDate: Date;
    type: string;
    likeCount: number;
    dislikeCount: number;
    icone: string;

    constructor(id, type, likeCount, DislikeCount) {
        this.id= id;
        this.type= type;
        this.likeCount= likeCount;
        this.dislikeCount= DislikeCount;

    }
}