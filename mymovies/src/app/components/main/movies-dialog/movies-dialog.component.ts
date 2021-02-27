import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MovietvshowService } from 'src/app/services/movietvshow.service';
@Component({
  selector: 'app-movies-dialog',
  templateUrl: './movies-dialog.component.html',
  styleUrls: ['./movies-dialog.component.css']
})
export class MoviesDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private _mtss:MovietvshowService,
  private _router:Router) { }
  mts;
  ngOnInit(): void { 
  }
  movieDetails(movie){
    this._mtss.findByMovieData(movie).subscribe(
      data=>{
        this.mts = data;
        this._router.navigate([`movie-details/${this.mts.id}`]);
      },err=>{console.log(err);}
    );
  }
}
