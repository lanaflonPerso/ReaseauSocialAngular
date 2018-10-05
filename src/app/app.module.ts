import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { BooksService } from './services/books.service';
import { WallService } from './services/wall.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PeopleService } from './services/people.service';
import { ViewMovieComponent } from './movie/view-movie/view-movie.component';
import { ViewLikeComponent } from './like/view-like/view-like.component';
// **********************************UTILISATEUR*******************************//
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';

// **********************************WALL************************************//
import { ViewWallComponent } from './wall/view-wall/view-wall.component';
import { AddCommentComponent } from './wall/add-comment/add-comment.component';

// **********************************PEOPLE**********************************//
import { AddPeopleComponent } from './people/add-people/add-people.component';
import { ViewPeopleComponent } from './people/view-people/view-people.component';

// **********************************MUSIC***********************************//
import { AddAlbumComponent } from './music/add-album/add-album.component';
import { ViewAlbumComponent } from './music/view-album/view-album.component';

// **********************************MOVIE************************************//
import { MovieService } from './services/movie.service';
import { AddMovieComponent } from './movie/add-movie/add-movie.component';

const appRoutes: Routes = [
  { path: 'auth/ok', component: AppComponent },
  // **********************************UTILISATEUR*******************************//
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },

  // **********************************MOVIE************************************//
  { path: 'movies/add', component: AddMovieComponent, canActivate: [AuthGuardService] },
  { path: 'movies/:id', component: ViewMovieComponent },

  // **********************************PEOPLE**********************************//
  { path: 'peoples/add/:type/:id', component: AddPeopleComponent },
  { path: 'peoples/add', component: AddPeopleComponent },
  { path: 'peoples/:id', component: ViewPeopleComponent },

  // **********************************WALL***********************************//
  { path: 'wall', component: ViewWallComponent },
  { path: 'wall/:id', component: AddCommentComponent },

  // **********************************Music**********************************//
  { path: 'album/add', component: AddAlbumComponent },
  { path: 'album/view/:id', component: ViewAlbumComponent },

  { path: '', redirectTo: '/wall', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    HeaderComponent,
    AddMovieComponent,
    AddPeopleComponent,
    ViewMovieComponent,
    ViewLikeComponent,
    ViewWallComponent,
    AddCommentComponent,
    ViewPeopleComponent,
    AddAlbumComponent,
    ViewAlbumComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    BooksService,
    PeopleService,
    MovieService,
    WallService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
