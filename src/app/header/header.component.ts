import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/User.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userSubscription: Subscription;
  currentUser: User;


  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.userSubscription= this.authService.userSubject.subscribe(
      (user: User) => {
        this.currentUser= user;
      }
    );
    this.authService.emitUserSubject();
  }

  signOut(){
    localStorage.removeItem('currentUser');
    this.authService.signOut();
    this.router.navigate(['/auth/signin']);
  }
}
