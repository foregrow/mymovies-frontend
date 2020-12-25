import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {

  persons:any;
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
          },
          error=>{
            this.errorPage();
          });
  }

  detailsOrAdd(param:any){
    this._router.navigate([`admin/person-detail/${param}`]);
  }


  delete(id:any){
    console.log(id);
    this._ps.delete(id)
      .subscribe(
        data => {this.persons = data},
        error=>{ alert('Error while deleting user!');}
      ); 
  }

  errorPage(){
    this._router.navigate(['error']);
  }

}
