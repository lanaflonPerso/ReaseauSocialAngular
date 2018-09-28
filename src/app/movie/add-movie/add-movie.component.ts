import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Movie } from '../../models/movie.models';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {

  now= new Date();
  movieForm: FormGroup;
  errorMessage: string;

  constructor(
    private movieServie: MovieService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.movieForm= this.formBuilder.group({
      title: ['', Validators.required],
      releaseDate: ['', [Validators.required ,Validators.min(1900), Validators.max(this.now.getFullYear())]],
      picture: [''],
      synopsis: ['']
    });
  }

  onSubmit() {
    const formValue= this.movieForm.value;
    const newMovie= new Movie(
      formValue['title'],
      formValue['releaseDate'],
      formValue['synopsis']
	);
	newMovie.picture= formValue['picture'];
    this.movieServie.addMovie(newMovie);
  }
}
