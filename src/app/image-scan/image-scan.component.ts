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
  listOfDocuments: any = ["Nalan Gastro Centre", "Pathway Diagnostics", "New_Document"];
  result:any = {
    Patient_Name: [null, null],
    Date:  [null, null],
    Impression:  [null, null],
    scan_center_name: [null, null],
    report_type: [null, null],
  };
  editData;
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
  averageTime = [15,15,15,15,15];
  seconds = 0;
  averageTime_Index = 0;
  avgSeconds = 15;
  inputEnable = false;
  res = null;
  resid = null;
  newDocumentInput = false;
  duplicate_browse = false;
  BrowseId='';
  markForReview = false;
  startTime;
  endTime;
  gettime;
  bgColor='green';
  closeResult;
  DocumentIdUploaded = '';
  verifyDocumentId:boolean = false;
  invalidDocumentId:boolean = false;
  unKnownError:boolean = false;
  tableShow:boolean = false;
  isUpdate1:boolean = true;
  isUpdate2:boolean = true;
  isUpdate3:boolean = true;
  isUpdate4:boolean = true;
  isUpdate5:boolean = true;


  //di = {'Patient Name':'Patient_Name','Scan Center':'scan_center_name',"Impression":'Impression'}
 di={}

  constructor(private service: ResponseService,private modalService: NgbModal,private formBuilder: FormBuilder,) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      files: new FormControl(null,Validators.required),
      select: new FormControl(null, Validators.required)
    });
    this.formTable.get('scanCenterName').disable();
    this.formTable.get('scanCenterName_Confidence').disable();
    this.formTable.get('patientName').disable();
    this.formTable.get('patientName_Confidence').disable();
    this.formTable.get('reportType').disable();
    this.formTable.get('reportType_Confidence').disable();
    this.formTable.get('reportDate').disable();
    this.formTable.get('reportDate_Confidence').disable();
    this.formTable.get('impression').disable();
    this.formTable.get('impression_Confidence').disable();
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

  fncolor(c){
    if(c>=85){
      return "green"
    }
    else if(c>=70 && c<85){
      return "olive"
    }
    else if(c>=50 && c<70){
      return "orange"
    }
    else if(c>=30 && c<50){
      return "maroon"
    }
    else if(c<30){
      return "red"
    }
    else{
      //pass
    }
  }


  
  new():void{
    /* let di1={}
    for (let resultkey in this.result){
      for(let key in this.di){
        
        if(this.di[key] === resultkey ){
          di1[key] = this.di[key]
          //console.log(key,this.di[key])  }
  }
  }*/
  
    for (let key in this.result){
      //console.log(this.result[key])
      if(this.result[key][1] === null){
        ////console.log('null detect' ,val)
      }
      else{
        this.di[key]=this.result[key]
        //arr = ['Patr',this.result[key][0],this.result[key][1]]
  
          ////console.log('not null')
      }
    }
    //console.log(this.di)
  
  }

//Functionality for select file from local storage
  onFileChange(event: any): void {
    this.closeIcon = true;
    var inputFile = event.target.files[0];
    if (inputFile) {
      const reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(inputFile)
    }   
  }

//Store files in array
  handleReaderLoaded(e) {
    this.base64textString.push('data:image/png;base64,' + btoa(e.target.result));
    this.image_view = this.base64textString[this.base64textString.length-1];
    this.zoomIcon = true;
    ////console.log(this.base64textString)
  }

  
  onClick(event){
    this.image_view = this.base64textString[event.target.attributes.id.value]
  }

//Functionality for edit option given to displaying result

  onUpdate(){
    console.log(this.formTable.get('scanCenterName').value);
  }

  openEditableInput1(){
    this.formTable.get('scanCenterName').enable();
    this.formTable.get('scanCenterName_Confidence').enable();
    //this.isUpdate1 = false;
  }
  openEditableInput2(){
    this.formTable.get('patientName').enable();
    this.formTable.get('patientName_Confidence').enable();
    //this.isUpdate2 = false;
  }
  openEditableInput3(){
    this.formTable.get('reportType').enable();
    this.formTable.get('reportType_Confidence').enable();
    //this.isUpdate3 = false;
  }
  
  openEditableInput4(){
    this.formTable.get('reportDate').enable();
    this.formTable.get('reportDate_Confidence').enable();
    console.log(this.formTable.get('reportDate').value)
    //this.isUpdate4 = false;
  }
  openEditableInput5(){
    this.formTable.get('impression').enable();
    this.formTable.get('impression_Confidence').enable();
    //this.isUpdate5 = false;
  }

  onDiscardChange(event){
    //this.res = this.result[this.resid][0]
    this.inputEnable = false;
  }

//Remove  file from the list
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
      },5000)
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
    else{
      //pass
    }
    
    
    //console.log(this.largeImage)
  }

