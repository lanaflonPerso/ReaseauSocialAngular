import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    var config = {
      apiKey: "AIzaSyCVTSGVwGjlbN8T7hOJa5XtfxydxebYYYU",
      authDomain: "utilisateur-2076f.firebaseapp.com",
      databaseURL: "https://utilisateur-2076f.firebaseio.com",
      projectId: "utilisateur-2076f",
      storageBucket: "utilisateur-2076f.appspot.com",
      messagingSenderId: "520462388903"
    };
    firebase.initializeApp(config);
  }
}
