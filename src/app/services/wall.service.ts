import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { URL } from '../config/app.const';
import { ShMessage } from '../models/short.message.model';
import { Wall } from '../models/wall.model';

@Injectable({
  providedIn: 'root'
})
export class WallService {

    walls: Wall[]; 
	URL= URL;
	shMessage: ShMessage;


	constructor(private httpClient: HttpClient) { }

	addSh(html: string) {
		let url = this.URL+"/wall/add";
		this.shMessage= new ShMessage(html);
		this.httpClient.post(url, this.shMessage, {observe: 'response'}).subscribe(
			(response) => {
				console.log('Message Enregistrer!');
				console.log(response);
			},
        	(error)=> {
            	console.log('Erreur de sauvegarde!'+ error);
        	}
    	);
	}

	getWall() {
        return new Promise(
            (resolve, reject) => {
                this.httpClient
                .get<Wall>(this.URL+"/wall")
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
