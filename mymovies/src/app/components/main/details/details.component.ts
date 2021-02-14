import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovietvshowService } from 'src/app/services/movietvshow.service';
import { PersonService } from 'src/app/services/person.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  // retrievedImage;
  // photoSrcs:string[]=[
  //   "../../../../assets/p3.png","../../../../assets/p4.png","../../../../assets/p5.png",
  //   "../../../../assets/p2.png"
  // ];
  customOptions: any = {
    loop: true,
    margin: 10,
    autoplay:true,
    responsiveClass: true,
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
  constructor(private _route:ActivatedRoute,
    private _router:Router,
    private _ps:PersonService,
    private _mtss:MovietvshowService,
    private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.addEditIdParam = this._route.snapshot.paramMap.get('id');
    this.getData();
    
  }

  getData(){
    this._mtss.getById(this.addEditIdParam).subscribe(
      data=>{this.dataDetails=data,
        console.log(this.dataDetails)
      },
      error=>{console.error(error);}
    );
    // if(this.typeParam==='person'){
    //   this._ps.getById(this.addEditIdParam).subscribe(
    //     data=>{this.dataDetails=data,console.log(this.dataDetails)},
    //     error=>{console.error(error);}
    //   );
    // }
  }

  personDetails(personid){
    this._router.navigate([`person-details/${personid}`]);
  }
  errorPage(){
    this._router.navigate(['error']);
  }


}




