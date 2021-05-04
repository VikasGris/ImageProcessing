import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ResponseService } from '../response.service';

@Component({
  selector: 'app-image-scan',
  templateUrl: './image-scan.component.html',
  styleUrls: ['./image-scan.component.css']
})
export class ImageScanComponent implements OnInit {
  
  @ViewChild('myInput') file;
  base64textString = [];
  listOfDocuments: any = ["Nalan Gastro Centre", "Pathway Diagnostics", "New_Document"];
  result:any = {
    Patient_Name: [null, null],
    Date:  [null, null],
    Impression:  [null, null],
    scan_center_name: [null, null],
    report_type: [null, null],
  };
  fileDisable = false;
  closeIcon = true;
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
  //averageTime = [15,15,15,15,15];
  averageTime = 15;
  seconds = 0;
  averageTime_Index = 0;
  avgSeconds = 0;


  
  
  constructor(private service: ResponseService) {
    
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      files: new FormControl(null,Validators.required),
      select: new FormControl(null, Validators.required)
    });
    
  }


  onFileChange(event: any): void {
    this.closeIcon = true;
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
    this.form.value.select = null;
    this.image_view = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
    this.zoomIcon = false
    this.base64textString = [];
    this.result = {
      Patient_Name: [null, null],
      Date:  [null, null],
      Impression:  [null, null],
      scan_center_name: [null, null],
      report_type: [null, null],
    };
    this.disabledupload = true;
    
  }

  onScanTest(){
    this.service.postTestResponse().subscribe(response =>{
      console.log("test",response)
    }, (error) =>{
      console.log(error)
    })
  }

  onSubmit() {
    this.uploadButton = true;
    this.responseButton = true;
    this.isLoading = true;
    this.error = false;
    this.count();
    const params = {
      '_id': this.selectDropdownId,
      'page': this.base64textString,
    };
    
    this.service.postResponse(params).subscribe(response => {
      this.result = response
      this.isLoading = false;
      // if(this.averageTime_Index >=5){
      //   this.averageTime_Index = 0;
      // }
      //this.averageTime[this.averageTime_Index] =this.avgSeconds - this.seconds;
      //this.averageTime_Index = this.averageTime_Index + 1;
      this.averageTime = Math.floor((this.seconds ))
      if(this.averageTime < 4){
        this.averageTime = 7
      }
      this.uploadButton = false;
      this.responseButton = false;
      this.getResult = true;
      this.fileDisable = true;
      this.closeIcon = false;
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
    //console.log(this.timer)
    // for(var i =0;i<=5;i++){
    //   time
    // }
    // this.averageTime.push(this.avg)
    // console.log(this.averageTime)

    
    // var sum =0;
    // for(var i = 0; i < this.averageTime.length; i++){
    //   sum +=  this.averageTime[i]; 
    // }
    // this.timer = 15 - this.time;
    // console.log(this.time)
    //this.avgSeconds = Math.floor(sum/this.averageTime.length);
    //this.seconds = this.avgSeconds;
    this.seconds = this.averageTime;
     console.log("Start");
     console.log(this.averageTime , this.seconds);
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
        this.failedCount = this.failedCount + 1;
        this.base64textString = [];
        this.result = {
          Patient_Name: [null, null],
          Date:  [null, null],
          Impression:  [null, null],
          scan_center_name: [null, null],
          report_type: [null, null],
        };
        this.image_view = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
        this.zoomIcon = false
        this.form.value.select = null;
        this.getResult = false;
        this.uploadButton = false;
        this.disabledupload = true;
        this.form.reset();
        setTimeout(() =>{
          this.successAlert = false;
        },4000)
      }
      else{
        this.errorAlert = true;
        //this.failedCount = this.failedCount+1;
      }
    }, (error) => {
      this.errorAlert = true;
      this.failedCount = this.failedCount+1;
      console.log(this.failedCount)
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
    this.service.postResponseSaveasText(finalOutput).subscribe(response => {
       this.success = response;
      if(response.code === "success"){
        this.successAlert = true;
        this.successCount = this.successCount + 1;
        this.base64textString = [];
        this.result = {
          Patient_Name: [null, null],
          Date:  [null, null],
          Impression:  [null, null],
          scan_center_name: [null, null],
          report_type: [null, null],
        };
        this.image_view = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
        this.zoomIcon = false
        this.form.value.select = null;
        this.getResult = false;
        this.uploadButton = false;
        this.disabledupload = true;
        this.form.reset();
        setTimeout(() =>{
          this.successAlert = false;
        },4000)
      }
      else{
        this.errorAlert = true;
        //this.failedCount = this.failedCount+1;
      }
    }, (error) => {
      this.errorAlert = true;
      //this.failedCount = this.failedCount + 1;
    })

  }
}
