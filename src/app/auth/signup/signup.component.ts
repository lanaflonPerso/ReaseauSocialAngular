import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/User.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.signUpForm= this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordC: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  onSubmit() {
    if(this.signUpForm.valid) {
      const firstName= this.signUpForm.get('firstName').value;
      const lastName= this.signUpForm.get('lastName').value;
      const email= this.signUpForm.get('email').value;
      const password= this.signUpForm.get('password').value;
      const passwordC= this.signUpForm.get('passwordC').value;
  
      let user= new User(firstName, lastName, email, password)
      user.passwordC= passwordC;

      console.log("ca part!")
      this.authService.signUp(user);
    }
  }
}
