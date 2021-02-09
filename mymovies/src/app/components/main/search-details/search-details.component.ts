import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-details',
  templateUrl: './search-details.component.html',
  styleUrls: ['./search-details.component.css']
})
export class SearchDetailsComponent implements OnInit {

  // @Input('searchValue') searchValue: String;
  // @Output() isSearched = new EventEmitter<boolean>();
  constructor() { 
  }

  ngOnInit(): void {
    
  }

}