//Image zoomout function
  onZoomOut(i,event){
    this.zoom = false;
    //this.largeImage = true;
    //this.duplicate_browse=true;
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
    if(this.form.value.select!=='Select Document'){
      this.selectDropdownId = this.form.value.select;
      this.disabledupload = false;
      

      if(this.selectDropdownId==="New_Document"){
        this.newDocumentInput = true;
        this.disabledupload = true;
        this.markForReview = true;
      }
      else{
        //this.newDocumentInput = false;
        this.markForReview = false;
        //this.disabledupload = false;

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
      //this.newDocumentInput = false;
      this.disabledupload = true;
      this.DropdownId = true;
      setTimeout(() =>{
        this.DropdownId = false;
      },3000)
    } 
  }

//Get report type from user
  onChangeReport(event){
    //console.log(event.target.value);
    this.selectDropdownId = event.target.value;
    //console.log(this.selectDropdownId)
  }
  

  get f() {
    return this.form.controls;
  }

//Reset form fields and some other fields
  onReset(){
    this.duplicate_browse =false;
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
    this.disabledupload = true; 
    this.formTable.reset();
    this.formTable.get('scanCenterName').disable();
    this.formTable.get('patientName').disable();
    this.formTable.get('reportType').disable();
    this.formTable.get('reportDate').disable();
    this.formTable.get('impression').disable();
    this.tableShow = false;
  }
  
//Send request and get Response to show result
  onSubmit() {
    this.startTime = new Date().getTime();
    this.largeImage = false;
    this.duplicate_browse =true;
    this.tableShow = true;
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
          console.log(response.code)
          this.result = response.response;
          this.formTable.patchValue({
            scanCenterName : this.result.scan_center_name[0],
            scanCenterName_Confidence:this.result.scan_center_name[1],
            patientName:this.result.Patient_Name[0],
            patientName_Confidence:this.result.Patient_Name[1],
            reportType:this.result.report_type[0],
            reportType_Confidence:this.result.report_type[1],
            reportDate:this.result.Date[0],
            reportDate_Confidence:this.result.Date[1],
            impression:this.result.Impression[0],
            impression_Confidence:this.result.Impression[1]
          });
          console.log(this.result);
          this.isLoading = false;
          this.uploadButton = false;
          this.responseButton = false;
          this.getResult = true;
          this.markForReview = true;
          
          this.closeIcon = false;
          // this.averageTime = Math.floor((this.seconds ))
          // if(this.seconds === 0){
          //   alert("It's taking longer than expected..Please wait") 
          // }
          // if(this.averageTime < 4){
          //   this.averageTime = 7
          // }
          // //console.log(this.averageTime)
          this.endTime = new Date().getTime()
          //console.log(this.endTime)
          this.seconds = this.startTime - this.endTime;
          if(this.averageTime_Index>=5){
            this.averageTime_Index=0;
          }
          this.averageTime[this.averageTime_Index]=(this.seconds)
          this.averageTime_Index=this.averageTime_Index + 1;
          //console.log(this.averageTime)
          for(var i=0;i<this.averageTime.length;i++){
            this.avgSeconds =this.avgSeconds + this.averageTime[i];
          }
          this.avgSeconds = Math.floor((this.avgSeconds/5 ))
          if(response.code === 20){
            this.verifyDocumentId = true
            setTimeout(() =>{
              this.verifyDocumentId = false;
              
            },5000)
            this.isLoading = false;
            this.responseButton = false;
            this.disabledupload = true;
            this.uploadButton = false;
            this.getResult = false
          }
          else if(response.code === 2){
            this.invalidDocumentId = true;
            setTimeout(() =>{
              this.invalidDocumentId = false;
              
            },5000)
            this.isLoading = false;
            this.responseButton = false;
            this.disabledupload = true;
            this.uploadButton = false;
            this.getResult = false
          }
          else if(response.code === 0 || response.code === 5 || response.code === 10 || response.code === 15){
            this.unKnownError = true;
            setTimeout(() =>{
              this.unKnownError = false;
              
            },5000)
            this.isLoading = false;
            this.responseButton = false;
            this.disabledupload = true;
            this.uploadButton = false;
            this.getResult = false
          }
        }, (error) => {
          // this.error = true;
          //     setTimeout(() =>{
          //       this.error = false;
          //     },5000)
          // this.isLoading = false;
          // this.uploadButton = false;
          // this.responseButton = false;
        })
      }
      
    },(error) =>{
      this.error = true;
        setTimeout(() =>{
          this.error = false;
        },5000)
    })
  }

//Counter for get response
  // count() {
  //   this.seconds = this.averageTime;
  //   //console.log(this.seconds)
  //   const timer = setInterval(() => {
  //     if(this.seconds>0){
  //       this.seconds = this.seconds - 1;
       
  //     }
  //     if (!this.seconds) clearInterval(timer);
  //     }, 1000);
  // };

//Send data to database
  onSubmitImage() {
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
    //console.log(params)
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
      //console.log(this.failedCount)
    })
  }

//Send data to database
  onSubmitText() {
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
