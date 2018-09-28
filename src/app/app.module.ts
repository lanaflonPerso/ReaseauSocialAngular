import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { BooksService } from './services/books.service';

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { BookListComponent } from './book-list/book-list.component';
import { SingleBookComponent } from './book-list/single-book/single-book.component';
import { BookFormComponent } from './book-list/book-form/book-form.component';
import { HeaderComponent } from './header/header.component';
import { AddMovieComponent } from './movie/add-movie/add-movie.component';
import { AddPeopleComponent } from './people/add-people/add-people.component';
import { PeopleService } from './services/people.service';
import { MovieService } from './services/movie.service';
import { ViewMovieComponent } from './movie/view-movie/view-movie.component';
import { ViewLikeComponent } from './like/view-like/view-like.component';

const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'books', component: BookListComponent },
  { path: 'books/new', component: BookFormComponent },
  { path: 'books/view/:id', component: SingleBookComponent },

  { path: 'movies/add', component: AddMovieComponent },
  { path: 'movies/:id', component: ViewMovieComponent },

	{ path: 'peoples/add', component: AddPeopleComponent }



];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    BookListComponent,
    SingleBookComponent,
    BookFormComponent,
    HeaderComponent,
    AddMovieComponent,
    AddPeopleComponent,
    ViewMovieComponent,
    ViewLikeComponent
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
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
