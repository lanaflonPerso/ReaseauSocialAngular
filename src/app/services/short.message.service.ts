import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { URL } from '../config/app.const';

@Injectable({
	providedIn: 'root'
})

export class shortMessageService {

	messagesCount: number;
	URL= URL;

	constructor(private httpClient: HttpClient) { }

	getMessagesCount() {
        return new Promise(
            (resolve, reject) => {
                this.httpClient
                .get(this.URL+"/messages/count")
                .subscribe(
                    (data) => {
                        console.log(data);
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