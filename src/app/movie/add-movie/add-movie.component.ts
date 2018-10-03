import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { People } from '../../models/people.models';

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
    private movieService: MovieService,
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
      synopsis: [''],
      actors: this.formBuilder.array([])
    });
  }

	onSubmit() {
		const title= this.movieForm.get('title').value;
		const releaseDate= this.movieForm.get('releaseDate').value;
		const picture= this.movieForm.get('picture').value;
		const synopsis= this.movieForm.get('synopsis').value;
		this.movieService.addMovie(title, releaseDate, picture, synopsis);
	}

	getActors() {
		return this.movieForm.get('actors') as FormArray;
	}
	
	onAddActor() {
		const firstName= this.formBuilder.control('', Validators.required);
		const lastName= this.formBuilder.control('', Validators.required);
		const birthDay= this.formBuilder.control('', Validators.required);
		let people= new People(firstName, lastName, birthDay);
		this.getActors().push(firstName);
	}
}
