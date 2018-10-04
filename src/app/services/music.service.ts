import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Group } from "../models/group.model";
import { URL } from "../config/app.const";
import { Album } from "../models/album.model";
import { Song } from "../models/song.model";

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
      },
      (error) => {
        console.log('Erreur de sauvegarde!'+ error);
      }
    )
  }

  updateAlbum(album: Album) {
    console.log(album);
    this.http.post(URL+"/music/album/update", album).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log('Erreur de sauvegarde!'+ error);
      }
    )
  }

  getAlbumById(id: number) {
    return new Promise(
      (resolve, reject) => {
        this.http
        .get<Album>(URL+"/music/album/"+id)
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