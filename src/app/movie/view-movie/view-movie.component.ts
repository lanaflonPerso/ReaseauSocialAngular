import { Component, OnInit, Input } from '@angular/core';
import { MovieService } from '../../services/movie.service'
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../../models/movie.models';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User.model';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { People } from '../../models/people.models';
import { PeopleService } from '../../services/people.service';

@Component({
  selector: 'app-view-movie',
  templateUrl: './view-movie.component.html',
  styleUrls: ['./view-movie.component.scss']
})
export class ViewMovieComponent implements OnInit {

	currentUser:User;
	userSubscription:Subscription;
	movie:Movie;
	progressBar:String;
	countLike:number;

	isModified:boolean= false;
  viewFormUpdateSynopsis:boolean= false;
  viewFormActor:boolean= false;

  synopsisFrom:FormGroup;
	actorForm:FormGroup;
	
	actors:People[];

	constructor(
		private movieService: MovieService,
		private route: ActivatedRoute,
		private authService: AuthService,
		private peopleService: PeopleService,
		private formBuilder: FormBuilder) { }

	ngOnInit() {
		this.userSubscription= this.authService.userSubject.subscribe(
			(user: User) => {
			  this.currentUser= user;
			}
		);
		this.authService.emitUserSubject();

		this.movie= new Movie('', '', '', '');
		const id= this.route.snapshot.params['id'];
		this.movieService.getMovieById(+id).then(
			(movie: Movie) => {
				console.log(movie);
        this.movie= movie;
				this.countLike= this.movie.dislikeCount+this.movie.likeCount;
				let pourcent= this.movie.likeCount/(this.countLike)*100;
				this.progressBar= this.countLike === 0 ? "50%" : pourcent+"%";
			}
		);
  }
  
  onFormActor() {
    this.viewFormActor= true;
    this.actorForm= this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    })
  }

  onSubmitActor() {
    let actor= new People(this.actorForm.get('firstName').value, this.actorForm.get('lastName').value, '');
    this.movie.actors.push(actor);
    this.isModified= true;
    this.viewFormActor= false;
  }

	onSubmitUpdateSynopsis() {
    let synopsis= this.synopsisFrom.get('synopsis').value;
		if(this.movie.synopsis !== synopsis) {
      this.movie.synopsis= synopsis;
      this.isModified= true;
    }
    this.viewFormUpdateSynopsis= false;

	}

	onUpdateSynopsis() {
		this.viewFormUpdateSynopsis= true;
		this.synopsisFrom= this.formBuilder.group({
			synopsis: [this.movie.synopsis, Validators.required]
		});
	}

	onSubmit() {
		this.movieService.updateMovie(this.movie);
	}

	searchActor(lastName: string) {
		if(lastName.length > 2) {
			this.peopleService.searchByLastName(lastName).then(
				(peoples: People[]) => {
					this.actors= peoples;
				}
			)
		}
	}

	selectActor() {
		
	}
}
