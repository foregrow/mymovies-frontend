import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'src/app/models/persons';
import { PersonService } from 'src/app/services/person.service';
import { isNumber } from 'util';

@Component({
  selector: 'app-persondetail',
  templateUrl: './persondetail.component.html',
  styleUrls: ['./persondetail.component.css']
})
export class PersondetailComponent implements OnInit {

  addEditParam:any;
  person:any;
  addEditForm: FormGroup = this._fb.group({
    firstName: ['',Validators.required],
    lastName: ['',Validators.required],
    bio: ['',Validators.required],
    bornDate: ['',Validators.required],
    diedDate: [''],
    });

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _ps:PersonService,
    private _route: ActivatedRoute,
    private datePipe: DatePipe) {}


    ngOnInit(){
      this.addEditParam = this._route.snapshot.paramMap.get('p');
      
      if(this.addEditParam!=='add'){
        this.fetchEntityAndFillForm(this.addEditParam);
      }
      
      
      
    }

    fetchEntityAndFillForm(id:any){
      this._ps.getById(id).subscribe(
        data=>{
          this.person = data;
          this.patchValues();
        },error=>{
          this.errorPage();
        }
      )
    }

    patchValues(){
      this.addEditForm.patchValue({
        firstName : this.person.firstName,
        lastName : this.person.lastName,
        bio : this.person.bio,
        bornDate : this.datePipe.transform(this.person.bornDate,"yyyy-MM-ddTHH:mm:ss.SSS"),
        diedDate : this.datePipe.transform(this.person.diedDate,"yyyy-MM-ddTHH:mm:ss.SSS"),
      });
    }

    submit(param:any){
      let firstName = this.firstName?.value;
      let lastName = this.lastName?.value;
      let bio = this.bio?.value;
      let bornDate = this.bornDate?.value;
      let diedDate = this.diedDate?.value;
      if(firstName!==null&&lastName!==null&&bio!==null&&bornDate!==null){
        if(param==='add'){
          let person = new Person(0,firstName,lastName,bio,bornDate,diedDate);
          this._ps.add(person).subscribe(
            data=>{
              alert("Person successfully created!");
              this._router.navigate(['admin/persons']);
            },error=>{
              alert('Error while creating person!');
            }
          );
        }else if(param==='edit'){
          let person = new Person(this.person.id,firstName,lastName,bio,bornDate,diedDate);
          this._ps.update(person).subscribe(
            data=>{
              alert("Person's details successfully updated!");
              this.person = data;
              this.fetchEntityAndFillForm(this.person.id);
            },error=>{
              alert("Error while updating person's details!");
            }
          );
        }
      }else{
        alert('Some of the required fields are empty!');
      }
      
    }

    get firstName() {
      return this.addEditForm.get('firstName');
    }
    get lastName() {
      return this.addEditForm.get('lastName');
    }
    get bio() {
      return this.addEditForm.get('bio');
    }
    get bornDate() {
      return this.addEditForm.get('bornDate');
    }
    get diedDate() {
      return this.addEditForm.get('diedDate');
    }


    errorPage(){
      this._router.navigate(['error']);
    }
}
