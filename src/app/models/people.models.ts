export class People {

    id: number;
    firstName: string;
    lastName: number;
    biography: string;
    picture: string;
    birthday: number;

    constructor(firstName, lastName, birthday) {
        this.firstName= firstName;
        this.lastName= lastName;
        this.birthday= birthday;
    }
}