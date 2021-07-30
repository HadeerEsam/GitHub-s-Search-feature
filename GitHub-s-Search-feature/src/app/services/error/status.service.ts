import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor() { }
  // handeling all error status
  errorHandel(status: any):string{
    if (status == 403) {
      return "Exceeds 60 requests in an hour wait for while and try again!";
    } else if (status == 503 || status == 304) {
      return "Server not responding try again later.";
    }
    else if (status == 422) {
     return "Change your search word";
    }
    return "";
  }
}
