import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
// import {ConnectionServiceModule} from 'ngx-connection-service';

import { AppComponent } from './app.component';
import { ImageScanComponent } from './image-scan/image-scan.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
// import { CountdownModule } from 'ngx-countdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import {MatDividerModule} from '@angular/material/divider'

import {ZoomComponentComponent} from "./zoom-component/zoom-component.component"


@NgModule({
  declarations: [
    AppComponent,
    ImageScanComponent,
    ZoomComponentComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // CountdownModule,
    // MatDividerModule,
    // NgxBootstrapIconsModule.pick(allIcons),
    // ConnectionServiceModule
    ],
  providers: [],
  bootstrap: [AppComponent],

  
})
export class AppModule { }
