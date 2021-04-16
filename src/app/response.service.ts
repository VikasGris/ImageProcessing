import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {




  constructor(private http: HttpClient) { }
  configUrl = environment.baseUrl;

  getResponse(): Observable<any> {
    // return this.http.get(this.configUrl + '/api/v2/pokemon?pffset=10&limit=5');
    return this.http.get(this.configUrl + 'out');
  }
  postResponse(formData): Observable<any> {
    // return this.http.get(this.configUrl + '/api/v2/pokemon?pffset=10&limit=5');
    return this.http.post(this.configUrl + 'result', formData);
  }
  // getPostResponse(): Observable<any>{
  //   return this.http.post(this.configUrl + '');
  // }
}
