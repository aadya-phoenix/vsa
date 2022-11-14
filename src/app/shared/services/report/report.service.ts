import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonService } from '../common/common.service';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

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

  getAuditPlanStatusByMonth(data:any){
    const url = `${this.basePath}api/AuditReports/AuditPlanStatusByMonth`;
    return this.http
      .post(url,data , this.http.headers)
      .pipe(catchError(this.commmonService.Errorhandling));
  }

  AuditPlanStatusByYearly(data:any){
    const url = `${this.basePath}api/AuditReports/AuditPlanStatusByYearly`;
    return this.http
      .post(url,data , this.http.headers)
      .pipe(catchError(this.commmonService.Errorhandling));
  }
}
