import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'protractor';
import { ExternalApiService } from 'src/app/services/external-api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _externalApiService: ExternalApiService,
    private _us: UserService,
  ) { }

  ngOnInit(): void {
    this.getExternalToken();
    
  }
  getExternalToken(){
    this._externalApiService.getExternalAccessToken().subscribe(
      data=>{
        this._externalApiService.setExternalAccessTokenInLocalStorage(data.access_token);
      },error=>{
        console.log(error);
      }
    )
  }

  channelsMovies(){
    this._router.navigate(['channels-movies']);
  }

}
