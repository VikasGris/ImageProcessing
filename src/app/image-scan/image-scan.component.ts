import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

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
  result = {
    Age: null,
    Patient_Name: null,
    Sex: null,
    Date: null,
    Impression: null,
    scan_center_name:null,
    report_type:null
  };
  
  disabledupload=true;
  image_view='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
  form;
  error: any = null;
  isLoading = false;
  selectDropdownId;
  getResult = false;
  finalresult;
  success={code:null,
  message:null};
  successAlert:boolean = false;
  errorAlert:boolean = false;
  zoom:boolean = false;
  largeImage:boolean = true;
  zoomIcon:boolean = false;
  successCount = 0;
  failedCount = 0;
  
  constructor(private service: ResponseService) {
  }

  ngOnInit(): void {
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
    
  }
  onClick(event){
    this.image_view = this.base64textString[event.target.attributes.id.value]
    if(this.base64textString.length === 0){
      
      //console.log(this.base64textString) 
    }
  }

  removeSelectedFile(index,event){
    this.base64textString.splice(index,1);
    this.image_view = this.base64textString[this.base64textString.length-1];
    if(this.base64textString.length === 0){
      this.zoomIcon = false;
      this.image_view='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
      this.file.nativeElement.value = "";
      this.disabledupload = true;
      alert("Please select file")
    }
  }

  onClickZoom(){
    this.zoom = true;
    this.largeImage = false;
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
      alert("id")
    } 

  }
  
  get f() {
    return this.form.controls;
  }

  onReset(){
    location.reload();
  }

  onSubmit() {
    this.isLoading = true;
    // setTimeout ( () =>{
    //   this.isLoading = false;
    // },5000)
    const params = {
      '_id': this.selectDropdownId,
      'page': this.base64textString,
    };
    this.service.postResponse(params).subscribe(response => {
      this.successCount = this.successCount + 1;
      this.result = response
      this.error = null
      this.isLoading = false;
      this.getResult = true;
    }, (error) => {
      this.error = error;
      this.isLoading = false;
      this.failedCount = this.failedCount + 1;
    })
  }

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
    //console.log(this.errorAlert)
    
    this.service.postResponseSaveasImage(params).subscribe(response => {
      this.success = response;
      if(response.code === "success"){
        this.successAlert = true;
        this.successCount = this.successCount + 1;
        this.base64textString = [];
        this.result = null;
        this.form.value.select = null;
        this.form.reset();
        location.reload()
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
    this.successAlert = false;
    console.log(this.successAlert)
    this.service.postResponseSaveasText(finalOutput).subscribe(response => {
       this.success = response;
      if(response.code === "success"){
        this.successAlert = true;
        this.successCount = this.successCount + 1;
        console.log(this.successAlert)
        this.base64textString = [];
        this.result = null;
        this.form.value.select = null;
        this.form.reset();
        location.reload();
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
