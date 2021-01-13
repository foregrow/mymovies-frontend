import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Genre } from 'src/app/models/genres';
import { GenreService } from 'src/app/services/genre.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {

  displayedColumns: string[] = ['position','type']
  genres:Genre[] =[];
  dataSource =new MatTableDataSource<Genre>(this.genres);
  
  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort;
  constructor(private _gs:GenreService,
    private _router:Router) { }
    
  ngOnInit(): void {
    this.fetchData();
  }
  test(){
    this._gs.test().subscribe(
      data=>{
        console.log(data);
      },error=>{console.log(error);}
    );
  }
  fetchData() {
    this._gs.getAll()
        .subscribe(data => 
          {this.genres = data,this.setDataSource();},
          error=>{
            console.log(error);
          });
  }

  setDataSource(){
    this.dataSource.data = this.genres;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue:string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
