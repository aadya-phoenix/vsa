import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonService } from '../common/common.service';
import { HttpService } from '../http/http.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public basePath = environment.baseUrl;
  public headers = new Headers({});
  
  constructor(private http: HttpService, private commmonService: CommonService) {
    this.headers.append('Access-Control-Allow-Origin', '*');
  }
   
  login(data:any){
    const url = `${this.basePath}api/Token`;
    return this.http.post(url, data).pipe(catchError(this.commmonService.Errorhandling));
  }

  getLoginDetails() {
    return JSON.parse(localStorage.getItem('loginDetails') || '{}');
  }

  getAuditDetails() {
    return JSON.parse(localStorage.getItem('auditDetails') || '{}');
  }

  getRolefromlocal(){
    let role = JSON.parse(localStorage.getItem('role') || '{}')
    return JSON.parse(localStorage.getItem('role') || '{}')
  }

  setPassword(data:any){
    const url = `${this.basePath}api/User/UpdatePassword/UpdatePassword`;
    return this.http.post(url, data).pipe(catchError(this.commmonService.Errorhandling));  
  }

  forgetPassword(email:any){
    const params = new HttpParams().set('email',email);
    const url = `${this.basePath}api/Token/ForgotPassword`;
    return this.http.postParams(url, {}, params);
  }
}
