import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Episode } from 'src/app/models/episodes';
import { EpisodeService } from 'src/app/services/episode.service';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.css']
})
export class EpisodesComponent implements OnInit {

  displayedColumns: string[] = ['position','serialNumber','name','movieTvShow','season', 'details', 'delete']
  episodes:Episode[] =[];
  dataSource =new MatTableDataSource<Episode>(this.episodes);
  
  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort;
  constructor(private _es:EpisodeService,
    private _router:Router) { }
    
  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this._es.getAll()
        .subscribe(data => 
          {this.episodes = data,this.setDataSource();},
          error=>{
            console.log(error);
          });
  }

  setDataSource(){
    this.dataSource.data = this.episodes;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue:string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  detailsOrAdd(param:any){
    this._router.navigate([`admin/episode-detail/${param}`]);
  }


  delete(id:any){
    this._es.delete(id)
      .subscribe(
        data => {
            this.episodes = data;
            this.setDataSource();
            alert('Successfully deleted!')
        },
        ()=>{ alert('Error while deleting!');}
      ); 
    
  }

}
