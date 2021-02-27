import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UsermtsService } from 'src/app/services/usermts.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user;
  constructor(private _umtss:UsermtsService,private _us:UserService) { }

  ngOnInit(): void {
    this.getUserMTS();
  }

  getUserMTS(){
    this._us.getByEmail(this._us.getEmailFromToken()).subscribe(
      data=>{
        this.user = data;
        console.log(this.user);
      }
    )
  }


}
