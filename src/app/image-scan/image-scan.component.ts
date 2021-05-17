import { Component,Input,OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgControl, Validators } from '@angular/forms';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { CountdownComponent } from 'ngx-countdown';

import { ResponseService } from '../response.service';


@Component({
  selector: 'app-image-scan',
  templateUrl: './image-scan.component.html',
  styleUrls: ['./image-scan.component.css']
})
export class ImageScanComponent implements OnInit {
  @ViewChild('myInput') file;
  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;
    
//Variables declarations
  base64textString = [];
  listOfDocuments: any = ["Nalan Gastro Centre", "Pathway Diagnostics"];
  result:any = {
    Patient_Name: [null, null],
    Date:  [null, null],
    Impression:  [null, null],
    scan_center_name: [null, null],
    report_type: [null, null],
  };
  closeIcon = true;
  disabledupload=true;
  image_view='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
  form;
  error: boolean = false;
  isLoading = false;
  selectDropdownId;
  getResult = false;
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
  averageTime =15;
  seconds = 0;
  averageTime_Index = 0;
  avgSeconds = 15;
  inputEnable = false;
  newDocumentInput = false;
  duplicate_browse = false;
  BrowseId='';
  markForReview = false;
  closeResult;
  DocumentIdUploaded = '';
  oldDate;
  upArrow: boolean = true;
  downArrow: boolean = true;
  waitForResponse: boolean = false;
  verifyDocumentId:boolean = false;
  invalidDocumentId:boolean = false;
  unKnownError:boolean = false;
  tableShow:boolean = false;
  isUpdate1:boolean = true;
  isUpdate2:boolean = true;
  isUpdate3:boolean = true;
  isUpdate4:boolean = true;
  isUpdate5:boolean = true;

//Constructor for using services
  constructor(private service: ResponseService,private modalService: NgbModal,private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      files: new FormControl(null,Validators.required),
      select: new FormControl(null, Validators.required)
    });
    this.formTable.get('scanCenterName').disable();
    this.formTable.get('patientName').disable();
    this.formTable.get('reportType').disable();
    this.formTable.get('reportDate').disable();
    this.formTable.get('impression').disable();
  }

  formTable = this.formBuilder.group({ 
    scanCenterName: [""],
    scanCenterName_Confidence:[""],
    patientName:[""],
    patientName_Confidence:[""],
    reportType:[""],
    reportType_Confidence:[""],
    reportDate:[""],
    reportDate_Confidence:[""],
    impression:[""],
    impression_Confidence:[""]

  });
  get formTableControls() {
    return this.formTable.controls;
  }

//Functionality for select file from local storage
  onFileChange(event: any): void {
    this.closeIcon = true;
    this.uploadFileAlert = false;
    var inputFile = event.target.files[0];
    if (inputFile) {
      const reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(inputFile)
    }   
  }

//Store files in array
  handleReaderLoaded(e) {
    this.upArrow = true;
    this.downArrow = true;
    this.base64textString.push('data:image/png;base64,' + btoa(e.target.result));
    this.image_view = this.base64textString[this.base64textString.length-1];
    this.zoomIcon = true;
    console.log(this.base64textString)
    
    if (this.base64textString.length ===1) {
      this.downArrow = false;
      this.upArrow = false;
    }
    // if (this.base64textString.length === 2) {
    //     if (this.base64textString[0]) {
    //       this.upArrow = false;
    //       this.downArrow = true;
    //       console.log(this.upArrow,this.downArrow)
    //     }
    //     if (this.base64textString[1]) {
    //       this.upArrow = true;
    //       this.downArrow = false;
    //       console.log(this.upArrow,this.downArrow)
    //     }
      
    // }
    // if (this.base64textString.length >= 3) {
    //   if (this.base64textString[0]) {
    //       this.upArrow = false;
    //       this.downArrow = true;
    //       console.log(this.upArrow,this.downArrow)
    //     }
    //     if (this.base64textString.length-1) {
    //       this.upArrow = true;
    //       this.downArrow = false;
    //       console.log(this.upArrow,this.downArrow)
    //     }
    // }
    
  }
  onUpImage(event) {
    var id = parseInt(event.path[1]['id']);
    var temp = this.base64textString[id];
    this.base64textString[id] = this.base64textString[id - 1];
    this.base64textString[id - 1] = temp
  }

  onDownImage(event) {
    var id = parseInt(event.path[1]['id']);
    console.log(typeof(id))
    var temp = this.base64textString[id];
    //console.log(temp)
    this.base64textString[id] = this.base64textString[id + 1];
    //console.log(this.base64textString[event.path[1]['id']])
    this.base64textString[id + 1] = temp
    //console.log(this.base64textString[event.path[1]['id']+1])
  }
  //Function for clicking image to show as large image
  onClick(event){
    this.image_view = this.base64textString[event.target.attributes.id.value]
    console.log(this.image_view)
  }

