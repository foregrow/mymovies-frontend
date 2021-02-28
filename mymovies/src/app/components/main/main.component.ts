import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { error } from 'protractor';
import { Subscription } from 'rxjs';
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
  searchResultsData: any[];
  moviestvshows: MovieTvShow[] = [];
  // persons:Person[];
  searchValue: string;
  resultValue: string;
  isSearched: boolean = false;
  chosenEntityValue: string = "";
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
    this._us.on<string>().subscribe(
      data => {
        this.searchValue = data;
        if (!this.searchValue || this.searchValue === '') {
          this.getMTS();
        } else { this.searchDetails(); }
      }
    );

  }
  getMTS() {
    this.isSearched = false;
    //getAll unless its already got
    if (this.moviestvshows.length === 0) {
      this._mtss.getAll().subscribe(
        data => { this.moviestvshows = data, console.log(this.moviestvshows); },
        error => {
          console.log(error);
        });
    }

  }
  chosenEntity = new FormControl();
  getExternalToken() {
    this._externalApiService.getExternalAccessToken().subscribe(
      data => {
        this._externalApiService.setExternalAccessTokenInLocalStorage(data.access_token);
      }, error => {
        console.log(error);
      }
    )
  }
  searchDetails() {
    if (this.searchValue && this.searchValue !== '') {
      this.isSearched = true;
      this.resultValue = this.searchValue;
      this.chosenEntityValue = this.chosenEntity.value;
      if (!this.resultValue || this.resultValue === '') {
        this.searchResultsData = [];
      } else {
        if (this.chosenEntityValue === 'mts') {
          this._mtss.findAllByNameContains(this.resultValue).subscribe(
            data => {
              this.searchResultsData = data
            },
            error => { console.log(error); }
          );
        } else if (this.chosenEntityValue === 'persons') {
          this._ps.findAllByFNameOrLNameContains(this.resultValue).subscribe(
            data => {
              this.searchResultsData = data
            },
            error => { console.log(error); }
          );
        }
      }
    }

  }
  mtsOrPersonDetails(param, id) {
    if (param === 'mts') {
      this._us.emit<string>('');
      this._router.navigate([`movie-details/${id}`]);
    } else if (param === 'person') {
      this._us.emit<string>('');
      this._router.navigate([`person-details/${id}`]);
    }
  }

}
