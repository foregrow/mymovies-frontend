import { Component, OnInit, ViewChild } from '@angular/core';
import { ExternalApiService } from 'src/app/services/external-api.service';
import { DateUtils } from 'src/app/utils/dateutils';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ChannelMovie } from 'src/app/models/channelmovie';
import { MatSort } from '@angular/material/sort';
import { TranslateApiService } from 'src/app/services/translate-api.service';
import { environment } from 'src/environments/environment';
import {MatDialog} from '@angular/material/dialog';
import { MoviesDialogComponent } from '../movies-dialog/movies-dialog.component';
import { ImdbApiService } from 'src/app/services/imdb-api.service';
import { ImdbMovie } from 'src/app/models/imdbmovie';
import { MovietvshowService } from 'src/app/services/movietvshow.service';
import { SpinnerService } from 'src/app/services/spinner.service';
@Component({
  selector: 'app-channel-movies',
  templateUrl: './channel-movies.component.html',
  styleUrls: ['./channel-movies.component.css']
})

export class ChannelMoviesComponent implements OnInit {
  displayedColumns: string[] = ['position','title', 'startTime', 'endTime', 'channelName']

  channels: any[] = [];
  movies: ChannelMovie[] = [];
  foundImdbMovies = [];
  dataSource = new MatTableDataSource<ChannelMovie>(this.movies);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _externalApiService: ExternalApiService,
    private _ts: TranslateApiService,
    private _imdbs: ImdbApiService,
    private _mtss: MovietvshowService,
    private _spinnerService:SpinnerService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getMovies();
    
  }
  // spinnerEnd(){
  //   if(this.dataSource?.data.length>0){
  //     this._spinnerService.requestEnded();
  //   }
    
  // }
  addImdbMovies(imdbMovies){
    this._mtss.addImdbMovies(imdbMovies).subscribe(
      ()=>{
        
      },err=>{console.log(err);}
    );
  }
  getImdbMoviesByTitle(title){
    this._imdbs.getMoviesByTitle(title).subscribe(
      data=>{
        let resOfData = data['results'];
        let imdbMovies = [];
        if(resOfData && resOfData.length>0){
          this.foundImdbMovies = resOfData.splice(0,3); //first 3 results
          
          this.foundImdbMovies.forEach(m=>{
            let imdbMovie=null;
            if(m['id'].startsWith('/title/tt')){
              imdbMovie = {
                length: m['runningTimeInMinutes'],
                title: m['title'],
                type: m['titleType'],
                year: m['year'],
              }
              imdbMovies.push(imdbMovie);
            }    
          });
          this.addImdbMovies(imdbMovies);    
        }
        this.dialog.open(MoviesDialogComponent,{data:imdbMovies});
      },err=>{console.error(err);}
    );
  }
  trans(row) {
    this._ts.getTranslation(row.title).subscribe(
      data => {
        if (data.hasOwnProperty('data')) {
          let dOfData = data['data'];
          let translations = dOfData['translations'];
          let movieNameTranslated = translations[0].translatedText;
          this.getImdbMoviesByTitle(movieNameTranslated);
        }
      }, err => {
        console.error(err)
      });
  }
  getMovies() {
    let channelMovie: ChannelMovie;
    let counter = 1;
    this._externalApiService.getChannels().subscribe(
      channelsdata => {
        this.channels = channelsdata;
        for (let i = 0; i < this.channels.length; i++) {
          let cid = this.channels[i]['id'];
          let channelName = this.channels[i]['name'];
          this._externalApiService.getChannelsMovies(cid).subscribe(
            data => {
              if (data.hasOwnProperty(cid)) {
                let moviesData = data[cid];
                for (let j = 0; j < moviesData.length; j++) {
                  let movie = moviesData[j];
                  if (movie['categories'].length == 1 && movie['categories'].includes(environment.movieCategory)
                    && DateUtils.isMovieInFuture(movie['startTime'])) {
                      channelMovie = new ChannelMovie(counter++, movie['id'], movie['title'], movie['startTime'], movie['endTime'], channelName);
                      this.movies.push(channelMovie);
                      
                  }
                }

              }
              this.setDataSource();
              //this.spinnerEnd();
            }, error => { console.log(error) });
        }


      }, error => { console.log(error) });
  }

  setDataSource() {

    this.dataSource.data = this.movies;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
