import { Component, OnInit, ViewChild } from '@angular/core';
import { ExternalApiService } from 'src/app/services/external-api.service';
import { DateUtils } from 'src/app/utils/dateutils';
import { Statics } from 'src/app/utils/statics';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ChannelMovie } from 'src/app/models/channelmovie';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-channel-movies',
  templateUrl: './channel-movies.component.html',
  styleUrls: ['./channel-movies.component.css']
})

export class ChannelMoviesComponent implements OnInit {
  displayedColumns: string[] = ['position','id','title','startTime','endTime','channelName']

  channels: any[] = [];
  movies: ChannelMovie[] = [];
  dataSource =new MatTableDataSource<ChannelMovie>(this.movies);
  
  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort;

  constructor(private _externalApiService: ExternalApiService) {
 }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(){
    let channelMovie:ChannelMovie;
    let counter = 1;
    this._externalApiService.getChannels().subscribe(
      channelsdata=>{
        this.channels= channelsdata;
        for(let i=0;i<this.channels.length;i++){
          let cid = this.channels[i]['id'];
          let channelName = this.channels[i]['name'];
        this._externalApiService.getChannelsMovies(cid).subscribe(
          data=>{
              if(data.hasOwnProperty(cid)){
                let moviesData = data[cid];
                for(let j=0;j<moviesData.length;j++){
                  let movie = moviesData[j];
                  if(movie['categories'].length==1&&movie['categories'].includes(Statics.movieCategory)
                    &&DateUtils.isMovieInFuture(movie['startTime'])){
                    channelMovie= new ChannelMovie(counter++,movie['id'],movie['title'],movie['startTime'],movie['endTime'],channelName);
                    this.movies.push(channelMovie);
                  }
                }
                
              } 
            this.setDataSource();
          },error=>{console.log(error)});
        }
        
        
      },error=>{console.log(error)});
  }

  setDataSource(){
    this.dataSource.data = this.movies;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue:string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
