import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieTvShow } from 'src/app/models/movietvshows';
import { Season } from 'src/app/models/seasons';
import { EpisodeService } from 'src/app/services/episode.service';
import { MovietvshowService } from 'src/app/services/movietvshow.service';
import { SeasonService } from 'src/app/services/season.service';

@Component({
  selector: 'app-seasondetail',
  templateUrl: './seasondetail.component.html',
  styleUrls: ['./seasondetail.component.css']
})
export class SeasondetailComponent implements OnInit {

  addEditParam;
  season:Season;
  tvShowValid = false;
  tvShows:MovieTvShow[];
  addEditForm: FormGroup = this._fb.group({
    serialNumber: ['', Validators.required],
    releaseYear: ['', [Validators.required, Validators.pattern("^[0-9]\{4}")]],
    tvShow: [''],
    newTvShow: ['']
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
    if (this.addEditParam !== 'add') {
      this.fetchEntityAndFillForm(this.addEditParam);
      this.addEditForm.controls['tvShow'].disable();
    }
    this.newTvShow.valueChanges.subscribe(
      data=>{
        if(data.id)
          this.tvShowValid = true;
        else
          this.tvShowValid =false;
      }
    )
  }

  fetchAllTVShows(){
    this._mtss.getAllTVShows().subscribe(
      data=>{
        this.tvShows=data;
      },(error)=>{console.log(error);}
    );
  }
  fetchEntityAndFillForm(id: any) {
    this._ss.getById(id).subscribe(
      data => {
        this.season = data;
        this.patchValues();
      }, error => {
        console.log(error);
      }
    );
  }

  patchValues(){
    this.addEditForm.patchValue({
      serialNumber: this.season.serialNumber,
      tvShow: this.season.movieTvShow.name,
      releaseYear: this.season.releaseYear
    });
  }

  displayTvShow(obj: any) {
    return obj ? obj.name : undefined;
  }

  submit(param){
    let serialNumber=this.serialNumber.value;
    let releaseYear=this.releaseYear.value;
    if(param==='edit'){
      if(!serialNumber || !releaseYear){
        alert('One of the required fields is not valid!');
      }
      else{
        let season = new Season(this.season.id,serialNumber,releaseYear);
        this._ss.update(season).subscribe(
          ()=>{
            this.fetchEntityAndFillForm(this.addEditParam);
            alert('Successfully updated!');
          },()=>{alert('Error while updating!');}
        );
      }
    }else if(param==='add'){
      let tvShow = this.newTvShow.value;
      if(this.tvShowValid && serialNumber && releaseYear){
        let season = new Season(0,serialNumber,releaseYear,tvShow);
        this._ss.add(season).subscribe(
          ()=>{
            alert('Successfully added new season!');
            this._router.navigate(['admin/seasons']);
          },()=>{alert('Error while adding!');}
        );
      }
    }
    
    
  }
  episodeDetails(id){
    this._router.navigate([`admin/episode-detail/${id}`]);
  }

  deleteEpisode(episode){
    let index = this.season.episodes.indexOf(episode);

    this._es.delete(episode.id)
      .subscribe(
        () => {
            this.season.episodes.splice(index,1);
            alert('Successfully deleted!')
        },
        ()=>{ alert('Error while deleting!');}
      ); 
  }
  get serialNumber() {
    return this.addEditForm.get('serialNumber');
  }
  get releaseYear() {
    return this.addEditForm.get('releaseYear');
  }
  get tvShow() {
    return this.addEditForm.get('tvShow');
  }
  get newTvShow() {
    return this.addEditForm.get('newTvShow');
  }
  
}
