import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MovietvshowService } from 'src/app/services/movietvshow.service';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-details-persons',
  templateUrl: './details-persons.component.html',
  styleUrls: ['./details-persons.component.css']
})
export class DetailsPersonsComponent implements OnInit {
  photoSrcs:string[]=[
    "../../../../assets/p3.png","../../../../assets/p4.png","../../../../assets/p5.png",
    "../../../../assets/p2.png"
  ];
  customOptions: OwlOptions = {
    loop:true,
    nav:true,
    center:true,
    navText: [
        "<i class='fa fa-caret-left'></i>",
        "<i class='fa fa-caret-right'></i>"
    ],
    dots:true,
    // autoplay: true,
    // autoplayHoverPause: true,
    responsive:{

        0:{
            items:1,
            stagePadding:150
        },
        
    }
  }
  addEditIdParam;
  dataDetails;
  constructor(private _route:ActivatedRoute,
    private _router:Router,
    private _mtss:MovietvshowService,
    private _ps:PersonService) { }

    ngOnInit(): void {
      this.addEditIdParam = this._route.snapshot.paramMap.get('id');
      this.getData();
    }
  
    getData(){
      this._ps.getById(this.addEditIdParam).subscribe(
        data=>{this.dataDetails=data,console.log(this.dataDetails)},
        error=>{console.error(error);}
      );
    }


    mtsDetails(mtsid){
    this._router.navigate([`movie-details/${mtsid}`]);
  }

}
