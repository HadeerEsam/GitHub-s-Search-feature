import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/search/user.service';
import { UserInfoService } from 'src/app/services/user/user.service';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  searchQuery: string = "";
  page: number = 1;
  totalUserResults: number = 0;
  userResults: any[] = [];
  sortKey:string="Best match";
  sortType: string = "";
  orderType: string = "desc"
  sortItems: MenuItem[] = [];
  loading: boolean = true;

  constructor(
    private _userSearchService: UserService,
    private _userInfoService: UserInfoService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    // get query params values
    this.activeRoute.queryParams
      .subscribe(params => {
        this.searchQuery = params.q;
        console.log(this.searchQuery); // user name
      }
      );
  }

  ngOnInit(): void {
    this.getUserResults();
    this.sortItems=[
      {
        label: "Sort options"
      },
      {
        label: "Best match",
        
        command:(()=>{
          this.sortItems[1].icon="pi pi-check";
          this.sortingResults("Best match","","desc")})
      },
      {
        label: "Most followers",
        // icon: this.sortKey == "Most followers" ? "pi pi-check" : "",
        command:(()=>{
          this.sortItems[2].icon="pi pi-check";

          this.sortingResults("Most followers","followers","desc")})
  
      },
      {
        label: "Fewest followers",
        icon: this.sortKey == "Fewest followers" ? "pi pi-check" : "",
        command:(()=>{this.sortingResults("Fewest followers","followers","asc")})
  
      },
      {
        label: "Most recentaly joined",
        icon: this.sortKey == "Most recentaly joined" ? "pi pi-check" : "",
        command:(()=>{this.sortingResults("Most recentaly joined","joined","desc")})
  
      }, {
        label: "Fewest recentaly joined",
        icon: this.sortKey == "Fewest recentaly joined" ? "pi pi-check" : "",
        command:(()=>{this.sortingResults("Fewest recentaly joined","joined","asc")})
  
      }, {
        label: "Most repositories",
        icon: this.sortKey == "Most repositories" ? "pi pi-check" : "",
        command:(()=>{this.sortingResults("Most repositories","repositories","desc")})
  
      }, {
        label: "Fewest repositories",
        icon: this.sortKey == "Fewest repositories" ? "pi pi-check" : "",
        command:(()=>{this.sortingResults("Fewest repositories","repositories","asc")})
  
      }
    ];
  }

  getUserResults() {
    this._userSearchService.getUsers(this.searchQuery, this.page,this.sortType,this.orderType).subscribe(
      (res) => {
        this.totalUserResults = res.total_count;
        res.items.forEach((item: any) => {
          this.getUserInfo(item.login);
        });
        this.loading = false;
      }
    )

  }
  getUserInfo(userName: string) {
    this._userInfoService.getUserInfo(userName).subscribe(
      (res) => {
        this.userResults.push(res);
      }
    )
  }
  paginate(event: any) {
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page hint:it start from 0
    //event.pageCount = Total number of pages
    this.page = event.page + 1;
    this.userResults = [];
    this.loading = true;
    this.getUserResults();
    this.updateUrlParams("page");
  }
  sortingResults(key:string,type:string,order:string){
    this.userResults = [];
    this.loading = true;
    this.sortKey=key;
    this.sortType=type;
    this.orderType=order;
    this.page=1;
    this.getUserResults();
    this.updateUrlParams("sort")
    
  }
  updateUrlParams(paramType: string) {
    let params;
    switch (paramType) {
      case "q":
        params = {
          q: this.searchQuery,
          page: 1
        }
        break;
      case "page":
        params = {
          page: this.page,
        }
        break;
      case "sort":
        params = {
          page: 1,
          s: this.sortType,
          o: this.orderType
        }
        break;
    }

    this.router.navigate(
      [],
      {
        relativeTo: this.activeRoute,
        queryParams: params,
        queryParamsHandling: 'merge'
      });

  }
}
