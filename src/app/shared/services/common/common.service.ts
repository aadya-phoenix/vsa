import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public headers = new Headers({}); 
  
  constructor(private spinner: NgxSpinnerService) {
    this.headers.append('Access-Control-Allow-Origin', '*');
   }


   //show loader
   public showLoading() {
    this.spinner.show();
  }

  //Hide loader
  public hideLoading() {
    setTimeout(() => {
      this.spinner.hide();
    }, 100);
  }

  Errorhandling(err: HttpErrorResponse) {
    if (err.error instanceof ErrorEvent) {
      console.error(err.error.message);
    } else {
      console.error(`Backend returned code ${err.status}`);
    }
    return throwError(() => 'Please try again later.');;
  }

}
