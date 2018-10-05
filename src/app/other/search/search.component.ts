import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Movie } from '../../models/movie.models';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchForm: FormGroup;
  movies: Movie[]= [];
  isResult:boolean= false;

  constructor(private formBuilder: FormBuilder,
              private movieService: MovieService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.searchForm= this.formBuilder.group({
      value: ['', Validators.required],
      type: ['movie', Validators.required]
    })
  }

  onSubmit() {
    const value= this.searchForm.get('value').value;
    const type= this.searchForm.get('type').value;
    console.log(value, type);
    if(type === "movie") {
      this.movieService.searchMovies(value).then(
        (movies: Movie[]) => {
         this.searchMovie(value); 
        }
      );
    }
    this.isResult= true;
  }

  searchMovie(value: string) {
    this.movieService.searchMovies(value).then(
      (movies: Movie[]) => {
       this.movies= movies; 
      }
    );
  }

}
