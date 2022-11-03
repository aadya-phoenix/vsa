import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonService } from '../common/common.service';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class AuditAreaMasterService {
  public basePath = environment.baseUrl;
  public headers = new Headers({

  });
  
  constructor(private http: HttpService, private commmonService: CommonService) {
    this.headers.append(
      'Access-Control-Allow-Origin', '*',
      );
  }

  getAuditArea(){
    const url = `${this.basePath}api/AuditArea`;
    return this.http
      .get(url, this.http.headers)
      .pipe(catchError(this.commmonService.Errorhandling));
  }
   
  add(data:any){
    const url = `${this.basePath}api/AuditArea`;
    return this.http.post(url, data).pipe(catchError(this.commmonService.Errorhandling));
  }

  getAuditAreaDetails(id:any){
    const params = new HttpParams().set('id',id);
    const url = `${this.basePath}api/AuditArea/get`;
    return this.http
    .getParams(url, this.http.headers,params)
    .pipe(catchError(this.commmonService.Errorhandling)); 
  }

  delete(id: any){
    const params = new HttpParams().set('id',id);
    const url = `${this.basePath}api/AuditArea/`;
    return this.http
      .delete(url, this.http.headers,params)
      .pipe(catchError(this.commmonService.Errorhandling));
  }

  edit(data:any){
    const url = `${this.basePath}api/AuditArea`;
    return this.http.put(url, data, this.http.headers).pipe(catchError(this.commmonService.Errorhandling));
  }
}
