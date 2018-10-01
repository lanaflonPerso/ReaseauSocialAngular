import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { WallService } from '../../services/wall.service';
import { Wall } from '../../models/wall.model';

@Component({
	selector: 'app-view-wall',
	templateUrl: './view-wall.component.html',
	styleUrls: ['./view-wall.component.scss']
})
export class ViewWallComponent implements OnInit {

	viewMessage: boolean= false;
	bricks: Wall[];
	shForm: FormGroup;

	constructor(private formBuilder: FormBuilder,
				private wallService: WallService) { }

	ngOnInit() {
		this.initForm();
	}

	initForm() {
		this.wallService.getWall().then(
			(walls: Wall[]) => {
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
}
