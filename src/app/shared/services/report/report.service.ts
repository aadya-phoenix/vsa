import { HttpHeaders, HttpParams } from '@angular/common/http';
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

  getExecutiveSummary(id:any){
    const params = new HttpParams().set('AuditplanId',id);
    const url = `${this.basePath}api/AuditReports/VendorSystemAuditReport`;
    return this.http. getParams(url, this.http.headers, params).pipe(catchError(this.commmonService.Errorhandling));
   }

   getCriticalObservations(data:any){
    const url = `${this.basePath}api/AuditPlan/GetCriticalObservations`;
    return this.http
      .post(url,data , this.http.headers)
      .pipe(catchError(this.commmonService.Errorhandling));
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

  getActionPlanVendorWise(data:any){
    const url = `${this.basePath}api/AuditReports/GetAuditEvidenceVerificationSummary`;
    return this.http
      .post(url,data , this.http.headers)
      .pipe(catchError(this.commmonService.Errorhandling));
  }

  getCategoryWiseDefects(data:any){
    const url = `${this.basePath}api/AuditReports/GetCategoryWiseDefects`;
    return this.http
      .post(url,data , this.http.headers)
      .pipe(catchError(this.commmonService.Errorhandling));
  }

  getCategorySupplierDefects(data:any){
    const url = `${this.basePath}api/AuditReports/GetCategoryWiseSupplierDefects`;
    return this.http
      .post(url,data , this.http.headers)
      .pipe(catchError(this.commmonService.Errorhandling));
  }
  
  getVendorDefects(data:any){
    const url = `${this.basePath}api/AuditReports/GetAuditPlanVendorDefects`;
    return this.http
      .post(url,data , this.http.headers)
      .pipe(catchError(this.commmonService.Errorhandling));  
  }

  getVendorSummaryYearwise(data:any){
    const url = `${this.basePath}api/AuditReports/GetVendorSummaryYearWise`;
    return this.http
      .post(url,data , this.http.headers)
      .pipe(catchError(this.commmonService.Errorhandling));  
  }

  getVendorSummaryYearwiseCummulative(data:any){
    const url = `${this.basePath}api/AuditReports/GetVendorSummaryYearWiseCummulative`;
    return this.http
      .post(url,data , this.http.headers)
      .pipe(catchError(this.commmonService.Errorhandling));  
  }

  getClauseWiseScoreTrend(data:any){
    const url = `${this.basePath}api/AuditReports/GetClauseWiseScoreTrend`;
    return this.http
      .post(url,data , this.http.headers)
      .pipe(catchError(this.commmonService.Errorhandling)); 
  }

  getClauseWiseVendorTrend(data:any){
    const url = `${this.basePath}api/AuditReports/GetVendorYearScoreTrend`;
    return this.http
      .post(url,data , this.http.headers)
      .pipe(catchError(this.commmonService.Errorhandling)); 
  }

  getClauseAuditWiseVendorTrend(data:any){
    const url = `${this.basePath}api/AuditReports/GetVendorAuditScoreTrend`;
    return this.http
      .post(url,data , this.http.headers)
      .pipe(catchError(this.commmonService.Errorhandling)); 
  }

  getClauseAuditWiseScore(data:any){
    const url = `${this.basePath}api/AuditReports/GetClauseWiseVendorAuditScoreTrend`;
    return this.http
      .post(url,data , this.http.headers)
      .pipe(catchError(this.commmonService.Errorhandling)); 
  }

  getRepeatTrendVendorWise(data:any){
    const url = `${this.basePath}api/AuditReports/GetRepeatIssueVendorTrend`;
    return this.http
      .post(url,data , this.http.headers)
      .pipe(catchError(this.commmonService.Errorhandling)); 
  }

  getRepeatTrendAuditWise(data:any){
    const url = `${this.basePath}api/AuditReports/GetRepeatAuditVendorTrend`;
    return this.http
      .post(url,data , this.http.headers)
      .pipe(catchError(this.commmonService.Errorhandling)); 
  }

  getAuditPendingStatus(data:any){
    const url = `${this.basePath}api/AuditReports/GetauditPendingStatus`;
    return this.http
      .post(url,data , this.http.headers)
      .pipe(catchError(this.commmonService.Errorhandling));  
  }
}
