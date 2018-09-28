import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Movie } from '../models/movie.models';
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class MovieService {

    movie: Movie;
    private movies= [];

    movieSubject= new Subject<any[]>();

    constructor(private httpClient: HttpClient) { }

    emitMovieSubject() {
        this.movieSubject.next(this.movies.slice());
    }

    getMovieById(id: number) {
        let url= "http://localhost:9090/movies/"+id;
        return new Promise(
            (resolve, reject) => {
                this.httpClient
                .get<Movie>(url)
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

    addMovie(movie: Movie){
        console.log(movie);
        let url = "http://localhost:9090/movies/add";
        this.httpClient.post(url, this.movie).subscribe(
            ()=> {
                console.log('Enregistrement terminé!');
            },
            (error)=> {
                console.log('Erreur de sauvegarde!'+ error);
            }
        );
    }
  }