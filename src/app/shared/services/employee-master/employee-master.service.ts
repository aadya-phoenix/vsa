import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonService } from '../common/common.service';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeMasterService {
  public basePath = environment.baseUrl;
  public headers = new Headers({

  });
  
  constructor(private http: HttpService, private commmonService: CommonService) {
    this.headers.append(
      'Access-Control-Allow-Origin', '*',
      );
  }

  getEmployee(){
    const url = `${this.basePath}api/User/Get`;
    return this.http
      .get(url, this.http.headers)
      .pipe(catchError(this.commmonService.Errorhandling));
  }
   
  add(data:any){
    const url = `${this.basePath}api/User/Add`;
    return this.http.post(url, data).pipe(catchError(this.commmonService.Errorhandling));
  }

  getEmployeeDetails(id:any){
    const url = `${this.basePath}api/User/GetById/${id}`;
    return this.http
      .get(url, this.http.headers)
      .pipe(catchError(this.commmonService.Errorhandling));  
  }

  delete(id: any){
    const params = new HttpParams().set('id',id);
    const url = `${this.basePath}api/User/Delete`;
    return this.http
      .delete(url, this.http.headers,params)
      .pipe(catchError(this.commmonService.Errorhandling));
  }

  edit(data:any){
    const url = `${this.basePath}api/User/Update`;
    return this.http.put(url, data, this.http.headers).pipe(catchError(this.commmonService.Errorhandling));
  }

  getRoles(){
    const url = `${this.basePath}api/User/GetAllRoles`;
    return this.http
      .get(url, this.http.headers)
      .pipe(catchError(this.commmonService.Errorhandling));
  }

  getUserByRole(id:any){
    const url = `${this.basePath}api/User/GetUsersByRoleId/${id}`;
    return this.http
      .get(url, this.http.headers)
      .pipe(catchError(this.commmonService.Errorhandling));    
  }
}
