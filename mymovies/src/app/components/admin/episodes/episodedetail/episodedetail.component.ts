import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Episode } from 'src/app/models/episodes';
import { MovieTvShow } from 'src/app/models/movietvshows';
import { Season } from 'src/app/models/seasons';
import { EpisodeService } from 'src/app/services/episode.service';
import { MovietvshowService } from 'src/app/services/movietvshow.service';
import { SeasonService } from 'src/app/services/season.service';

@Component({
  selector: 'app-episodedetail',
  templateUrl: './episodedetail.component.html',
  styleUrls: ['./episodedetail.component.css']
})
export class EpisodedetailComponent implements OnInit {

  addEditParam;
  episode:Episode;
  tvShowValid = false;
  seasonValid = false;
  episodeSNValid = false;
  tvShows:MovieTvShow[];
  seasons:Season[];
  episodesSN:number[]=[];
  addEditForm: FormGroup = this._fb.group({
    serialNumber: ['', Validators.required],
    name: ['', [Validators.required]],
    tvShow: [''],
    season: [''],
    newTvShow: [''],
    newSeason: ['']
  });


  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _ss: SeasonService,
    private _es: EpisodeService,
    private _mtss: MovietvshowService,
    private _route: ActivatedRoute) {

  }

  ngOnInit(): void {

    this.addEditParam = this._route.snapshot.paramMap.get('p');
    this.fetchAllTVShows();
    this.addEditForm.controls['serialNumber'].disable();
    if (this.addEditParam !== 'add') {
      this.fetchEntityAndFillForm(this.addEditParam);
      this.addEditForm.controls['tvShow'].disable();
      this.addEditForm.controls['season'].disable();
    }
    this.newTvShow.valueChanges.subscribe(
      data=>{
        if(data.id){
          this.tvShowValid = true;
          this.seasons = data.seasons;

        }
        else{
          this.tvShowValid =false;
          this.seasonValid =false;
          this.addEditForm.controls['serialNumber'].disable();
        }
        this.serialNumber.setValue('');
        this.newSeason.setValue('');
      }
    );

    this.newSeason.valueChanges.subscribe(
      data=>{
        let season = data;
        if(season.id){
          this.seasonValid = true;
          this.addEditForm.controls['serialNumber'].enable();
          this.episodesSN = [];
         
          season.episodes.forEach(element => {
            this.episodesSN.push(element.serialNumber); 
          });     
        }
        else{
          this.seasonValid =false;
          this.addEditForm.controls['serialNumber'].disable();
        }
        this.serialNumber.setValue('');
      }
    );

    this.serialNumber.valueChanges.subscribe(
      data=>{
        let sn = data;
        if(!this.episodesSN.includes(sn)){
          this.episodeSNValid = true;
        }else{
          this.episodeSNValid = false;
        }
      }
    )
  }

  fetchEntityAndFillForm(id: any) {
    this._es.getById(id).subscribe(
      data => {
        this.episode = data;
        this.patchValues();
      }, error => {
        console.log(error);
      }
    );
  }
  fetchAllTVShows(){
    this._mtss.getAllTVShows().subscribe(
      data=>{
        this.tvShows=data;
      },(error)=>{console.log(error);}
    );
  }
  patchValues(){
    this.addEditForm.patchValue({
      serialNumber: this.episode.serialNumber,
      name: this.episode.name,
      tvShow: this.episode.movieTvShow.name,
      season: this.episode.season.serialNumber
    });
  }
  displayTvShow(obj: any) {
    return obj ? obj.name : undefined;
  }
  displaySeason(obj: any) {
    return obj ? obj.serialNumber : undefined;
  }
  submit(param){
    let name = this.name.value;
    if(param==='edit'){
      if(!name || name===''){
        alert('Name of episode has to have valid value! ');
      }else{
        let ep = new Episode(this.episode.id,null,name);
        this._es.update(ep).subscribe(
          ()=>{
            this.fetchEntityAndFillForm(this.addEditParam);
            alert('Successfully updated!');
          },(error)=>{console.log(error);}
        );
      }
    }else if(param==='add'){
      let serialNumber = this.serialNumber.value;
      let tvShow = this.newTvShow.value;
      let season = this.newSeason.value;
      if(!serialNumber || !this.episodeSNValid || !name || name==='' || !tvShow || !season){
        alert('Some of the fields are not valid! ');
      }else{
        let ep = new Episode(null,serialNumber,name,tvShow,season);
        this._es.add(ep).subscribe(
          ()=>{
            alert('Successfully added new episode!');
            this._router.navigate(['admin/episodes']);
          },()=>{alert('Error while adding!');}
        )
      }
    }
  }

  get serialNumber() {
    return this.addEditForm.get('serialNumber');
  }
  get name() {
    return this.addEditForm.get('name');
  }
  get tvShow() {
    return this.addEditForm.get('tvShow');
  }
  get season() {
    return this.addEditForm.get('season');
  }
  get newTvShow() {
    return this.addEditForm.get('newTvShow');
  }
  get newSeason() {
    return this.addEditForm.get('newSeason');
  }

}
