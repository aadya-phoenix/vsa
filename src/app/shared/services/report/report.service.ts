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

  getDistributionStatusMonthWiseResponseAsync(data:any){
    const url = `${this.basePath}api/AuditReports/GetDistributionStatusMonthWiseResponseAsync`;
    return this.http
      .post(url,data , this.http.headers)
      .pipe(catchError(this.commmonService.Errorhandling));
  }

  getDistributionStatusYearWiseResponseAsync(data:any){
    const url = `${this.basePath}api/AuditReports/GetDistributionStatusYearWiseResponseAsync`;
    return this.http
      .post(url,data , this.http.headers)
      .pipe(catchError(this.commmonService.Errorhandling));
  }

  getDistributionStatusMonthWise_Percent_ResponsePieChart(data:any){
    const url = `${this.basePath}api/AuditReports/GetDistributionStatusMonthWise_Percent_ResponsePieChart`;
    return this.http
      .post(url,data , this.http.headers)
      .pipe(catchError(this.commmonService.Errorhandling));
  }

  getDistributionStatusYearWise_Percent_ResponsePieChart(data:any){
    const url = `${this.basePath}api/AuditReports/GetDistributionStatusYearWise_Percent_ResponsePieChart`;
    return this.http
      .post(url,data , this.http.headers)
      .pipe(catchError(this.commmonService.Errorhandling));
  }

  getVSAStatusYearWise_Response(data:any){
    const url = `${this.basePath}api/AuditReports/GetVSAStatusYearWise_Response`;
    return this.http
      .post(url,data , this.http.headers)
      .pipe(catchError(this.commmonService.Errorhandling));
  }

  getVSAStatusYearWise_Response_Grid(data:any){
    const url = `${this.basePath}api/AuditReports/GetVSAStatusYearWise_Response_Grid`;
    return this.http
      .post(url,data , this.http.headers)
      .pipe(catchError(this.commmonService.Errorhandling));
  }

  getVSAStatusYearWise_Cumulative(data:any){
    const url = `${this.basePath}api/AuditReports/GetVSAStatusYearWise_Cumulative`;
    return this.http
      .post(url,data , this.http.headers)
      .pipe(catchError(this.commmonService.Errorhandling));
  }

  getVSAStatusYearWise_Cumulative_Grid(data:any){
    const url = `${this.basePath}api/AuditReports/GetVSAStatusYearWise_Cumulative_Grid`;
    return this.http
      .post(url,data , this.http.headers)
      .pipe(catchError(this.commmonService.Errorhandling));
  }
}
