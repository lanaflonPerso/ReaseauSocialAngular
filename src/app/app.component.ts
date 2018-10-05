import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { User } from './models/User.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private authService: AuthService) {

  } 
  
  ngOnInit() {
    console.log('ICI DANS APP.COMPONENTS')
  }
}
