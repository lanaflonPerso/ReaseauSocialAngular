import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(localStorage.getItem('currentUser')) {
      return true;
    }
    this.router.navigate(['/auth/signin'], { queryParams: { returnUrl: state.url}}); 
  }
}
