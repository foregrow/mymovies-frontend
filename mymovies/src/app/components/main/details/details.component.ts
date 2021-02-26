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
          this.getUsersRating();
        }
      },
      error => { console.error(error); }
    );
  }

  getUsersRating() {
    this.dataDetails.users.filter(usermts => {
      if (usermts.user.email === this._us.getEmailFromToken()) {
        this.currentUserRating = usermts.userRating;
        this.calculateUserRatingAndDif(this.currentUserRating);
      }
    });
    if(this.currentUserRating===0){
      for (let i = 0; i < 5; i++)
        this.usermtsRatingsDif.push(i);
    }
  }
  ratings(i,param){
    let star = i+1;
    console.log("clicked star:"+star,"param:"+param,"current rating:"+this.currentUserRating);
    
    if(param==='dark'){
      star += this.currentUserRating;
    }
    this._umtss.newUserRating(this._us.getEmailFromToken(),this.dataDetails.id,star).subscribe(
      data=>{console.log(data);}
    );
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
  clickedSeason(sserialNumber) {
    let seasonArray = this.dataDetails.seasons.filter(season => {
      return season.serialNumber === sserialNumber;
    });
    if (seasonArray) {
      this.seasonChosen = true;
      this.seasonEpisodes = seasonArray[0].episodes;
      console.log(this.seasonEpisodes);
    }
    else {
      this.seasonEpisodes;
      this.seasonChosen = false;
    }

  }

  personDetails(personid) {
    this._router.navigate([`person-details/${personid}`]);
  }
  errorPage() {
    this._router.navigate(['error']);
  }


}




