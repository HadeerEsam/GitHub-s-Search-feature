import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  API_url="https://api.github.com";

  constructor(
    private http:HttpClient
  ) { }
  getUserInfo(userName:string):Observable <any>{
    return this.http.get(`${this.API_url}/users/${userName}`) ;
   }
}
