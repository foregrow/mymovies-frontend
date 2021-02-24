import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExternalApiService } from 'src/app/services/external-api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(public us: UserService,private _router: Router,
    private _route: ActivatedRoute,public _externalApiService: ExternalApiService) { }

  ngOnInit(): void {
    this.getExternalToken();
  }

  getExternalToken() {
    this._externalApiService.getExternalAccessToken().subscribe(
      data => {
        this._externalApiService.setExternalAccessTokenInLocalStorage(data.access_token);
      }, error => {
        console.log(error);
      }
    )
  }
}
