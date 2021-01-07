import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieTvShow } from 'src/app/models/movietvshows';
import { GenreService } from 'src/app/services/genre.service';
import { MovietvshowService } from 'src/app/services/movietvshow.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { PersonMovieTvShow } from 'src/app/models/personmoviestvshows';
import { PersonmtsService } from 'src/app/services/personmts.service';
import { Person } from 'src/app/models/persons';
import { PersonService } from 'src/app/services/person.service';
import { error } from 'protractor';

@Component({
  selector: 'app-mtsdetail',
  templateUrl: './mtsdetail.component.html',
  styleUrls: ['./mtsdetail.component.css']
})
export class MtsdetailComponent implements OnInit {

  addEditParam: any;
  movietvshow: any;
  genres: any[] = [];
  persons: any[] = [];
  mtsTypes: string[] = ['MOVIE', 'TV_SHOW'];
  typeChosen = false;
  chosenGenres: any[] = [];
  chosenPersons: any[] = [];
  movietvshowPersonsID: any[] = [];
  fullCast: PersonMovieTvShow[] = [];

  addEditForm: FormGroup = this._fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    storyline: ['', Validators.required],
    lengthMinutes: ['', [Validators.required, Validators.pattern("^[1-9]\{1,4}")]],
    releaseDate: ['', Validators.required],
    releaseYear: ['', [Validators.required, Validators.pattern("^[0-9]\{4}")]],
    type: [[this._fb.array(this.mtsTypes)]],
    country: ['', Validators.required],
    language: ['', [Validators.required, Validators.pattern("^[A-Z]\{3}")]],
    genre: [''],
    alreadyChosenGenres: [''],
    person: [''],
    alreadyChosenPersons: ['']

  });


  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _mtss: MovietvshowService,
    private _pmtss: PersonmtsService,
    private _gs: GenreService,
    private _ps: PersonService,
    private _route: ActivatedRoute,
    private datePipe: DatePipe) {

  }



  ngOnInit(): void {
    this.addEditParam = this._route.snapshot.paramMap.get('p');
    this.addEditForm.controls['alreadyChosenGenres'].disable();
    if (this.addEditParam !== 'add') {
      this.addEditForm.controls['type'].disable();
      this.addEditForm.controls['alreadyChosenPersons'].disable();
      this.fetchEntityAndFillForm(this.addEditParam);

    }
    this.fetchAllGenres();
    this.type?.valueChanges.subscribe(
      () => { this.onTypeChosen(); }
    )
    this.genre?.valueChanges.subscribe(
      () => { this.addGenre(); }
    )


  }
  displayGenre(obj: any) {
    return obj ? obj.type : undefined;
  }

  displayPerson(obj: any) {
    return obj ? `${obj.firstName} ${obj.lastName}` : undefined;
  }

  fetchAllGenres() {
    this._gs.getAll().subscribe(
      data => {
        this.genres = data;
      }
    )
  }
  fetchAllAvailablePersons() {
    this._ps.getAllNotInMTS(this.addEditParam).subscribe(
      data => {
        this.persons = data;
        console.log(this.persons);
      }
    );
  }
  castNameEdit = false;
  actorRoleEdit = false;
  directorEdit = false;
  composerEdit = false;
  actorEdit = false;
  writerEdit = false;
  selectedPmtsId;
  editedPersonIndex;
  personEditForm: FormGroup = this._fb.group({
    personCastName: [''],
    personActorRole: [''],
    personDirector: [''],
    personComposer: [''],
    personActor: [''],
    personWriter: [''],
    newPersonFirstLast: [''],
    newPersonCastName: ['', Validators.required],
    newPersonActorRole: [''],
    newPersonComposer: [''],
    newPersonDirector: [''],
    newPersonActor: [''],
    newPersonWriter: [''],
  });
  fillPersonEditFormValues(pmts) {
    this.personEditForm.patchValue({
      personCastName: pmts.castName,
      personActorRole: pmts.actorRole,
      personActor: pmts.actor,
      personWriter: pmts.writer,
      personDirector: pmts.director,
      personComposer: pmts.composer
    });
  }
  previousSelectedId;
  editPerson(param: string, pmts) {
    //this.addCastChosen=false;
    this.selectedPmtsId = pmts?.id;
    this.editedPersonIndex = this.movietvshow?.persons.indexOf(pmts);
    if (this.selectedPmtsId) {
      if (this.selectedPmtsId !== this.previousSelectedId) {
        this.fillPersonEditFormValues(pmts);
      }
      this.previousSelectedId = this.selectedPmtsId ? this.selectedPmtsId : undefined; //current selected becomes the previous

      if (param === 'castNameEdit' && !this.castNameEdit) {
        this.castNameEdit = true;
      } else if (param === 'castNameEdit' && this.castNameEdit) {
        this.castNameEdit = false;
      } else if (param === 'actorRoleEdit' && !this.actorRoleEdit) {
        this.actorRoleEdit = true;
      } else if (param === 'actorRoleEdit' && this.actorRoleEdit) {
        this.actorRoleEdit = false;
      } else if (param === 'directorEdit' && !this.directorEdit) {
        this.directorEdit = true;
      } else if (param === 'directorEdit' && this.directorEdit) {
        this.directorEdit = false;
      } else if (param === 'composerEdit' && !this.composerEdit) {
        this.composerEdit = true;
      } else if (param === 'composerEdit' && this.composerEdit) {
        this.composerEdit = false;
      } else if (param === 'actorEdit' && !this.actorEdit) {
        this.actorEdit = true;
      } else if (param === 'actorEdit' && this.actorEdit) {
        this.actorEdit = false;
      } else if (param === 'writerEdit' && !this.writerEdit) {
        this.writerEdit = true;
      } else if (param === 'writerEdit' && this.writerEdit) {
        this.writerEdit = false;
      }
    }

  }

  resetPersonFields(pmts) {
    this.castNameEdit = false;
    this.actorRoleEdit = false;
    this.directorEdit = false;
    this.composerEdit = false;
    this.actorEdit = false;
    this.writerEdit = false;
    this.fillPersonEditFormValues(pmts);
  }

  personMTSupdate(obj) {

    let objPositionIndexOf = this.movietvshow?.persons.indexOf(obj);
    if (!this.personCastName.value && !this.personActorRole.value && !this.personDirector.value && !this.personComposer.value && !this.personActor.value && !this.personWriter.value) {
      alert('Please edit at least one field!');
    } else if (objPositionIndexOf !== this.editedPersonIndex) {
      alert('Error, you chose a wrong person!');
    } else {
      let castName = this.personCastName.value ? this.personCastName.value : obj.castName;
      let actorRole = this.personActorRole.value ? this.personActorRole.value : obj.actorRole;
      let director = this.personDirector.value ? this.personDirector.value : obj.director;
      let composer = this.personComposer.value ? this.personComposer.value : obj.composer;
      let actor = this.personActor.value ? this.personActor.value : obj.actor;
      let writer = this.personWriter.value ? this.personWriter.value : obj.writer;
      if (actorRole === 'SUPPORTING')
        actorRole = 1;
      else if (actorRole === 'LEADING')
        actorRole = 0;
      let pmts: PersonMovieTvShow = new PersonMovieTvShow(obj.id, castName, director, writer, actor, composer, actorRole, obj.movieTvShow, obj.person);
      this._pmtss.update(pmts).subscribe(() => {
        this.fetchEntityAndFillForm(this.addEditParam);
        this.fetchAllGenres();
        this.resetPersonFields(pmts);
        alert('Successfully updated!');
      }, error => { console.log(error) });
    }
  }

  personDetails(pid) {
    this._router.navigate([`admin/person-detail/${pid}`]);
  }
  fetchEntityAndFillForm(id: any) {
    this._mtss.getById(id).subscribe(
      data => {
        this.movietvshow = data;
        this.fetchAllAvailablePersons();
        this.patchValues();

      }, error => {
        console.log(error);
      }
    );
  }

  patchValues() {
    this.addEditForm.patchValue({
      name: this.movietvshow.name,
      description: this.movietvshow.description,
      storyline: this.movietvshow.storyline,
      lengthMinutes: this.movietvshow.lengthMinutes,
      releaseDate: this.datePipe.transform(this.movietvshow.releaseDate, "yyyy-MM-ddTHH:mm:ss.SSS"),
      releaseYear: this.movietvshow.releaseYear,
      country: this.movietvshow.country,
      language: this.movietvshow.language,
      type: this.movietvshow.type,
      alreadyChosenGenres: this.displayMTSGenres(this.movietvshow?.genres),
      alreadyChosenPersons: this.displayMTSPersons(this.movietvshow?.persons)
    });

    for (let pmts of this.movietvshow?.persons) {
      this.fillPersonEditFormValues(pmts);
    }
  }

  displayMTSGenres(mtsgenres: any): string {
    let result = "";
    for (var gr of mtsgenres) {
      result += `${gr.type} `;
    }
    return result;
  }
  displayMTSPersons(mtspersons: any): string {
    let result = "";
    for (let mtsp of mtspersons) {
      result += `${mtsp.person.firstName} ${mtsp.person.lastName}, `;
    }
    try {
      result = result.substring(0, result.length - 2);
    } catch (error) { console.log(error) };

    return result;
  }
  onTypeChosen() {
    if (this.mtsTypes.includes(this.type.value)) {
      this.typeChosen = true;
    } else {
      this.typeChosen = false;
    }
  }


  addGenre() {
    if (this.genres.includes(this.genre?.value) && !this.chosenGenres.includes(this.genre?.value)) {
      this.chosenGenres.push(this.genre?.value);
      this.alreadyChosenGenres?.setValue(`${this.alreadyChosenGenres?.value} ${this.genre?.value.type}`);
      this.genre?.setValue(null);
    } else if (this.chosenGenres.includes(this.genre?.value)) {
      alert('Choosen genre is already added to current list!');
      this.genre?.setValue(null);
    }
  }
  addCastChosen = false;
  addCast() {
    if (!this.addCastChosen) {
      this.addCastChosen = true;
    } else if (this.addCastChosen) {
      this.addCastChosen = false;
    }

  }
  clearGenres() {
    this.chosenGenres = [];
    this.alreadyChosenGenres?.setValue('');
  }
  clearPersons() {
    this.chosenPersons = [];
    this.alreadyChosenPersons?.setValue('');
  }



  submit(param: any) {
    if (param === 'addNewCast') {
      //adding new cast
      if (this.newPersonWriter?.value === '' || this.newPersonCastName?.value === '' || this.newPersonActor?.value === '' ||
        (this.newPersonActor?.value !== '' && this.newPersonActorRole?.value === '')
        || this.newPersonDirector?.value === '' || this.newPersonActorRole?.value === '' || this.newPersonComposer?.value === ''
        || !this.newPersonFirstLast) {
        alert('All fields must be filled in!');
      } else {
        let castName = this.newPersonCastName.value;
        let actorRole = this.newPersonActorRole.value;
        let director = this.newPersonDirector.value;
        let composer = this.newPersonComposer.value;
        let actor = this.newPersonActor.value;
        let writer = this.newPersonWriter.value;
        let person = this.newPersonFirstLast.value;

        let pmts: PersonMovieTvShow =
          new PersonMovieTvShow(0, castName, director, writer, actor, composer, actorRole, this.movietvshow, person);
        this._pmtss.add(pmts).subscribe((data) => {
          let pmtsRes = data;
          this.fetchEntityAndFillForm(this.addEditParam);
          this.fetchAllGenres();
          //this.resetPersonFields(pmtsRes);
          this.newPersonCastName.reset();
          this.newPersonActorRole.reset();
          this.newPersonDirector.reset();
          this.newPersonComposer.reset();
          this.newPersonActor.reset();
          this.newPersonWriter.reset();
          this.newPersonFirstLast.reset();
          
          alert('Successfully added relation!');
        }, (error) => alert('Unable to create data!'));
      }

    } else {
      let name = this.name?.value;
      let description = this.description?.value;
      let storyline = this.storyline?.value;
      let lengthMinutes = this.lengthMinutes?.value;
      let releaseDate = this.releaseDate?.value;
      let releaseYear = this.releaseYear?.value;
      let country = this.country?.value;
      let language = this.language?.value;
      let type = this.type?.value;

      if (name !== null && description !== null && storyline !== null && lengthMinutes !== null &&
        releaseDate !== null && releaseYear !== null && country !== null && language !== null && type !== null) {
        if (param === 'add') {
          let mts = new MovieTvShow(0, name, description, storyline, lengthMinutes, releaseDate, releaseYear, type,
            country, language, undefined, undefined, undefined, undefined, undefined, this.chosenGenres, undefined);
          this._mtss.add(mts).subscribe(
            data => {
              alert("Successfully created!");
              this._router.navigate(['admin/moviestvshows']);
            }, error => {
              alert('Error while creating!');
            }
          );
        } else if (param === 'edit') {
          let mts = new MovieTvShow(this.movietvshow.id, name, description, storyline, lengthMinutes, releaseDate, releaseYear, type,
            country, language);
          this._mtss.update(mts).subscribe(
            data => {
              alert("Details successfully updated!");
              this.movietvshow = data;
              this.fetchEntityAndFillForm(this.movietvshow.id);
            }, error => {
              alert("Error while updating details!");
            }
          );
        }
      } else {
        alert('Some of the required fields are empty or something went wrong!');
      }
    }


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
  get person() {
    return this.addEditForm.get('person');
  }
  get alreadyChosenPersons() {
    return this.addEditForm.get('alreadyChosenPersons');
  }
  get type() {
    return this.addEditForm.get('type') as FormArray;
  }


  get personCastName() {
    return this.personEditForm.get('personCastName');
  }
  get personActorRole() {
    return this.personEditForm.get('personActorRole');
  }
  get personDirector() {
    return this.personEditForm.get('personDirector');
  }
  get personComposer() {
    return this.personEditForm.get('personComposer');
  }
  get personActor() {
    return this.personEditForm.get('personActor');
  }
  get personWriter() {
    return this.personEditForm.get('personWriter');
  }
  get newPersonFirstLast() {
    return this.personEditForm.get('newPersonFirstLast');
  }
  get newPersonActorRole() {
    return this.personEditForm.get('newPersonActorRole');
  }
  get newPersonCastName() {
    return this.personEditForm.get('newPersonCastName');
  }
  get newPersonDirector() {
    return this.personEditForm.get('newPersonDirector');
  }
  get newPersonComposer() {
    return this.personEditForm.get('newPersonComposer');
  }
  get newPersonActor() {
    return this.personEditForm.get('newPersonActor');
  }
  get newPersonWriter() {
    return this.personEditForm.get('newPersonWriter');
  }
}
