import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { URL } from '../../config/app.const'
import { LikeService } from '../../services/like.service';
import { LikeDislike } from '../../models/like.dislike.model';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../models/User.model';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-view-like',
	templateUrl: './view-like.component.html',
	styleUrls: ['./view-like.component.scss']
})
export class ViewLikeComponent implements OnInit {

	id: number= this.route.snapshot.params['id'];;
	@Input() dislikeCount:number;
	@Input() progressBar:string;
	@Input() likeCount:number;

	myVote:number;
	currentUser:User;
	userSubscription:Subscription;
	likeForm: FormGroup;
	dislikeForm: FormGroup;

	constructor(
		private authService: AuthService,
		private route: ActivatedRoute,
		private likeService: LikeService,
		private formBuilder: FormBuilder,
		private httpClient: HttpClient
	) { }

	ngOnInit() {
		this.userSubscription= this.authService.userSubject.subscribe(
			(user: User) => {
			  this.currentUser= user;
			}
		);
		this.authService.emitUserSubject();
		this.initForm();
		this.getMyVote();
	}

	initForm() {
		this.likeForm= this.formBuilder.group({
			id: [this.id]
		});
		this.dislikeForm= this.formBuilder.group({
			id: [this.id]
		})
	}

	getMyVote() {
    this.likeService.getMyVote(this.id).then(
      (like: LikeDislike) => {
				if(like === null) {
					this.myVote= 0;
				} else {
					this.myVote= like.typeVote;
				}
      }
    );
  }

	onLike() {
		this.likeService.saveLike(this.id);
		this.likeCount++;
		if(this.myVote !== 0) {
			this.dislikeCount--;
		}
		this.myVote= 1;
		this.countingProgressBar()
	}

  onDislike() {
		this.likeService.saveDislike(this.id);
		this.dislikeCount++;
		if(this.myVote !== 0) {
			this.likeCount--;
		}
		this.myVote= -1;
		this.countingProgressBar();
	}

	countingProgressBar() {
		let num= this.likeCount/(this.likeCount+this.dislikeCount)*100
		this.progressBar	= num+"%";
	}

        
}
