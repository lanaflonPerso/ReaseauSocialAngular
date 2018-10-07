import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { People } from '../../models/people.models';
import { ActivatedRoute } from '@angular/router';
import { PeopleService } from '../../services/people.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-people',
  templateUrl: './view-people.component.html',
  styleUrls: ['./view-people.component.scss']
})
export class ViewPeopleComponent implements OnInit {

  currentUser:User;
  userSubscription:Subscription;

  people:People;
  progressBar:String;
  countLike:number;
  
  viewFormUpdateBiography:boolean= false;
  biographyFrom:FormGroup;

  constructor(
    private peopleService: PeopleService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder

  ) { }

  ngOnInit() {
    this.userSubscription= this.authService.userSubject.subscribe(
			(user: User) => {
			  this.currentUser= user;
			}
		);
    this.authService.emitUserSubject();
    
    this.people= new People('', '', '');
    const id= this.route.snapshot.params['id'];
    this.peopleService.getById(id).then(
      (people: People) => {
        this.people= people;
        this.countLike= this.people.dislikeCount+this.people.likeCount;
				let pourcent= this.people.likeCount/(this.countLike)*100;
				this.progressBar= this.countLike === 0 ? "50%" : pourcent+"%";
      }
    )
  }

  onUpdateBiography() {
    this.viewFormUpdateBiography= true;
    this.biographyFrom= this.formBuilder.group({
      biography: [this.people.biography, Validators.required]
    });
  }

  onSubmitUpdateBiography() {

  }

  onSubmit() {

  }
}