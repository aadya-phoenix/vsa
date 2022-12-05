import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonService } from '../common/common.service';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class AuditExecutionService {
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

  getActionPlan(data:any){
    const url = `${this.basePath}api/AuditExecution/GetAuditplanActionplan`;
    return this.http.post(url, data).pipe(catchError(this.commmonService.Errorhandling));
  }

  getEvidenceObservation(id:any){
    const params = new HttpParams().set('AuditplanId',id);
    const url = `${this.basePath}api/AuditExecution/GetAuditplanActionplanObservationCount`;
    return this.http.postParams(url, {}, params).pipe(catchError(this.commmonService.Errorhandling));
  }

  saveActionPlan(data:any){
  const url = `${this.basePath}api/AuditExecution/SaveOrUpdateAuditplanActionplan`;
  return this.http.post(url, data).pipe(catchError(this.commmonService.Errorhandling));
  }

  actionPlanApproval(data:any){
    const url = `${this.basePath}api/AuditExecution/UpdateAuditActionPlanApproval`;
    return this.http.post(url, data).pipe(catchError(this.commmonService.Errorhandling));
  }

  actionPlanRemarks(data:any){
    const url = `${this.basePath}api/AuditExecution/UpdateAuditplanActionplanRemarks`;
    return this.http.post(url, data).pipe(catchError(this.commmonService.Errorhandling));
  }

  updateEvidenceReceived(data:any){
    const url = `${this.basePath}api/AuditExecution/UpdateAuditActionPlanObservationAction`;
    return this.http.post(url, data).pipe(catchError(this.commmonService.Errorhandling));
  }

  saveEvidence(data:any){
    const url = `${this.basePath}api/AuditExecution/SaveAuditPlanActionEvidence`;
    return this.http.post(url, data).pipe(catchError(this.commmonService.Errorhandling)); 
  }

  saveHeadApproval(data:any){
    const url = `${this.basePath}api/AuditPlan/HeadApproval`;
    return this.http.post(url, data).pipe(catchError(this.commmonService.Errorhandling));   
  }

  submitReport(data:any){
    const url = `${this.basePath}api/AuditPlan/UpdateAuditPlanTypeOfReport`;
    return this.http.put(url, data, this.http.headers).pipe(catchError(this.commmonService.Errorhandling));
  }

  assignSectionHead(data:any){
    const url = `${this.basePath}api/AuditPlan/AssignSectionHeadOnApproved`;
    return this.http.put(url, data, this.http.headers).pipe(catchError(this.commmonService.Errorhandling));
  }

  getDashboardCounters(){
    const url = `${this.basePath}api/AuditReports/VendorDashboardCount`;
    return this.http.post(url, {}).pipe(catchError(this.commmonService.Errorhandling));
  }

  getSummaryDetails(id:any){
    const params = new HttpParams().set('AuditPlanId',id);
    const url = `${this.basePath}api/AuditExecution/GetAuditExecutionDetails`;
    return this.http.postParams(url, {}, params).pipe(catchError(this.commmonService.Errorhandling)); 
  }

  getAuditLog(id:any){
    const params = new HttpParams().set('AuditPlanId',id);
    const url = `${this.basePath}api/AuditPlan/GetAuditLog`;
    return this.http.postParams(url,{}, params).pipe(catchError(this.commmonService.Errorhandling));
  }

  getObservationByFilter(data:any){
    const url = `${this.basePath}api/AuditExecution/GetAuditPlanObservationByFilter`;
    return this.http.post(url,data).pipe(catchError(this.commmonService.Errorhandling)); 
  }

  saveSectionHeadRemarks(data:any){
    const url = `${this.basePath}api/AuditExecution/UpdateAuditPlanExecutionObservation`;
    return this.http.post(url, data).pipe(catchError(this.commmonService.Errorhandling));
  }

  downloadDocument(data:any){
    const url = `${this.basePath}api/AuditPlan/DownloadEvidenceDocument`;
    return this.http
      .postBlobParams(url,data,{ observe: 'response', responseType: 'blob' as 'json'} );
     
  }
}
