import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Movie } from '../models/movie.models';
import { Subject } from "rxjs";
import { URL } from '../config/app.const';

@Injectable({
    providedIn: 'root'
  })
  export class MovieService {

    movie: Movie;
    private movies= [];
    url= URL;
    movieSubject= new Subject<any[]>();
    headers: string;

    constructor(private httpClient: HttpClient) { }

    emitMovieSubject() {
        this.movieSubject.next(this.movies.slice());
    }

    getMovieById(id: number) {
        return new Promise(
            (resolve, reject) => {
                this.httpClient
                .get<Movie>(this.url+"/movies/"+id)
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

    addMovie(title: string, releaseDate: number, picture: string, synopsis: string){
        let url = this.url+"/movies/add";
        this.movie= new Movie(title, releaseDate, picture, synopsis);
        this.httpClient.post(url, this.movie, {observe: 'response'}).subscribe(
            (e) => {
                console.log(e);
                console.log('headers: ' + e.headers.get('location'));
              },
            (error)=> {
                console.log('Erreur de sauvegarde!'+ error);
            }
        );
    }
}