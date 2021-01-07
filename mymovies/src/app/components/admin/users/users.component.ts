import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from 'src/app/models/users';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['position','email','userRole','delete']
  users:User[] =[];
  dataSource =new MatTableDataSource<User>(this.users);
  
  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort;
  constructor(private _us:UserService,
    private _router:Router) { }
    
  ngOnInit(): void {
    this.fetchData();
  }

  // errorPage(){
  //   this._router.navigate(['error']);
  // }
  
  fetchData() {
    this._us.getAll()
        .subscribe(data => 
          {this.users = data,this.setDataSource();},
          error=>{
            console.log(error);
          });
  }

  setDataSource(){
    this.dataSource.data = this.users;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue:string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  delete(id:any){
    if(id!==1){
      this._us.delete(id)
      .subscribe(
        data => {this.users = data,this.setDataSource();},
        error=>{ alert('Error while deleting user!');}
      ); 
    }
    
  }

}
