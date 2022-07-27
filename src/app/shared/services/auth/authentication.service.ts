import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
  ) { }

  getLoginDetails() {
    return JSON.parse(localStorage.getItem('loginDetails') || '{}');
  }

  getRolefromlocal(){
    let role = JSON.parse(localStorage.getItem('role') || '{}')

    return JSON.parse(localStorage.getItem('role') || '{}')
  
  }
}
