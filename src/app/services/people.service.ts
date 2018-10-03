import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { People } from "../models/people.models";
import { URL } from "../config/app.const";

@Injectable({
    providedIn: 'root'
  })
export class PeopleService {

	URL= URL;
    people: People;

    constructor(private httpClient: HttpClient) { }

	createNewUser(firstName: string, lastName: string, birthday: string) {
        this.people= new People(firstName, lastName, birthday);
		this.httpClient.post(URL+"/peoples/add", this.people).subscribe(
			()=> {
				console.log('Enregistrement terminé!');
			},
			(error)=> {
				console.log('Erreur de sauvegarde!'+ error);
			}
		);
	}

	createNewUserInLikable(firstName, lastName, birthday, idLikable, type) {
		this.people= new People(firstName, lastName, birthday);
		this.httpClient.post(URL+"/peoples/add/"+type+"/"+idLikable, this.people).subscribe(
			()=> {
				console.log('Enregistrement terminé!');
			},
			(error)=> {
				console.log('Erreur de sauvegarde!'+ error);
			}
		);
	}
		
}