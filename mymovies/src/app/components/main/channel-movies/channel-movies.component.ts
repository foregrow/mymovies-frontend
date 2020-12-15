import { Component, OnInit } from '@angular/core';
import { ExternalApiService } from 'src/app/services/external-api.service';
import { DateUtils } from 'src/app/utils/dateutils';
import { Statics } from 'src/app/utils/statics';

@Component({
  selector: 'app-channel-movies',
  templateUrl: './channel-movies.component.html',
  styleUrls: ['./channel-movies.component.css']
})
export class ChannelMoviesComponent implements OnInit {

  
  channels: any[] = [];
  movies: any[] = [];
  constructor(private _externalApiService: ExternalApiService) { }

  ngOnInit(): void {
    this.getMovies();
    
  }

  getMovies(){
    this._externalApiService.getChannels().subscribe(
      channelsdata=>{
        this.channels= channelsdata;
        for(let i=0;i<this.channels.length;i++){
          let cid = this.channels[i]['id'];
        
        this._externalApiService.getChannelsMovies(cid).subscribe(
          data=>{
              if(data.hasOwnProperty(cid)){
                let moviesData = data[cid];
                for(let i=0;i<moviesData.length;i++){
                  let movie = moviesData[i];
                  if(movie['categories'].length==1&&movie['categories'].includes(Statics.movieCategory)
                    &&DateUtils.isMovieInFuture(movie['startTime'])){
                    this.movies.push(movie);
                  }
                }
              }    
          });
        }
      });
  }

}