//Functionality for edit option given to displaying result

  onUpdate(){
    console.log(this.formTable.get('scanCenterName').value);
  }

  openEditableInput1(){
    this.formTable.get('scanCenterName').enable();
  }
  openEditableInput2(){
    this.formTable.get('patientName').enable();
  }
  openEditableInput3(){
    this.formTable.get('reportType').enable();
  }
  
  openEditableInput4(){
    this.formTable.get('reportDate').enable();
  }
  openEditableInput5(){
    this.formTable.get('impression').enable();
  }

  
//Remove  file from the list
  
  removeSelectedFile(index) {
    this.base64textString.splice(index,1);
    this.image_view = this.base64textString[this.base64textString.length - 1];
    if(this.base64textString.length === 0){
      this.zoomIcon = false;
      this.image_view='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
      this.file.nativeElement.value = "";
      this.disabledupload = true;
      this.uploadFileAlert = true;
    }
  }

//Image zoom funtion
  onClickZoom(){
    this.zoom = true;
    if(this.largeImage===true){
      this.largeImage = false;
    }
    else if (this.duplicate_browse===true) {
      this.duplicate_browse=false;
      this.BrowseId='disabled';
    }
  }

//Image zoomout function
  
  onZoomOut(i,event){
    this.zoom = false;
    if(this.BrowseId==='disabled'){
      this.duplicate_browse=true;
    }
    else{
      this.largeImage = true;
    }
  }

//Select report type
  
  selectId(event) {
    this.newDocumentInput = false;
    this.DropdownId = false;
    if(this.form.value.select!=='Select Document'){
      this.selectDropdownId = this.form.value.select;
      this.disabledupload = false;
      
      if(this.selectDropdownId==="New_Document"){
        this.newDocumentInput = true;
        this.disabledupload = true;
        this.markForReview = true;
      }
      else{
        this.markForReview = false;

        if (this.DocumentIdUploaded !== '') {
          if (this.DocumentIdUploaded !== this.form.value.select) {
            this.markForReview = false;
            this.getResult = false;
          }
          else {
            
            this.markForReview = true;
            this.getResult = true;
          }
        }
      }
      
    }
    else {
      this.markForReview = false;
      this.getResult = false;
      this.disabledupload = true;
      this.DropdownId = true;
    } 
  }

//Get report type from user
  
  onChangeReport(event){
    this.selectDropdownId = event.target.value;
  }
  
  get f() {
    return this.form.controls;
  }

//Reset form fields and some other fields
  
  onReset() {
    this.error = false;
    this.uploadFileAlert = false;
    this.waitForResponse = false;
    this.duplicate_browse = false;
    this.DropdownId = false;
    this.verifyDocumentId = false;
    this.invalidDocumentId = false;
    this.unKnownError = false;
    this.largeImage = true;
    this.form.reset();
    this.form.value.select = null;
    this.image_view = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
    this.zoomIcon = false;
    this.inputEnable = false;
    this.newDocumentInput = false;
    this.markForReview = false;
    this.getResult = false;
    this.base64textString = [];
    this.result = {
      Patient_Name: [null, null],
      Date:  [null, null],
      Impression:  [null, null],
      scan_center_name: [null, null],
      report_type: [null, null],
    };
    this.isLoading = false
    this.responseButton = false;
    this.uploadButton = false;
    this.disabledupload = true; 
    this.formTable.reset();
    this.formTable.get('scanCenterName').disable();
    this.formTable.get('patientName').disable();
    this.formTable.get('reportType').disable();
    this.formTable.get('reportDate').disable();
    this.formTable.get('impression').disable();
    this.tableShow = false;
    this.DocumentIdUploaded = "";
  }

