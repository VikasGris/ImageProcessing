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

  postResponse(formData): Observable<any> {
    // console.log('service', formData);
    return this.http.post(this.configUrl + 'debug', formData);
  }
}
