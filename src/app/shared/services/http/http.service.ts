import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  public headers = new HttpHeaders({});
  public params = new HttpParams({});

  constructor(private httpClient: HttpClient) {}

  public get(urlString: string, headers: HttpHeaders): Observable<any> {
    const url = urlString;
    return this.httpClient.get(url, { headers });
  }

  public getParams(urlString: string, headers: HttpHeaders, params:HttpParams): Observable<any>{
    const url = urlString;
    return this.httpClient.get(url, { headers, params }); 
  }

  public post(
    urlString: string,
    payload: any,
    headers?: HttpHeaders
  ): Observable<any> {
    const url = urlString;
    return this.httpClient.post(url, payload, { headers });
  }

  public postParams(
    urlString: string,
    payload: any,
    params:HttpParams,
    headers?: HttpHeaders
  ): Observable<any> {
    const url = urlString;
    return this.httpClient.post(url, payload, { headers, params });
  }


  public put(
    urlString: string,
    payload: any,
    headers: HttpHeaders
  ): Observable<any> {
    const url = urlString;
    return this.httpClient.put(url, payload, { headers });
  }

  public delete(urlString: string, headers: HttpHeaders, params:HttpParams): Observable<any> {
    const url = urlString;
    return this.httpClient.delete(url, { headers, params });
  }

  public getBlob(urlString: string, headers: any): Observable<any> {
    const url = urlString;
    return this.httpClient.get(url, { headers });
  }

}
