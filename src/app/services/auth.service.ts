import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from '../models/User.model';
import { URL } from '../config/app.const';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	user: User;
	URL= URL;

  constructor(private httpClient: HttpClient) { }

	createNewUser(firstName: string, lastName: string, email: string, password: string) {
    this.user= new User(firstName, lastName, email, password);
		this.httpClient.post(URL+'users/sign-up', this.user, {observe: 'response'}).subscribe(
			(response)=> {
				console.log('Enregistrement terminé!');
			},
			(error)=> {
				console.log('Erreur de sauvegarde!'+ error);
			}
		);
	}

	signInUser(email: string, password: string) {
		let newUser= new User('', '', email, password);
		return new Promise(
			(resolve, reject) => {
				this.httpClient
				.post<User>(URL+'/users/sign-in', newUser)
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


