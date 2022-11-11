import { HttpHeaders, HttpParams } from '@angular/common/http';
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
  public headers = new HttpHeaders({});
  
  constructor(private http: HttpService, private commmonService: CommonService) {
    this.headers.append(
      'Access-Control-Allow-Origin', '*',
      );
      this.headers.append(
        'Content-Type', 'application/json'
        );
  }

  getAuditPlan(){
    const url = `${this.basePath}api/AuditPlan`;
    return this.http
      .get(url, this.http.headers)
      .pipe(catchError(this.commmonService.Errorhandling));
  }
   
  add(data:FormData){
      this.headers.append(
        'Content-Type' , 'multipart/form-data'
      ) 
    const url = `${this.basePath}api/AuditPlan`;
    return this.http.post(url, data).pipe(catchError(this.commmonService.Errorhandling));
  }

  getPlanDetails(id:any){
    const url = `${this.basePath}api/AuditPlan/${id}`;
    return this.http
      .get(url, this.http.headers)
      .pipe(catchError(this.commmonService.Errorhandling));  
  }

  getAttachment(id:any){
    const params = new HttpParams().set('id',id);
    const url = `${this.basePath}api/AuditPlan/attachment`;
    return this.http
      .getParams(url, this.http.headers,params)
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

  getLocationByVendor(id:any){
    const params = new HttpParams().set('vendorid',id);
    const url = `${this.basePath}api/Location/GetAllLocationbyVendorAsync`;
    return this.http
      .getParams(url, this.http.headers, params)
      .pipe(catchError(this.commmonService.Errorhandling));
  }

  vendorAction(data:any){
    const url = `${this.basePath}api/AuditPlan/RejectAuditPlan`;
    return this.http.put(url, data, this.http.headers).pipe(catchError(this.commmonService.Errorhandling));
  }

  assignAuditor(data:any){
    const url = `${this.basePath}api/AuditPlan/AssignAuditors`;
    return this.http.post(url, data).pipe(catchError(this.commmonService.Errorhandling));
  }

  updateInitiatePlan(data:any){
    const url = `${this.basePath}api/AuditPlan/UpdateAuditPlanProcess`;
    return this.http.put(url, data, this.http.headers).pipe(catchError(this.commmonService.Errorhandling)); 
  }

  filter(data:any){
    const url = `${this.basePath}api/AuditPlan/GetWithFilterAsync`;
    return this.http.post(url, data).pipe(catchError(this.commmonService.Errorhandling)); 
  }

  saveCriticalObservation(data:any){
    const url = `${this.basePath}api/AuditPlan/SaveCriticalObservations`;
    return this.http.post(url, data).pipe(catchError(this.commmonService.Errorhandling)); 
  }

  saveVendorAttendees(data:any){
    const url = `${this.basePath}api/AuditPlan/SaveVendorAttendees`;
    return this.http.post(url, data).pipe(catchError(this.commmonService.Errorhandling)); 
  }

  getScoreAndCategoryList(id:any){
    this.http.headers.append(
      'Content-Type', 'application/json'
    );
    const url = `${this.basePath}api/Category/GetScoreAndStatusCategory`;
    return this.http.post(url, id).pipe(catchError(this.commmonService.Errorhandling));
  }

  getPlanRegulation(data:any){
    const url = `${this.basePath}api/AuditExecution/GetAuditPlanRegulations`;
    return this.http.post(url, data).pipe(catchError(this.commmonService.Errorhandling));
  }

  getPlanObservation(data:any){
    const url = `${this.basePath}api/AuditExecution/GetAuditPlanObservation`;
    return this.http.post(url, data).pipe(catchError(this.commmonService.Errorhandling));
  }

  getAuditAreaByCategory(id:any){
    const url = `${this.basePath}api/AuditArea/${id}`;
    return this.http
      .get(url, this.http.headers)
      .pipe(catchError(this.commmonService.Errorhandling)); 
  }

  getJudgement(){
    const url = `${this.basePath}api/Common`;
    return this.http
      .get(url, this.http.headers)
      .pipe(catchError(this.commmonService.Errorhandling)); 
  }

  saveObservation(data:any){
    this.headers.append(
      'Content-Type' , 'multipart/form-data'
    ) 
    const url = `${this.basePath}api/AuditExecution/SaveAuditPlanExecutionObservation`;
    return this.http.post(url, data).pipe(catchError(this.commmonService.Errorhandling)); 
  }

  bulkUpload(data:any){
    const url = `${this.basePath}api/AuditPlan/BulkUpload`;
    return this.http.post(url, data).pipe(catchError(this.commmonService.Errorhandling));
  }
  
}
