import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieTvShow } from 'src/app/models/movietvshows';
import { MovietvshowService } from 'src/app/services/movietvshow.service';

@Component({
  selector: 'app-mts',
  templateUrl: './mts.component.html',
  styleUrls: ['./mts.component.css']
})
export class MtsComponent implements OnInit {

  movies:any;
  tvshows:any;
  constructor(private _mtss:MovietvshowService,
    private _router: Router){}
  ngOnInit(): void {
    this.fetchMovies();
    this.fetchShows();
  }
  
  fetchMovies() {
    this._mtss.getAllMovies()
         .subscribe(data => 
          {
            this.movies = data;          },
          error=>{
            this.errorPage();
          });
  }

  fetchShows() {
    this._mtss.getAllTVShows()
         .subscribe(data => 
          {
            this.tvshows = data;
          },
          error=>{
            this.errorPage();
          });
  }

  detailsOrAdd(param:any){
    this._router.navigate([`admin/movietvshow-detail/${param}`]);
  }


  delete(id:any,param:any){
    this._mtss.delete(id)
      .subscribe(
        data => {
          if(param==='movie'){
            this.movies = data;
          }else if(param==='tvshow'){
            this.tvshows =data;
          }
        },
        error=>{ alert('Error while deleting!');}
      ); 
    
  }

  errorPage(){
    this._router.navigate(['error']);
  }

}
