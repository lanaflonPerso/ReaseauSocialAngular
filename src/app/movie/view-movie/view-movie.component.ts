import { Component, OnInit, Input } from '@angular/core';
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
	progressBar: String;
	countLike: number;

	constructor(private movieService: MovieService,
				private route: ActivatedRoute,
				private router: Router) { }

	ngOnInit() {
		this.movie= new Movie('', '', '');
		const id= this.route.snapshot.params['id'];
		this.movieService.getMovieById(+id).then(
			(movie: Movie) => {
				this.movie= movie;
				this.countLike= this.movie.dislikeCount+this.movie.likeCount;
				let pourcent= this.movie.likeCount/(this.countLike)*100;
				this.progressBar= this.countLike === 0 ? "50%" : pourcent+"%";
			}
		);
	}
}
