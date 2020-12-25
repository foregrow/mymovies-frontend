import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users:any;
  constructor(private _us:UserService,
    private _router:Router) { }
    
  ngOnInit(): void {
    this.fetchData();
  }

  errorPage(){
    this._router.navigate(['error']);
  }
  
  fetchData() {
    this._us.getAll()
        .subscribe(data => 
          {this.users = data},
          error=>{
            this.errorPage();
          });
  }


  delete(id:any){
    if(id!==1){
      this._us.delete(id)
      .subscribe(
        data => {this.users = data},
        error=>{ alert('Error while deleting user!');}
      ); 
    }
    
  }

}
