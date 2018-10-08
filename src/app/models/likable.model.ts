import { User } from './User.model'

export class Likable {
	id: number;
	type: string;
	likeCount: number;
	dislikeCount: number;
	createdDate: Date;
	icone: string;

	constructor(id?, type?, likeCount?, DislikeCount?) {
		this.id= id;
		this.type= type;
		this.likeCount= likeCount;
		this.dislikeCount= DislikeCount;
	}
}