import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/search/user.service';
import { UserInfoService } from 'src/app/services/user/user.service';
import { MenuItem } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { SearchComponent } from '../search/search.component';
import { StatusService } from 'src/app/services/error/status.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @ViewChild('paginator', { static: false })
  paginator!: Paginator;
  searchQuery: string = "";
  page: number = 1;
  totalUserResults: number = 0;
  userResults: any[] = [];
  sortKey: string = "Best match";
  sortType: string = "";
  orderType: string = "desc"
  sortItems: MenuItem[] = [];
  loading: boolean = true;
  errMsg: string = "";
  skeleton: number[] = [1, 2, 3, 4, 5]
  constructor(
    private _userSearchService: UserService,
    private _userInfoService: UserInfoService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private _errorHandel: StatusService
  ) {
    // get query params values
    this.activeRoute.queryParams
      .subscribe(params => {
        if (params.length == 1) {
          this.paginator.first = 0;
          this.page = 1;
          this.sortKey = "Best match";
          this.sortType = "";
          this.orderType = "desc";
        }
        this.searchQuery = params.q;
        this.getUserResults();
      }
      );
  }

  ngOnInit(): void {

    this.sortItems = [
      /* init sort type links in sliding menu
     command used to add function to be done on click
     */
      {
        label: "Sort options"
      },
      {
        label: "Best match",
        icon: "pi pi-check",
        command: (() => { this.sortingResults("Best match", "", "desc") })
      },
      {
        label: "Most followers",
        command: (() => { this.sortingResults("Most followers", "followers", "desc") })
      },
      {
        label: "Fewest followers",
        command: (() => { this.sortingResults("Fewest followers", "followers", "asc") })
      },
      {
        label: "Most recentaly joined",
        command: (() => { this.sortingResults("Most recentaly joined", "joined", "desc") })
      }, {
        label: "Fewest recentaly joined",
        icon: this.sortKey == "Fewest recentaly joined" ? "pi pi-check" : "",
        command: (() => { this.sortingResults("Fewest recentaly joined", "joined", "asc") })
      }, {
        label: "Most repositories",
        icon: this.sortKey == "Most repositories" ? "pi pi-check" : "",
        command: (() => { this.sortingResults("Most repositories", "repositories", "desc") })
      }, {
        label: "Fewest repositories",
        icon: this.sortKey == "Fewest repositories" ? "pi pi-check" : "",
        command: (() => { this.sortingResults("Fewest repositories", "repositories", "asc") })
      }
    ];
  }

  /*get searched users from server using
    q = search query,
    page =number of page as each page has 10 result,
    sort = sorting user according to their type (followers,joined,repos),
    order = used with sorting to declare type of order (descending or ascending)
  */
  getUserResults() {
    this.userResults = [];
    this.loading = true;
    this._userSearchService.getUsers(this.searchQuery, this.page, this.sortType, this.orderType).subscribe(
      (res) => {
        // get total number of searched user in server
        this.totalUserResults = res.total_count;
        // for each returned result get user info using login name
        res.items.forEach((item: any) => {
          this.getUserInfo(item.login);
        });
        this.loading = false;
      }, (err) => {
        this.errMsg = this._errorHandel.errorHandel(err.status);
      }
    )
  }

  //get user info from server using login name
  getUserInfo(userName: string) {
    this._userInfoService.getUserInfo(userName).subscribe(
      (res) => {
        this.userResults.push(res);
      }, (err) => {
        this.errMsg = this._errorHandel.errorHandel(err.status);
      }
    )
  }

  // event listener for changing page number
  paginate(event: any) {
    //event.page = Index of the new page hint:it start from 0
    this.page = event.page + 1;
    this.updateUrlParams("page");
  }

  // take sort type from slide menu
  sortingResults(key: string, type: string, order: string) {
    this.sortKey = key;
    this.sortType = type;
    this.orderType = order;
    // this method fire onPageChange event so paginate function work
    this.paginator.changePage(0);
    this.updateUrlParams("sort");
    this.highlightType();
  }

  // add check beside sort type choosen
  highlightType() {
    this.sortItems.forEach((item) => {
      item.icon = "";
      if (this.sortKey == item.label) {
        item.icon = "pi pi-check";
      }
    });
  }
  //function takes name of the param to be updated
  updateUrlParams(paramType: string) {
    let params;
    // check updated param name to update list of params
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
          page: this.page,
          s: this.sortType,
          o: this.orderType
        }
        break;
    }

    // update url without reloading the page
    this.router.navigate(
      [],
      {
        relativeTo: this.activeRoute,
        queryParams: params,
        queryParamsHandling: 'merge'
      });

  }

}
