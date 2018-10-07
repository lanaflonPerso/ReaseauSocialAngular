import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { People } from "../models/people.models";
import { URL } from "../config/app.const";

@Injectable()
export class PeopleService {

  people: People;

	constructor(private http: HttpClient) { }
	
	getById(id :number) {
		return new Promise(
			(resolve, reject) => {
				this.http.get<People>(URL+"/peoples/"+id)
				.subscribe(
					(data) => {
						resolve(data);
					},
					(error) => {
						reject(error);
					}
				);
			}
		);
	}

	createNewUser(firstName: string, lastName: string, birthday: string) {
    this.people= new People(firstName, lastName, birthday);
		this.http.post(URL+"/peoples/add", this.people).subscribe(
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
		this.http.post(URL+"/peoples/add/"+type+"/"+idLikable, this.people).subscribe(
			()=> {
				console.log('Enregistrement terminé!');
			},
			(error)=> {
				console.log('Erreur de sauvegarde!'+ error);
			}
		);
	}

	searchByLastName(lastName: string) {
		return new Promise(
			(resolve, reject) => {
				this.http.get(URL+"/peoples/search/"+lastName)
				.subscribe(
					(data) => {
						resolve(data);
					},
					(error) => {
						reject(error);
					}
				);
			}
		);				
	}
}