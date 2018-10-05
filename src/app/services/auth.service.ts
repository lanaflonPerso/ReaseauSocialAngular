import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from '../models/User.model';
import { URL } from '../config/app.const';
import { of, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	userSubject= new Subject<User>();
	private user: User;

  constructor(private http: HttpClient) { }


	emitUserSubject() {
		this.userSubject.next(this.user);
	}

	createNewUser(firstName: string, lastName: string, email: string, password: string) {
    let user= new User(firstName, lastName, email, password);
		this.http.post(URL+'users/sign-up', user, {observe: 'response'}).subscribe(
			(response)=> {
				console.log('Enregistrement terminé!');
			},
			(error)=> {
				console.log('Erreur de sauvegarde!'+ error);
			}
		);
	}

	signIn(email: string, password: string) {
		let user= new User('', '', email, password);
		return new Promise(
			(resolve, reject) => {
				this.http
				.post<User>(URL+'/users/sign-in', user)
				.subscribe(
					(data) => {
						resolve(data);
						localStorage.setItem('currentUser', JSON.stringify(data));
						this.user= data;
						this.emitUserSubject();
					},
					(error) => {
						reject(error);
					}
				);
			}
		);
	}

	signOut() {
		this.user= null;
		this.emitUserSubject();
		return this.http.get(URL+'/users/sign-out');
	}
}


