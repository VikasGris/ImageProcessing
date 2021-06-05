import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ImageScanComponent } from './image-scan/image-scan.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { CountdownModule } from 'ngx-countdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatDividerModule} from '@angular/material/divider'



@NgModule({
  declarations: [
    AppComponent,
    ImageScanComponent,
  ],
  imports: [
    NgbModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CountdownModule,
    MatDividerModule,
    NgxBootstrapIconsModule.pick(allIcons),
    ],
  providers: [],
  bootstrap: [AppComponent],

  
})
export class AppModule { }
