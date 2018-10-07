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

// **********************************Autre************************************//
import { SearchComponent } from './other/search/search.component';
import { CategoryService } from './services/category.service';
import { LikeService } from './services/like.service';

const appRoutes: Routes = [
  
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
  { path: 'wall', component: ViewWallComponent, canActivate: [AuthGuardService] },
  { path: 'wall/:id', component: AddCommentComponent, canActivate: [AuthGuardService] },

  // **********************************Music**********************************//
  { path: 'albums/add', component: AddAlbumComponent, canActivate: [AuthGuardService] },
  { path: 'albums/view/:id', component: ViewAlbumComponent },

  { path: 'search', component: SearchComponent },
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
    ViewAlbumComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    LikeService,
    AuthService,
    BooksService,
    PeopleService,
    MovieService,
    WallService,
    AuthGuardService,
    CategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
