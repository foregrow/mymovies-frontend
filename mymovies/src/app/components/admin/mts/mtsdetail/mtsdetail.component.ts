import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieTvShow } from 'src/app/models/movietvshows';
import { GenreService } from 'src/app/services/genre.service';
import { MovietvshowService } from 'src/app/services/movietvshow.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-mtsdetail',
  templateUrl: './mtsdetail.component.html',
  styleUrls: ['./mtsdetail.component.css']
})
export class MtsdetailComponent implements OnInit {

  addEditParam:any;
  movietvshow:any;
  genres:any[]=[];
  mtsTypes:string[] = ['MOVIE','TV_SHOW'];
  typeChosen = false;
  chosenGenres:any[] = [];
  addEditForm: FormGroup = this._fb.group({
    name: ['',Validators.required],
    description: ['',Validators.required],
    storyline: ['',Validators.required],
    lengthMinutes: ['',[Validators.required,Validators.pattern("^[1-9]\{1,4}")]],
    releaseDate: ['',Validators.required],
    releaseYear: ['',[Validators.required,Validators.pattern("^[0-9]\{4}")]],
    type: [[this._fb.array(this.mtsTypes)]],
    country: ['',Validators.required],
    language: ['',[Validators.required,Validators.pattern("^[A-Z]\{3}")]],
    genre:[''],
    alreadyChosenGenres:['']
    });

  
    constructor(
      private _fb: FormBuilder,
      private _router: Router,
      private _mtss:MovietvshowService,
      private _gs:GenreService,
      private _route: ActivatedRoute,
      private datePipe: DatePipe) {
        
      }

  ngOnInit(): void {
    this.addEditParam = this._route.snapshot.paramMap.get('p');
    this.addEditForm.controls['alreadyChosenGenres'].disable();
      if(this.addEditParam!=='add'){
        this.addEditForm.controls['type'].disable();
        this.fetchEntityAndFillForm(this.addEditParam);
      }
      this.fetchAllGenres();
      this.type?.valueChanges.subscribe(
        data=>{this.onTypeChosen();}
      )
      this.genre?.valueChanges.subscribe(
        data=>{this.addGenre();}
      )
      
  }
  displayGenre(obj:any){
    return obj ? obj.type : undefined;
  }

  fetchAllGenres(){
    this._gs.getAll().subscribe(
      data=>{
        this.genres = data;
      }
    )
  }
  fetchEntityAndFillForm(id:any){
    this._mtss.getById(id).subscribe(
      data=>{
        this.movietvshow = data;
        this.patchValues();
      },error=>{
        this.errorPage();
      }
    );
  }

  patchValues(){
    this.addEditForm.patchValue({
      name : this.movietvshow.name,
      description : this.movietvshow.description,
      storyline : this.movietvshow.storyline,
      lengthMinutes : this.movietvshow.lengthMinutes,
      releaseDate : this.datePipe.transform(this.movietvshow.releaseDate,"yyyy-MM-ddTHH:mm:ss.SSS"),
      releaseYear : this.movietvshow.releaseYear,
      country : this.movietvshow.country,
      language : this.movietvshow.language,
      type : this.movietvshow.type,
      alreadyChosenGenres : this.displayMTSGenres(this.movietvshow.genres)
    });
  }

  displayMTSGenres(mtsgenres:any): string{
    let result="";
    for(var gr of mtsgenres){
      result+=`${gr.type} `;
    }
    return result;
  }
  onTypeChosen(){
    if(this.mtsTypes.includes(this.type.value)){
      this.typeChosen=true;
    }else{
      this.typeChosen=false;
    }
  }

  addGenre(){
    if(this.genres.includes(this.genre?.value) && !this.chosenGenres.includes(this.genre?.value)){
      this.chosenGenres.push(this.genre?.value);
      this.alreadyChosenGenres?.setValue(`${this.alreadyChosenGenres?.value} ${this.genre?.value.type}`);
      this.genre?.setValue(null);
    }else if(this.chosenGenres.includes(this.genre?.value)){
      alert('Choosen genre is already added to current list!');
      this.genre?.setValue(null);
    }
  }
  clearGenres(){
    
    this.chosenGenres = [];
    this.alreadyChosenGenres?.setValue('');
    
    
  }
  submit(param:any){
    let name = this.name?.value;
    let description = this.description?.value;
    let storyline = this.storyline?.value;
    let lengthMinutes = this.lengthMinutes?.value;
    let releaseDate = this.releaseDate?.value;
    let releaseYear = this.releaseYear?.value;
    let country = this.country?.value;
    let language = this.language?.value;
    let type = this.type?.value;
    
    if(name!==null&&description!==null&&storyline!==null&&lengthMinutes!==null&&
      releaseDate!==null&&releaseYear!==null&&country!==null&&language!==null&&type!==null){
      if(param==='add'){
        let mts = new MovieTvShow(0,name,description,storyline,lengthMinutes,releaseDate,releaseYear,type,
          country,language, undefined,undefined,undefined,undefined,undefined,this.chosenGenres,undefined);
        this._mtss.add(mts).subscribe(
          data=>{
            alert("Successfully created!");
            this._router.navigate(['admin/moviestvshows']);
          },error=>{
            alert('Error while creating!');
          }
        );
      }else if(param==='edit'){
        let mts = new MovieTvShow(this.movietvshow.id,name,description,storyline,lengthMinutes,releaseDate,releaseYear,type,
          country,language);
        this._mtss.update(mts).subscribe(
          data=>{
            alert("Details successfully updated!");
            this.movietvshow = data;
            this.fetchEntityAndFillForm(this.movietvshow.id);
          },error=>{
            alert("Error while updating details!");
          }
        );
      }
    }else{
      alert('Some of the required fields are empty or something went wrong!');
    }
    
  }

  errorPage(){
    this._router.navigate(['error']);
  }

  get name() {
    return this.addEditForm.get('name');
  }
  get description() {
    return this.addEditForm.get('description');
  }
  get storyline() {
    return this.addEditForm.get('storyline');
  }
  get lengthMinutes() {
    return this.addEditForm.get('lengthMinutes');
  }
  get releaseDate() {
    return this.addEditForm.get('releaseDate');
  }
  get releaseYear() {
    return this.addEditForm.get('releaseYear');
  }
  get country() {
    return this.addEditForm.get('country');
  }
  get language() {
    return this.addEditForm.get('language');
  }
  get genre() {
    return this.addEditForm.get('genre');
  }
  get alreadyChosenGenres() {
    return this.addEditForm.get('alreadyChosenGenres');
  }
  get type() {
    return this.addEditForm.get('type') as FormArray;
  }
}
