import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { NgxSpinnerService } from 'ngx-spinner';

import { ResponseService } from '../response.service';

@Component({
  selector: 'app-image-scan',
  templateUrl: './image-scan.component.html',
  styleUrls: ['./image-scan.component.css']
})
export class ImageScanComponent implements OnInit {
  
  @ViewChild('myInput') file;
  base64textString = [];
  listOfDocuments: any = ["Deepam", "Clarity", "Aran", "Rasi", "New_Document"];
  result:any = {
    Age: null,
    Patient_Name: null,
    Sex: null,
    Date: null,
    Impression: null,
    scan_center_name:null,
    report_type:null,
    confidence:null
  };
  
  disabledupload=true;
  image_view='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
  form;
  error: boolean = false;
  isLoading = false;
  selectDropdownId;
  getResult = false;
  finalresult;
  success={code:null,
  message:null};
  uploadFileAlert = false;
  DropdownId = false;
  successAlert:boolean = false;
  errorAlert:boolean = false;
  zoom:boolean = false;
  largeImage:boolean = true;
  zoomIcon:boolean = false;
  successCount = 0;
  failedCount = 0;
  uploadButton:boolean = false;
  responseButton:boolean = false;
  seconds;
  resend_otp_waiting_time = 15;
  
  constructor(private service: ResponseService,private spinner: NgxSpinnerService) {
    
  }

  ngOnInit(): void {
    this.spinner.show();
    this.form = new FormGroup({
      files: new FormControl(null,Validators.required),
      select: new FormControl(null, Validators.required)
    });
    
  }


  onFileChange(event: any): void {
    var inputFile = event.target.files[0];
    if (inputFile) {
      const reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(inputFile)
    }   
  }

  handleReaderLoaded(e) {
    this.base64textString.push('data:image/png;base64,' + btoa(e.target.result));
    this.image_view = this.base64textString[this.base64textString.length-1];
    this.zoomIcon = true;
    console.log(this.base64textString)
  }
  onClick(event){
    this.image_view = this.base64textString[event.target.attributes.id.value]
  }

  removeSelectedFile(index){
    this.base64textString.splice(index,1);
    this.image_view = this.base64textString[this.base64textString.length-1];
    if(this.base64textString.length === 0){
      this.zoomIcon = false;
      this.image_view='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
      this.file.nativeElement.value = "";
      this.disabledupload = true;
      this.uploadFileAlert = true;
      setTimeout (() =>{
        this.uploadFileAlert = false;
      },3000)
      
    }
    //this.uploadFileAlert = false;
    // console.log(this.uploadFileAlert);
  }

  onClickZoom(){
    this.zoom = true;
    this.largeImage = false;
    console.log(this.largeImage)
  }
  onZoomOut(i,event){
    this.zoom = false;
    this.largeImage = true;
  }

  selectId(event) {
    //alert(this.form.value.select)
    if(this.form.value.select!=='Select Document'){
      this.selectDropdownId = this.form.value.select;
      this.disabledupload = false;
    }
    else{
      this.disabledupload = true;
      this.DropdownId = true;
      setTimeout(() =>{
        this.DropdownId = false;
      },3000)
      
    } 

  }

  get f() {
    return this.form.controls;
  }

  onReset(){
    this.form.reset();
    this.image_view = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
    this.zoomIcon = false
    this.base64textString = [];
    this.result = {}
    console.log(this.base64textString)
  }

  onSubmit() {
    this.uploadButton = true;
    this.responseButton = true;
    this.isLoading = true;
    this.error = false;
    this.count();
    // setTimeout ( () =>{
    //   this.isLoading = false;
    // },5000)
    const params = {
      '_id': this.selectDropdownId,
      'page': this.base64textString,
    };
    this.service.postResponse(params).subscribe(response => {
      this.result = response
      this.isLoading = false;
      this.uploadButton = false;
      this.responseButton = false;
      this.getResult = true;
    }, (error) => {
      this.error = true;
      setTimeout(() =>{
        this.error = false;
      },3000)
      this.isLoading = false;
      this.uploadButton = false;
      this.responseButton = false;
    })
  }
  count() {
    this.seconds = this.resend_otp_waiting_time;
    const timer = setInterval(() => {
      this.seconds = this.seconds - 1;
      if (!this.seconds) clearInterval(timer);
    }, 1000);
  };

  onSubmitImage() {
    const params = {
      'input':
      {
        '_id': this.form.value.select,
        'page': this.base64textString,
      },
      'output': {
        'fields': this.result
      }
    };
    this.errorAlert = false;
    this.service.postResponseSaveasImage(params).subscribe(response => {
      this.success = response;
      if(response.code === "success"){
        this.successAlert = true;
        this.successCount = this.successCount + 1;
        this.base64textString = [];
        this.result = {};
        this.image_view = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
        this.zoomIcon = false
        //this.form.value.select = null;
        this.getResult = false;
        this.uploadButton = false
        this.form.reset();
        //location.reload()
      }
      else{
        this.errorAlert = true;
        this.failedCount = this.failedCount+1;

      }
      
    }, (error) => {
      this.errorAlert = true;
      this.failedCount = this.failedCount+1;
      console.log(this.failedCount)
      //console.log(this.errorAlert)
    })
    
  }

  onSubmitText() {
    const finalOutput = {
      'input':
      {
        '_id': this.form.value.select,
        'page': this.base64textString,
      },
      'output': {
        'fields': this.result
      }
    };
    this.errorAlert = false;
    this.service.postResponseSaveasText(finalOutput).subscribe(response => {
       this.success = response;
      if(response.code === "success"){
        this.successAlert = true;
        this.successCount = this.successCount + 1;
        this.base64textString = [];
        this.result = {};
        this.image_view = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
        this.zoomIcon = false
        //this.form.value.select = null;
        this.getResult = false;
        this.uploadButton = false
        this.form.reset();
        //location.reload();
      }
      else{
        this.errorAlert = true;
        this.failedCount = this.failedCount+1;
      }
    }, (error) => {
      this.errorAlert = true;
      this.failedCount = this.failedCount + 1;
      //console.log(this.errorAlert)
    })

  }
}