//Send request and get Response to show result
  
  onSubmit() {
    this.error = false;
    this.largeImage = false;
    this.duplicate_browse =true;
    this.tableShow = true;
    this.verifyDocumentId = false;
    this.invalidDocumentId = false;
    this.unKnownError = false;
    this.count();
    //this.error = false;
    this.service.postTestResponse().subscribe(response =>{
      if (response.code === "success") {
        this.uploadButton = true;
        this.responseButton = true;
        this.isLoading = true;
        this.error = false;
        const params = {
          '_id': this.selectDropdownId,
          'page': this.base64textString,
        };
        this.DocumentIdUploaded = this.selectDropdownId;

        this.service.postResponse(params).subscribe(response => {
          this.result = response.response;
          var date = this.result.Date[0]
          var newDate = date.split("-").reverse().join("-")
          this.result.Date[0] = newDate;
          this.formTable.patchValue({
            scanCenterName : this.result.scan_center_name[0],
            scanCenterName_Confidence:this.result.scan_center_name[1],
            patientName:this.result.Patient_Name[0],
            patientName_Confidence:this.result.Patient_Name[1],
            reportType:this.result.report_type[0],
            reportType_Confidence:this.result.report_type[1],
            reportDate:this.result.Date[0],
            //reportDate:"2021-10-12",
            reportDate_Confidence:this.result.Date[1],
            impression:this.result.Impression[0],
            impression_Confidence:this.result.Impression[1]
          });
            // var changeOld = this.result.Date[0]
            // this.oldDate = changeOld.split("-").reverse().join("-")
            // this.result.Date[0] = this.oldDate;
            // console.log(this.oldDate)
          var date = this.result.Date[0]
          var newDate = date.split("-").reverse().join("-")
          this.result.Date[0] = newDate;
          //this.onChangeStringToDate(this.result.Date[0]);
          this.isLoading = false;
          this.uploadButton = false;
          this.responseButton = false;
          this.getResult = true;
          this.markForReview = true;
          
          this.closeIcon = false;
          this.averageTime = Math.floor((this.seconds ))
          if(this.seconds <= 0){
            this.waitForResponse = true;
          }
          if(this.averageTime < 4){
          this.averageTime = 7
        }
          if(response.code === 20){
            this.verifyDocumentId = true
            this.isLoading = false;
            this.responseButton = false;
            this.disabledupload = true;
            this.uploadButton = false;
            //this.getResult = false
          }
          else if(response.code === 2){
            this.invalidDocumentId = true;
            this.isLoading = false;
            this.responseButton = false;
            this.disabledupload = true;
            this.uploadButton = false;
            this.getResult = false
          }
          else if(response.code === 0 || response.code === 5 || response.code === 10 || response.code === 15){
            this.unKnownError = true;
            this.isLoading = false;
            this.responseButton = false;
            this.disabledupload = true;
            this.uploadButton = false;
            //this.getResult = false
          }
        }, (error) => {
        })
      }
      
    },(error) =>{
      this.error = true;
        // setTimeout(() =>{
        //   this.error = false;
        // },3000)
    })
  }

//Counter for get response
  
  count() {
    this.seconds = this.averageTime;
   const timer = setInterval(() => {
     this.seconds = this.seconds - 1;
     if (!this.seconds) clearInterval(timer);
   }, 1000);
  };

//Send data to database
  
  onSubmitImage() {
    //this.result.Date[0] = this.oldDate
    this.successAlert = false;
    this.result = {
      Patient_Name: [this.formTable.get('patientName').value,this.formTable.get('patientName_Confidence').value],
      Date:  [this.formTable.get('reportDate').value,this.formTable.get('reportDate_Confidence').value],
      Impression:  [this.formTable.get('impression').value,this.formTable.get('impression_Confidence').value],
      scan_center_name: [this.formTable.get('scanCenterName').value,this.formTable.get('scanCenterName_Confidence').value],
      report_type: [this.formTable.get('reportType').value,this.formTable.get('reportType_Confidence').value]
    };
    console.log(this.result)
    const params = {
      'input':
      {
        '_id': this.selectDropdownId,
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
        this.formTable.reset();
        this.formTable.get('scanCenterName').disable();
        this.formTable.get('patientName').disable();
        this.formTable.get('reportType').disable();
        this.formTable.get('reportDate').disable();
        this.formTable.get('impression').disable();
        this.tableShow = false;
        this.failedCount = this.failedCount + 1;
        this.duplicate_browse =false;
        this.largeImage = true;
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
        this.markForReview = false;
        this.uploadButton = false;
        this.disabledupload = true;
        this.newDocumentInput = false;
        this.zoom = false;
        this.duplicate_browse = false;
        this.DocumentIdUploaded = "";
        this.form.reset();
      }
      else{
        this.errorAlert = true;
      }
    }, (error) => {
      this.errorAlert = true;
      this.failedCount = this.failedCount+1;
    })
  }

//Send data to database
  onSubmitText() {
    this.successAlert = false;
    this.result = {
      Patient_Name: [this.formTable.get('patientName').value,this.formTable.get('patientName_Confidence').value],
      Date:  [this.formTable.get('reportDate').value,this.formTable.get('reportDate_Confidence').value],
      Impression:  [this.formTable.get('impression').value,this.formTable.get('impression_Confidence').value],
      scan_center_name: [this.formTable.get('scanCenterName').value,this.formTable.get('scanCenterName_Confidence').value],
      report_type: [this.formTable.get('reportType').value,this.formTable.get('reportType_Confidence').value]
    };
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
        this.formTable.reset();
        this.formTable.get('scanCenterName').disable();
        this.formTable.get('patientName').disable();
        this.formTable.get('reportType').disable();
        this.formTable.get('reportDate').disable();
        this.formTable.get('impression').disable();
        this.tableShow = false;
        this.duplicate_browse =false;
        this.largeImage = true;
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
        this.markForReview = false;
        this.uploadButton = false;
        this.disabledupload = true;
        this.zoom = false;
        this.duplicate_browse = false;
        this.DocumentIdUploaded = "";
        this.form.reset();
      }
      else{
        this.errorAlert = true;
      }
    }, (error) => {
      this.errorAlert = true;
    })
  }
}
