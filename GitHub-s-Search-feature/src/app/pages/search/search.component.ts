import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
 searchQuery:string="";
  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  // nav to user page results from search taking search key as a param
  navToFoundUsers(){
    if(this.searchQuery!=""){
     this.router.navigate(["/search/user"],{queryParams:{q:this.searchQuery}});
    }
  }

}
