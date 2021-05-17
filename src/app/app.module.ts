import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ImageScanComponent } from './image-scan/image-scan.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import {CountdownModule} from 'ngx-countdown';

@NgModule({
  declarations: [
    AppComponent,
    ImageScanComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CountdownModule,
    NgxBootstrapIconsModule.pick(allIcons),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
