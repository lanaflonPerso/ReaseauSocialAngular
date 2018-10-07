import { Injectable } from '@angular/core';
import { LikeDislike } from '../models/like.dislike.model';
import { URL } from '../config/app.const';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LikeService {

  constructor(
    private http: HttpClient
  ) { }

  getMyVote(id:number) {
    return new Promise (
      (resolve, reject) => {
        this.http
        .get<LikeDislike>(URL+"/like-dislike/"+id)
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

  saveLike(id:number) {
    return new Promise(
      (resolve, reject) => {
        this.http
        .get(URL+"/like/"+id)
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

  saveDislike(id:number) {
    return new Promise(
      (resolve, reject) => {
        this.http
        .get(URL+"/dislike/"+id)
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
