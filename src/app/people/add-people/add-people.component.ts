import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PeopleService } from '../../services/people.service'

@Component({
  selector: 'app-add-people',
  templateUrl: './add-people.component.html',
  styleUrls: ['./add-people.component.scss']
})
export class AddPeopleComponent implements OnInit {

	
	idLikable: number;
	type: number;
	now= new Date();
	peopleForm: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private route: ActivatedRoute,
		private peopleService: PeopleService
	) { }

	ngOnInit() {
		this.initForm();
	}

	initForm() {
		if(this.route.snapshot.params['id'] != null) {
			this.idLikable= this.route.snapshot.params['id'];
			this.type= this.route.snapshot.params['type'];
		}

		this.peopleForm= this.formBuilder.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			birthday: ['', [Validators.required ,Validators.min(1900), Validators.max(this.now.getFullYear())]]
		})
	}

	onSubmit() {
		const firstName= this.peopleForm.get('firstName').value;
    	const lastName= this.peopleForm.get('lastName').value;
		const birthday= this.peopleForm.get('birthday').value;

		if(this.idLikable != null) {
			console.log("on enregistre l'acteur dans le LIKABLE");
			this.peopleService.createNewUserInLikable(firstName, lastName, birthday, this.idLikable, this.type);
		} else {
			console.log("on enregistre seulement l'acteur");
			this.peopleService.createNewUser(firstName, lastName, birthday);
		}
	}
}