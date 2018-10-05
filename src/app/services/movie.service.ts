import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Movie } from '../models/movie.models';
import { Subject } from "rxjs";
import { URL } from '../config/app.const';

@Injectable()
export class MovieService {

  movie: Movie;
  private movies= [];
  movieSubject= new Subject<any[]>();
  headers: string;

  constructor(private http: HttpClient) { }

  emitMovieSubject() {
    this.movieSubject.next(this.movies.slice());
  }

  getMovieById(id: number) {
    return new Promise(
      (resolve, reject) => {
        this.http
        .get<Movie>(URL+"/movies/"+id)
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
    this.movie= new Movie(title, releaseDate, picture, synopsis);
    this.http.post(URL+"/movies/add", this.movie, {observe: 'response'}).subscribe(
      (e) => {
        console.log(e);
        console.log('headers: ' + e.headers.get('Custom-Header'));
      },
      (error)=> {
        console.log('Erreur de sauvegarde!'+ error);
      }
    );
  }

  updateMovie(movie: Movie) {
    console.log(movie);
    this.http.post(URL+"/movie/update", movie).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log('erreur de sauvegarde!'+ error);
      }
    )
  }

  searchMovies(title: string) {
    return new Promise(
      (resolve, reject) => {
        this.http.get<Movie[]>(URL+"/movies/search/"+title)
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