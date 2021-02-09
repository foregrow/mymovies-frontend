import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovietvshowService } from 'src/app/services/movietvshow.service';
import { PersonService } from 'src/app/services/person.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  photoSrcs:string[]=[
    "../../../../assets/p3.png","../../../../assets/p4.png","../../../../assets/p5.png",
    "../../../../assets/p2.png"
  ];
  customOptions: OwlOptions = {stagePadding: 200,
    loop:true,
    margin:0,
    nav:true,
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
            stagePadding: 0
        },
        
    }
  }
  addEditIdParam;
  typeParam;
  dataDetails;
  constructor(private _route:ActivatedRoute,
    private _router:Router,
    private _ps:PersonService,
    private _mtss:MovietvshowService) { }

  ngOnInit(): void {
    this.addEditIdParam = this._route.snapshot.paramMap.get('id');
    this.typeParam = this._route.snapshot.paramMap.get('p');
    if(this.typeParam!=='person'&&this.typeParam!=='mts')
      this.errorPage();
    else
      this.getData();

    
  }

  getData(){
    if(this.typeParam==='person'){
      this._ps.getById(this.addEditIdParam).subscribe(
        data=>{this.dataDetails=data,console.log(this.dataDetails)},
        error=>{console.error(error);}
      );
    }
    else if(this.typeParam==='mts'){
      this._mtss.getById(this.addEditIdParam).subscribe(
        data=>{this.dataDetails=data,console.log(this.dataDetails)},
        error=>{console.error(error);}
      );
    }
    
  }
  errorPage(){
    this._router.navigate(['error']);
  }


}




