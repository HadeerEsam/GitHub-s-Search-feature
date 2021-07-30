import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 API_url="https://api.github.com";
  constructor(
    private http:HttpClient
  ) { }

  getUsers(query:string, page?:number,sort?:string,order?:string):Observable <any>{
   return this.http.get(`${this.API_url}/search/users?page=${page}&q=${query}&sort=${sort}&order=${order}&per_page=10`) ;
  }
}
