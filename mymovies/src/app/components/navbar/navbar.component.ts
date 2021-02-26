import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventEmitter } from 'events';
import { UserService } from 'src/app/services/user.service';
import { AdminComponent } from '../admin/admin.component';
import { GenresComponent } from '../admin/genres/genres.component';
import { MainComponent } from '../main/main.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  searchValue: string;
  
  constructor(public us: UserService,
    public router: Router,
    public route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  searchByParam() {
    let param = this.searchValue && this.searchValue !== '' ? this.searchValue.trim() : null;
    this.searchValue = '';
    if(this.router.url!=='/main' && this.router.url!=='/admin'){
      this.home();
    }
    this.us.emit<string>(param);
    
  }

  home() {
    if (this.us.getRole() === 'ADMIN')
      this.router.navigate([AdminComponent]);
    else if (this.us.getRole() === 'USER')
      this.router.navigate([MainComponent]);
  }
  channels() {
    this.router.navigate(['channels-movies']);
  }
  topRated() {
    this.router.navigate(['top-rated']);
  }

  users(){
    this.router.navigate(['admin/users']);
  }
  genres(){
    this.router.navigate(['admin/genres']);
  }
  episodes(){
    this.router.navigate(['admin/episodes']);
  }
  seasons(){
    this.router.navigate(['admin/seasons']);
  }
  moviestvshows(){
    this.router.navigate(['admin/moviestvshows']);
  }
  persons(){
    this.router.navigate(['admin/persons']);
  }


}

