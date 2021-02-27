import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovietvshowService } from 'src/app/services/movietvshow.service';
import { PersonService } from 'src/app/services/person.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UserMovieTvShow } from 'src/app/models/usermoviestvshows';
import { UserService } from 'src/app/services/user.service';
import { UsermtsService } from 'src/app/services/usermts.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  usermtsRatings: number[] = [];
  currentUserRating = 0;
  usermtsRatingsDif: number[] = [];
  customOptions: any = {
    loop: true,
    margin: 10,
    autoHeight: true,
    navText: ["<i class='fa fa-caret-left'></i>",
      "<i class='fa fa-caret-right'></i>"],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }
  addEditIdParam;
  typeParam;
  dataDetails;
  inWatchlater = false;
  inWatchlist = false;
  usermts;
  urlCache = new Map<string, SafeResourceUrl>();
  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _us: UserService,
    private _mtss: MovietvshowService,
    private _umtss: UsermtsService,
    private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.addEditIdParam = this._route.snapshot.paramMap.get('id');
    this.getData();
    
  }

  getIframeYouTubeUrl(videoId: string): SafeResourceUrl {
    let url = this.urlCache.get(videoId);
    if (!url) {
      url = this._sanitizer.bypassSecurityTrustResourceUrl(
        "https://www.youtube.com/embed/" + videoId + "?enablejsapi=1");;
      this.urlCache.set(videoId, url);
    }
    return url;
  }
  

  getData() {
    this._mtss.getById(this.addEditIdParam).subscribe(
      data => {
        this.dataDetails = data;
        console.log(this.dataDetails);
        if (this._router.url.startsWith('/movie-details')) {
          this.getUsersRatingAndWL();
        }
      },
      error => { console.error(error); }
    );
  }
  
  getUsersRatingAndWL() {
    this.dataDetails.users.filter(usermts => {
      if (usermts.user.email === this._us.getEmailFromToken()) {
        this.currentUserRating = usermts.userRating;
        this.calculateUserRatingAndDif(this.currentUserRating);
        if(usermts.watchLater)
          this.inWatchlater = true;
        if(usermts.watchlist)
          this.inWatchlist = true;
        
      }
    });
    if(this.currentUserRating===0){
      for (let i = 0; i < 5; i++)
        this.usermtsRatingsDif.push(i);
    }
  }
  updateDetails(star,param,wlParam){
    this._umtss.updateDetails(this._us.getEmailFromToken(),this.dataDetails.id,star,param,wlParam).subscribe(
      data=>{
        this.usermtsRatings = [];
        this.usermtsRatingsDif = [];
        this.getData(); 
        console.log(param)  
      }
    );
  }
  ratings(i,dOrlParam,param){
    let star = i+1; 
    if(dOrlParam==='dark'){
      star += this.currentUserRating;
      this.updateDetails(star,param,false);
    }else if(dOrlParam==='light' && this.currentUserRating !== star){
      this.updateDetails(star,param,false);
    }
  }
  addOrRemoveWL(param,wlParam){
    if(param==='watchlist'){
      if(wlParam)
        this.inWatchlist = true;
      else
        this.inWatchlist = false
    }else if(param==='watchlater'){
      if(wlParam)
        this.inWatchlater = true;
      else
        this.inWatchlater = false
    }
    this.updateDetails(-1,param,wlParam);
  }
  calculateUserRatingAndDif(userRating) {
    let maxStars = 5; 
    let ratingDif = maxStars - userRating;
      if (userRating > 0) {
        for (let i = 0; i < userRating; i++)
          this.usermtsRatings.push(i);
      }
      if (ratingDif > 0) {
        for (let i = 0; i < ratingDif; i++)
          this.usermtsRatingsDif.push(i);
      }

  }

  seasonEpisodes;
  seasonChosen = false;
  lastClickedSeasonSN = -1;
  clickedSeason(sserialNumber) {
    
    if(this.lastClickedSeasonSN === sserialNumber){
      this.seasonEpisodes;
      this.seasonChosen = false;
      this.lastClickedSeasonSN = -1;
    }else{
      let seasonArray = this.dataDetails.seasons.filter(season => {
        return season.serialNumber === sserialNumber;
      });
      if (seasonArray) {
        this.seasonChosen = true;
        this.seasonEpisodes = seasonArray[0].episodes;
        this.lastClickedSeasonSN = sserialNumber;
      }
      else {
        this.seasonEpisodes;
        this.seasonChosen = false;
        this.lastClickedSeasonSN = -1;

      }
      
    }
    //this.lastClickedSeasonSN = sserialNumber;

  }

  personDetails(personid) {
    this._router.navigate([`person-details/${personid}`]);
  }
  errorPage() {
    this._router.navigate(['error']);
  }


}




