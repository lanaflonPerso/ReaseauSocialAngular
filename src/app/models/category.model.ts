export class Category {
	name: string;
	
	id: number;
	type: string;
	dislikeCount: number;
	likeCount: number;
	createdDate: Date;

	constructor(name: string, type: string) {
		this.name= name;
		this.type= type;
	}
}