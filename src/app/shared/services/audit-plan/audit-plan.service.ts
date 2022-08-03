import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonService } from '../common/common.service';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class AuditPlanService {
  public basePath = environment.baseUrl;
  public headers = new Headers({

  });
  
  constructor(private http: HttpService, private commmonService: CommonService) {
    this.headers.append(
      'Access-Control-Allow-Origin', '*',
      );
  }

  getAuditPlan(){
    const url = `${this.basePath}api/AuditPlan`;
    return this.http
      .get(url, this.http.headers)
      .pipe(catchError(this.commmonService.Errorhandling));
  }
   
  add(data:any){
    const url = `${this.basePath}api/AuditPlan`;
    return this.http.post(url, data).pipe(catchError(this.commmonService.Errorhandling));
  }

  getCategoryDetails(id:any){
    const url = `${this.basePath}api/AuditPlan/${id}`;
    return this.http
      .get(url, this.http.headers)
      .pipe(catchError(this.commmonService.Errorhandling));  
  }

  delete(id: any){
    const params = new HttpParams().set('id',id);
    const url = `${this.basePath}api/AuditPlan/`;
    return this.http
      .delete(url, this.http.headers,params)
      .pipe(catchError(this.commmonService.Errorhandling));
  }

  edit(data:any){
    const url = `${this.basePath}api/AuditPlan`;
    return this.http.put(url, data, this.http.headers).pipe(catchError(this.commmonService.Errorhandling));
  }
  getLocation(){
    const url = `${this.basePath}api/Location`;
    return this.http
      .get(url, this.http.headers)
      .pipe(catchError(this.commmonService.Errorhandling));
  }
}
