import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'src/app/models/persons';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {
  displayedColumns: string[] = ['position','firstName','lastName','bornDate','diedDate','details','delete']
  persons:Person[] =[];
  dataSource =new MatTableDataSource<Person>(this.persons);
  
  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort;
  constructor(private _ps:PersonService,
    private _router:Router,private _route:ActivatedRoute) { }
    
  ngOnInit(): void {
    this.fetchData();
    
  }
  
  fetchData() {
    this._ps.getAll()
         .subscribe(data => 
          {
            this.persons = data;
            this.setDataSource();
          },
          error=>{
            console.log(error);
          });
  }

  setDataSource(){
    this.dataSource.data = this.persons;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  detailsOrAdd(param:any){
    this._router.navigate([`admin/person-detail/${param}`]);
  }

  applyFilter(filterValue:string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  delete(id:any){
    console.log(id);
    this._ps.delete(id)
      .subscribe(
        data => {this.persons = data,this.setDataSource()},
        error=>{ alert('Error while deleting user!');}
      ); 
  }

  // errorPage(){
  //   this._router.navigate(['error']);
  // }

}
