import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MovieTvShow } from 'src/app/models/movietvshows';
import { MovietvshowService } from 'src/app/services/movietvshow.service';

@Component({
  selector: 'app-mts',
  templateUrl: './mts.component.html',
  styleUrls: ['./mts.component.css']
})
export class MtsComponent implements OnInit {
  displayedColumnsM: string[] = ['position','name','country','language','releaseDate','year','length','details','delete']
  displayedColumnsS: string[] = ['position','name','country','language','releaseDate','year','length','seasons','details','delete']
  movies:MovieTvShow[] =[];
  tvshows:MovieTvShow[] =[];
  dataSourceM =new MatTableDataSource<MovieTvShow>(this.movies);
  dataSourceS =new MatTableDataSource<MovieTvShow>(this.tvshows);
  @ViewChild(MatPaginator) paginatorM:MatPaginator;
  @ViewChild(MatSort) sortM:MatSort;

  @ViewChild(MatPaginator) paginatorS:MatPaginator;
  @ViewChild(MatSort) sortS:MatSort;

  constructor(private _mtss:MovietvshowService,
    private _router: Router){}
  ngOnInit(): void {
    this.fetchMovies();
    this.fetchShows();
  }

  setDataSourceM(){
    this.dataSourceM.data = this.movies;
    this.dataSourceM.sort = this.sortM;
    this.dataSourceM.paginator = this.paginatorM;
  }

  setDataSourceS(){
    this.dataSourceS.data = this.tvshows;
    this.dataSourceS.sort = this.sortS;
    this.dataSourceS.paginator = this.paginatorS;
  }

  applyFilterM(filterValue:string){
    this.dataSourceM.filter = filterValue.trim().toLowerCase();
  }

  applyFilterS(filterValue:string){
    this.dataSourceS.filter = filterValue.trim().toLowerCase();
  }
  
  fetchMovies() {
    this._mtss.getAllMovies()
         .subscribe(data => 
          {
            this.movies = data; 
            this.setDataSourceM();
                   },
          error=>{
            console.log(error);
          });
  }

  fetchShows() {
    this._mtss.getAllTVShows()
         .subscribe(data => 
          {
            this.tvshows = data;
            this.setDataSourceS();
          },
          error=>{
            console.log(error);
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
            this.setDataSourceM();
          }else if(param==='tvshow'){
            this.tvshows =data;
            this.setDataSourceS();
          }
        },
        error=>{ alert('Error while deleting!');}
      ); 
    
  }

  // errorPage(){
  //   this._router.navigate(['error']);
  // }

}
