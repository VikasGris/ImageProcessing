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
  markForReview = false;
  startTime;
  endTime;
  gettime;
  closeResult;
  verifyDocumentId:boolean = false;
  invalidDocumentId:boolean = false;
  unKnownError:boolean = false;
  editableInput1:boolean = false;
  editableInput2:boolean = false;
  editableInput3:boolean = false;
  editableInput4:boolean = false;
  editableInput5:boolean = false;
  tableShow:boolean = false;
  saveIconShow1:boolean = false;
  saveIconShow2:boolean = false;
  saveIconShow3:boolean = false;
  saveIconShow4:boolean = false;
  saveIconShow5:boolean = false;
  isUpdate:boolean = true;
  isEdit:boolean = false;


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
    alert(this.isEdit);

  }

  

  formTable = this.formBuilder.group({ scanCenterName: [""]});
  get formTableControls() {
    return this.formTable.controls;
  }
  // open(content) {
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //     console.log(content)
  //   }, (reason) => {
      
  //   });
  // }


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
  onEdit(event){
    this.resid= event.target.attributes[1].nodeValue;
    //console.log(this.resid);
    this.res = this.result[event.target.attributes[1].nodeValue][0];
    console.log(this.res);
    this.inputEnable = true;

  }

  onEditData(e){
    console.log(e)
    
    this.res = e.target.value;
    console.log(this.res)
  }

  changeEdit(){
    this.result[this.resid][0]= this.res;
    ////console.log(this.result);
    this.inputEnable = false;
  }

  openEditableInput1(event){
    this.formTable.get('scanCenterName').enable();
    this.isUpdate = false;
    this.isEdit = true;
    console.log(event)
  }
  openEditableInput2(){
    this.editableInput2 = true;
    this.saveIconShow2 = true;
  }
  openEditableInput3(){
    this.editableInput3 = true;
    this.saveIconShow3 = true;
  }
  openEditableInput4(){
    this.editableInput4 = true;
    this.saveIconShow4 = true;
  }
  openEditableInput5(){
    this.editableInput5 = true;
    this.saveIconShow5 = true;
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
    this.largeImage = false;
    //console.log(this.largeImage)
  }

//Image zoomout function
  onZoomOut(i,event){
    this.zoom = false;
    this.largeImage = true;
  }

//Select report type
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

    if(this.selectDropdownId === "New_Document"){
      this.newDocumentInput = true;
      this.disabledupload = true;
      this.markForReview = true;

    }
    else{
      this.newDocumentInput = false;
      this.markForReview = false;
      this.disabledupload = false;
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

  onChangeTime(event){
    
  }


  // onScanTest(){
  //   this.service.postTestResponse().subscribe(response =>{
  //     //console.log("test",response)
  //   }, (error) =>{
  //     //console.log(error)
  //   })
  // }

 

//Send request and get Response to show result
  onSubmit() {
    this.startTime = new Date().getTime();
    this.largeImage = false;
    this.duplicate_browse =true;
    //console.log(this.startTime)
    this.tableShow = true;
    this.service.postTestResponse().subscribe(response =>{
      if(response.code === "success"){
        this.uploadButton = true;
        this.responseButton = true;
        this.isLoading = true;
        this.error = false;
        //this.count();
        const params = {
          '_id': this.selectDropdownId,
          'page': this.base64textString,
        };
        //console.log(params)
        this.service.postResponse(params).subscribe(response => {
          console.log(response.code) //20
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
          else{
          this.result = response.response;
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
