import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Movie } from '../../models/movie.models';
import { MovieService } from '../../services/movie.service';
import { PeopleService } from '../../services/people.service';
import { People } from '../../models/people.models';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchForm:FormGroup;
  movies:Movie[]= [];
  peoples:People[]= [];
  isResult:boolean= false;

  constructor(
    private formBuilder: FormBuilder,
    private movieService: MovieService,
    private peopleService: PeopleService
  ) { }

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
      this.searchMovie(value);
    } else if (type === "people") {
      this.searchPeople(value);
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

  searchPeople(value: string) {
    this.peopleService.searchByLastName(value).then(
      (peoples: People[]) => {
        this.peoples= peoples
      }
    )
  }

}
