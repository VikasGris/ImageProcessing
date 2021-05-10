import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  configUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }


//For send request and get response
  postResponse(formData): Observable<any> {
    console.log('service', formData);
    return this.http.post(this.configUrl + 'debug', formData);
  }
//For to test server running or not
  postTestResponse(): Observable<any> {
    //console.log('service');
    return this.http.get(this.configUrl + 'test');
  }

//For send request with data
  postResponseSaveasImage(formData): Observable<any> {
    console.log('service', formData);
    return this.http.post(this.configUrl + 'saveasimage', formData);
  }

//For send request with data
  postResponseSaveasText(formData): Observable<any> {
    console.log('service', formData);
    return this.http.post(this.configUrl + 'saveastext', formData);
  }
  
}
