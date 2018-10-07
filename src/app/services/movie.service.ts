import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Movie } from '../models/movie.models';
import { Subject } from "rxjs";
import { URL } from '../config/app.const';

@Injectable()
export class MovieService {

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

  addMovie(movie: Movie){
    this.http.post(URL+"/movies/add", movie, {observe: 'response'}).subscribe(
      (e) => {

        const keys = e.headers.keys();
        let headers = keys.map(key => 
          `${key}: ${e.headers.get(key)}`);

        console.log(e);

        console.log("location: "+e.headers.get('id'));
        console.log("Location: "+e.headers.get('Location'))
        console.log(e.headers.keys());
        console.log("sur le tuto: "+headers);
        console.log("sur location: "+e.headers.getAll('location'));
        console.log("sur Location: "+e.headers.getAll('location'));
        console.log('headers: ' + e.headers.get('Custom-Header'));
      },
      (error)=> {
        console.log('Erreur de sauvegarde!'+ error.Header);
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