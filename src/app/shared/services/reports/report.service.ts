import { HttpParams } from '@angular/common/http';
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
  public headers = new Headers({

  });
  
  constructor(private http: HttpService, private commmonService: CommonService) {
    this.headers.append(
      'Access-Control-Allow-Origin', '*',
      );
  }

  getExecutiveSummary(id:any){
   const params = new HttpParams().set('AuditplanId',id);
   const url = `${this.basePath}api/AuditReports/VendorSystemAuditReport`;
   return this.http. getParams(url, this.http.headers, params).pipe(catchError(this.commmonService.Errorhandling));
  }
}
