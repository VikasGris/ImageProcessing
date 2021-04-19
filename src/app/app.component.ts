import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ResponseService } from './response.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // result: any;

  // constructor(private service: ResponseService) { }

  // getResponse() {
  //   this.service.getResponse().subscribe(response => {
  //     this.result = response;
  //   }, (error: HttpErrorResponse) => {
  //     alert(error.statusText);
  //   })
  // }
}
