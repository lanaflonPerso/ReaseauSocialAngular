import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { User } from '../models/User.model';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let user: User= JSON.parse(localStorage.getItem('currentUser'));;
    if(user && user.email) {
      return true;
    }
    this.router.navigate(['/auth/signin'], { queryParams: { returnUrl: state.url}}); 
  }
}
