import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovietvshowService } from 'src/app/services/movietvshow.service';

@Component({
  selector: 'app-top-movies',
  templateUrl: './top-movies.component.html',
  styleUrls: ['./top-movies.component.css']
})
export class TopMoviesComponent implements OnInit {

  movies;
  constructor(private _mtss:MovietvshowService,
    private _router:Router) { }

  ngOnInit(): void {
    this.getAllMoviesSortedByRating();
  }

  getAllMoviesSortedByRating(){
    this._mtss.getAllMovies().subscribe(
      data=>{
        this.movies = data;
        console.log(this.movies);
      }
    )
  }

  mtsOrPersonDetails(param, id) {
    if (param === 'mts') {
      this._router.navigate([`movie-details/${id}`]);
    }
    // this._router.navigate(['search']);
  }
}
