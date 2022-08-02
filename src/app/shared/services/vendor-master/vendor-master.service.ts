import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonService } from '../common/common.service';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class VendorMasterService {
  public basePath = environment.baseUrl;
  public headers = new Headers({

  });
  
  constructor(private http: HttpService, private commmonService: CommonService) {
    this.headers.append(
      'Access-Control-Allow-Origin', '*',
      );
  }

  getVendor(){
    const url = `${this.basePath}api/Vendor`;
    return this.http
      .get(url, this.http.headers)
      .pipe(catchError(this.commmonService.Errorhandling));
  }
   
  addVendor(data:any){
    const url = `${this.basePath}api/Vendor`;
    return this.http.post(url, data).pipe(catchError(this.commmonService.Errorhandling));
  }

  getVendorDetails(id:any){
    const url = `${this.basePath}api/Vendor/${id}`;
    return this.http
      .get(url, this.http.headers)
      .pipe(catchError(this.commmonService.Errorhandling));  
  }
}
