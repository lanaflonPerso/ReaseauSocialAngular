import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { WallService } from '../../services/wall.service';

@Component({
	selector: 'app-view-wall',
	templateUrl: './view-wall.component.html',
	styleUrls: ['./view-wall.component.scss']
})
export class ViewWallComponent implements OnInit {

	shForm: FormGroup;

	constructor(private formBuilder: FormBuilder,
				private wallService: WallService) { }

	ngOnInit() {
		this.initForm();
	}

	initForm() {
		this.shForm= this.formBuilder.group({
			html: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]]
		});
	}

	onSubmit() {
		const html= this.shForm.get('html').value;
		this.wallService.addSh(html);
	}
}
