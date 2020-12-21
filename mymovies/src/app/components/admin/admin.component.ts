import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(public us: UserService,private _router: Router,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  home(){
    this._router.navigate([AdminComponent]);
  }
  users(){
    this._router.navigate(['users'], {relativeTo: this._route});
  }
  genres(){
    this._router.navigate(['genres'], {relativeTo: this._route});
  }
  episodes(){
    this._router.navigate(['episodes'], {relativeTo: this._route});
  }
  seasons(){
    this._router.navigate(['seasons'], {relativeTo: this._route});
  }
  moviestvshows(){
    this._router.navigate(['moviestvshows'], {relativeTo: this._route});
  }
  persons(){
    this._router.navigate(['persons'], {relativeTo: this._route});
  }

}
