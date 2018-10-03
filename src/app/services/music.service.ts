import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Group } from "../models/group.model";
import { URL } from "../config/app.const";
import { Album } from "../models/album.model";

@Injectable({
    providedIn: 'root'
    })

    export class MusicService {

        constructor(private http: HttpClient) {}

        searchGroupByName(name: string) {
            return new Promise(
                (resolve, reject) => {
                    this.http
                    .get<Group>(URL+"/music/groups/seach/"+name)
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

        addAlbum(album: Album) {
            this.http.post(URL+'/music/albums/add', album, {observe: 'response'}).subscribe(
                (response) => {
                    console.log(response);
                    console.log('headers:Location= ' + response.headers.get('location'));
                    console.log('headers: ' + response.headers);
                },
                (error) => {
                    console.log('Erreur de sauvegarde!'+ error);
                }
            )
        }
    }