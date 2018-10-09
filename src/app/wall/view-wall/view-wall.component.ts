import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { WallService } from '../../services/wall.service';
import { Wall } from '../../models/wall.model';
import { Route, Router } from '@angular/router';
import { CommentService } from '../../services/comment.service';

@Component({
	selector: 'app-view-wall',
	templateUrl: './view-wall.component.html',
	styleUrls: ['./view-wall.component.scss']
})
export class ViewWallComponent implements OnInit {

	viewMessage: boolean= false;
	bricks: Wall[];
	shForm: FormGroup;
	urlProduct: string;

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private commentService: CommentService,
		private wallService: WallService) { }

	ngOnInit() {
		this.initForm();
	}

	initForm() {
		this.wallService.getWall().then(
			(walls: Wall[]) => {
				this.handlingBricks(walls);
				this.bricks= walls;
			}
		)
		this.wallService.getWall();
		this.shForm= this.formBuilder.group({
			html: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]]
		});
	}

	onSubmit() {
		const html= this.shForm.get('html').value;
		this.wallService.addSh(html);
	}

	onViewMessage() {
		this.viewMessage= true;
	}

	handlingBricks(walls: Wall[]) {
		for(let i=0; i < walls.length; i++) {
			if(walls[i].type === 'like') {
				if(walls[i].likable.type === 'movie') {
					this.urlProduct= '/movies/'+walls[i].likable.id;
					walls[i].html= `<i class="fas fa-heart"></i> le film: ${ walls[i].likable.title } (${ walls[i].likable.releaseDate })`
				}
			}else if(walls[i].type === 'dislike'){
				if(walls[i].likable.type === 'movie') {
					this.urlProduct= '/movies/'+walls[i].likable.id;
					walls[i].html= `<i class="fas fa-heartbeat"></i> le film: ${ walls[i].likable.title } (${ walls[i].likable.releaseDate })`
				}
			}
			console.log("brick= "+i+1);
			console.log(walls[i]);
		}
	}

	goTo(index:number) {
		this.router.navigate([this.urlProduct]);
	}

	navigateToAddComment(index:number) {
		console.log(this.bricks);
		if(this.bricks[index].comments.length > 0 ) {
			this.commentService.init(this.bricks[index].comments);
		}
		this.router.navigate(['/wall', this.bricks[index].id]);	
	}
}
