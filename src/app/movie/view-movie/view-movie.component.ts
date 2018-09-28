import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service'
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../../models/movie.models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-movie',
  templateUrl: './view-movie.component.html',
  styleUrls: ['./view-movie.component.scss']
})
export class ViewMovieComponent implements OnInit {

	movie: Movie;

	constructor(private movieService: MovieService,
				private route: ActivatedRoute,
				private router: Router) { }

	ngOnInit() {
		this.movie= new Movie('', '', '');
		const id= this.route.snapshot.params['id'];
		this.movieService.getMovieById(+id).then(
			(movie: Movie) => {
				this.movie= movie;
			}
		);
	}
}
