import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Season } from 'src/app/models/seasons';
import { SeasonService } from 'src/app/services/season.service';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.css']
})
export class SeasonsComponent implements OnInit {

  displayedColumns: string[] = ['position','serialNumber','releaseYear','movieTvShow','episodes', 'details', 'delete']
  seasons:Season[] =[];
  dataSource =new MatTableDataSource<Season>(this.seasons);
  
  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort;
  constructor(private _ss:SeasonService,
    private _router:Router) { }
    
  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this._ss.getAll()
        .subscribe(data => 
          {this.seasons = data,this.setDataSource();},
          error=>{
            console.log(error);
          });
  }

  setDataSource(){
    this.dataSource.data = this.seasons;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue:string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  detailsOrAdd(param:any){
    this._router.navigate([`admin/season-detail/${param}`]);
  }


  delete(id:any){
    this._ss.delete(id)
      .subscribe(
        data => {
            this.seasons = data;
            this.setDataSource();
            alert('Successfully deleted!')
        },
        ()=>{ alert('Error while deleting!');}
      ); 
    
  }

}
