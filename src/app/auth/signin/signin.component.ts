import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;
  loading:boolean= false;
  submitted:boolean= false;

  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm()
  }

  get f() {
    return this.signInForm.controls;
  }

  initForm() {
    this.signInForm= this.formBuilder.group({
      email: ['vianneyba@free.fr', [Validators.required, Validators.email]],
      password: ['azerty', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit() {
    this.submitted= true;

    const email= this.signInForm.get('email').value;
    const password= this.signInForm.get('password').value;
    this.authService.signIn(email, password).then(
      () => {
        this.router.navigate(['/wall']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
}
