import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { People } from '../../models/people.models';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { PeopleService } from '../../services/people.service';
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

  selectActor: People[]= [];
  selectCategory:  Category[]= [];
  resultActor: People[];
  resultCategory: Category[];


  constructor(
    private movieService: MovieService,
    private formBuilder: FormBuilder,
    private router: Router,
    private categoryService: CategoryService,
    private peopleService: PeopleService
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
      category: [''],
      actorFirstName: [''],
      actorLastName: ['']
    });
  }

  searchCategory() {
    const name= this.movieForm.get('category').value;
    if(name.length > 2) {
      this.categoryService.searchCategory(name).then(
        (categorys: Category[]) => {
          this.resultCategory= categorys;
        }
      );
    }
  }
  
  searchActor() {
    const lastName= this.movieForm.get('actorLastName').value;
    if(lastName.length > 2) {
      this.peopleService.searchByLastName(lastName).then(
        (actors: People[]) => {
          this.resultActor= actors;
        }
      );
    }
  }
  
  addActor(index: number) {
    this.selectActor.push(this.resultActor[index]);
    this.resultActor= null;
    this.movieForm.patchValue({actorFirstName: '', actorLastName: ''});
  }

  removeActor(index: number) {
    this.selectActor.splice(index, 1);
  }

  addActorByName() {
    const firstName= this.movieForm.get('actorFirstName').value;
    const lastName= this.movieForm.get('actorLastName').value;
    let newActor= new People(firstName, lastName, '');
    this.selectActor.push(newActor);
    this.movieForm.patchValue({actorFirstName: '', actorLastName: ''});
  }
  addCategoryByName() {
    const name= this.movieForm.get('category').value;
    let newCategory= new Category(name, "video");
    this.selectCategory.push(newCategory);
    this.movieForm.patchValue({category: ''});
  }
  
  addCategory(index: number) {
    this.selectCategory.push(this.resultCategory[index]);
    this.resultCategory=null;
    this.movieForm.patchValue({category: ''});
  }
  

  onSubmit() {
    const title= this.movieForm.get('title').value;
    const releaseDate= this.movieForm.get('releaseDate').value;
    const picture= this.movieForm.get('picture').value;
    const synopsis= this.movieForm.get('synopsis').value;

    let newMovie= new Movie(title, releaseDate, picture, synopsis);
    newMovie.actors= this.selectActor;
    newMovie.categorys= this.selectCategory;

    this.movieService.addMovie(newMovie);
  }

  voirTab() {
    console.log(this.selectActor);
  }
}
