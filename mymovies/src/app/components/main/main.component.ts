import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'protractor';
import { MovieTvShow } from 'src/app/models/movietvshows';
import { Person } from 'src/app/models/persons';
import { ExternalApiService } from 'src/app/services/external-api.service';
import { MovietvshowService } from 'src/app/services/movietvshow.service';
import { PersonService } from 'src/app/services/person.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  searchResultsData:any[];
  // moviestvshows:MovieTvShow[];
  // persons:Person[];
  searchValue:string;
  resultValue:string;
  isSearched:boolean=false;
  chosenEntityValue:string="";
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _externalApiService: ExternalApiService,
    private _us: UserService,
    private _mtss: MovietvshowService,
    private _ps: PersonService,
  ) { }

  ngOnInit(): void {
    this.getExternalToken();
    this.chosenEntity.setValue('mts');
    // this.getPersons();
    // this.getMTS();
  }
  // getMTS(){
  //   this._mtss.getAll().subscribe(
  //     data=>{this.moviestvshows=data,console.log(this.moviestvshows);},
  //     error=>{console.log(error);}
  //   );
  // }
  // getPersons(){
  //   this._ps.getAll().subscribe(
  //     data=>{this.persons=data,console.log(this.persons);},
  //     error=>{console.log(error);}
  //   );
  // }
  chosenEntity = new FormControl();
  getExternalToken(){
    this._externalApiService.getExternalAccessToken().subscribe(
      data=>{
        this._externalApiService.setExternalAccessTokenInLocalStorage(data.access_token);
      },error=>{
        console.log(error);
      }
    )
  }
  searchDetails(){
    this.isSearched = true;
    this.resultValue = this.searchValue.trim();
    
    this.chosenEntityValue=this.chosenEntity.value;
    if(!this.resultValue || this.resultValue===''){
      this.searchResultsData = [];
    }else{ 
      if(this.chosenEntityValue==='mts'){
        this._mtss.findAllByNameContains(this.resultValue).subscribe(
          data=>{this.searchResultsData=data
            console.log(this.searchResultsData);
          },
          error=>{console.log(error);}
        );
      }else if(this.chosenEntityValue==='persons'){
        this._ps.findAllByFNameOrLNameContains(this.resultValue).subscribe(
          data=>{this.searchResultsData=data,
            console.log(this.searchResultsData);
  
          },
          error=>{console.log(error);}
        );
      }
    }
    this.searchValue="";
  } 
  channelsMovies(){
    this._router.navigate(['channels-movies']);
  }

  mtsOrPersonDetails(param,id){
    this._router.navigate([`details/${param}/${id}`]);
    // if(param==='mts'){
    //   this._router.navigate([`details/${param}/${id}`]);
    // }else if(param==='person'){
    //   this._router.navigate([`person-detail/${id}`]);
    // }
    // this._router.navigate(['search']);
  }

}
