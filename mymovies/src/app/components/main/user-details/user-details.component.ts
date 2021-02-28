import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UsermtsService } from 'src/app/services/usermts.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user;
  constructor(private _router:Router,private _us:UserService) { }

  ngOnInit(): void {
    this.getUserMTS();
  }

  getUserMTS(){
    this._us.getByEmail(this._us.getEmailFromToken()).subscribe(
      data=>{
        this.user = data;
        console.log(this.user);
      }
    );
  }

  mtsOrPersonDetails(param, id) {
    if (param === 'mts') {
      this._router.navigate([`movie-details/${id}`]);
    } else if (param === 'person') {
      this._router.navigate([`person-details/${id}`]);
    }
    // this._router.navigate(['search']);
  }

}
