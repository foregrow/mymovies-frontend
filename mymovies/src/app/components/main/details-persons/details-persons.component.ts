import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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
  customOptions: any = {
    loop: true,
    margin: 10,
    // autoplay:true,
    // responsiveClass: true,
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
  constructor(private _route:ActivatedRoute,
    private _router:Router,
    private _mtss:MovietvshowService,
    private _ps:PersonService,
    private _sanitizer: DomSanitizer) { }

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
