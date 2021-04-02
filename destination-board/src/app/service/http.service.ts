import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
private Url = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getRequest(resourceUrl:string, options: any): Observable<any> {
    return this.http.get<any>(this.Url + resourceUrl, options).pipe(
      tap(body => body)
    );
  }

  postRequest(resourceUrl:string, body:any){
    return this.http.post(this.Url + resourceUrl, body).pipe(
      tap(res => res)
    );
  }
}
