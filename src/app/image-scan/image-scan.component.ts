import { Component,OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResponseService } from '../response.service';


@Component({
  selector: 'app-image-scan',
  templateUrl: './image-scan.component.html',
  styleUrls: ['./image-scan.component.css']
})
export class ImageScanComponent implements OnInit {
  @ViewChild('myInput') file;
  @ViewChild('closebutton') closebutton;
  @ViewChild('closebutton1') closebutton1;
  @ViewChild('closebutton2') closebutton2;
    
//Variables declarations
  base64textString = [];
  fileNames = [];
  listOfDocuments:string[] = ["Nalan Gastro Centre", "Nalan Diagnostics" , "Pathway Diagnostics","Bioline"];
  result = {};
  result__keys =[];
  result_testreport={};
  result_imp:any[]=[];
  result_date:any[]=[];
  result_others = {};
  showFileName: boolean = false;
  noOfFilesShow: boolean = true;
  result_date_show:boolean = false;
  result_imp_show:boolean = false;
  result_testreport_show:boolean = false;
  Select_document_disabled: boolean = false;
  upArrow:boolean = false;
  downArrow:boolean = false;
  closeIcon:boolean = true;
  disabledupload:boolean=true;
  image_view='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
  form:FormGroup;
  error: boolean = false;
  isLoading:boolean = false;
  selectDropdownId:string="";
  getResult:boolean = false;
  success={code:null,
          message:null};
  uploadFileAlert:boolean = false;
  DropdownId:boolean = false;
  successAlert:boolean = false;
  errorAlert:boolean = false;
  zoom:boolean = false;
  largeImage:boolean = true;
  zoomIcon:boolean = false;
  successCount: number = 0;
  failedCount: number = 0;
  uploadButton:boolean = false;
  responseButton:boolean = false;
  averageTime: number = 10;
  seconds: number = 1;
  averageTime_Index: number = 0;
  avgSeconds: number;
  newDocumentInput = false;
  duplicate_browse = false;
  BrowseId:string='';
  markForReview:boolean = false;
  DocumentIdUploaded:string = '';
  waitForResponse: boolean = false;
  verifyDocumentId:boolean = false;
  invalidDocumentId:boolean = false;
  unKnownError:boolean = false;
  tableShow: boolean = false;
  isUpdate1:boolean = true;
  isUpdate2:boolean = true;
  isUpdate3:boolean = true;
  isUpdate4:boolean = true;
  isUpdate5:boolean = true;

//Constructor for using services
  constructor(private service: ResponseService,private formBuilder: FormBuilder) {
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
    impression_Confidence: [""],
    heamatology_Confidence: [""],
    
  });

  get formTableControls() {
    return this.formTable.controls;
  }
  fileMessage(e) {
    if (e === 0) {
      return "No file chosen."
    }
    else if (e === 1) {
      return (this.fileNames[0])

    }
    else {
      return e + " files"
    }
  }
//Functionality for select file from local storage
  onFileChange(event: any): void {
    this.closeIcon = true;
    this.uploadFileAlert = false;
    var inputFile = event.target.files;
    for (var i = 0; i < inputFile.length; i++){
      this.fileNames.push(inputFile[i].name);
    }
    for (var i = 0; i < inputFile.length; i++){
       if (inputFile[i]) {
        const reader = new FileReader();
        reader.onload = this.handleReaderLoaded.bind(this);
        reader.readAsBinaryString(inputFile[i])
      } 
    }
    if (this.Select_document_disabled === true) {
      this.disabledupload = false;
    }
    
  }

  fileNameShow() {
    this.showFileName = true;
  }
  fileNameNotShow() {
    this.showFileName = false;
  }
//Store files in array
  handleReaderLoaded(e) {
    this.base64textString.push('data:image/png;base64,' + btoa(e.target.result));
    this.image_view = this.base64textString[this.base64textString.length-1];
    this.zoomIcon = true;
    //console.log(this.base64textString)
  }
  

  onUpImage(event) {
    var id = parseInt(event.target.attributes[7].value);
    var temp = this.base64textString[id];
    var temp1 = this.fileNames[id];
    this.base64textString[id] = this.base64textString[id - 1];
    this.fileNames[id] = this.fileNames[id - 1];
    this.base64textString[id - 1] = temp
    this.fileNames[id - 1] = temp1;
  }

  onDownImage(event) {
    var id = parseInt(event.target.attributes[7].value);
    var temp = this.base64textString[id];
    var temp1 = this.fileNames[id];
    this.base64textString[id] = this.base64textString[id + 1];
    this.fileNames[id] = this.fileNames[id + 1];
    this.base64textString[id + 1] = temp;
    this.fileNames[id + 1] = temp1;
  }
  //Function for clicking image to show as large image
  onClick(event){
    console.warn(event)
    this.image_view = this.base64textString[event.target.attributes.id.value]
    //console.log(this.image_view)
  }

//Remove  file from the list
  
  removeSelectedFile(index) {
    this.base64textString.splice(index, 1);
    this.fileNames.splice(index, 1);
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
    this.noOfFilesShow = false;
    this.largeImage = false;
    // if(this.largeImage===true){
    //   this.largeImage = false;
    //   this.BrowseId='';
    // }
    // else if (this.duplicate_browse===true) {
    //   this.duplicate_browse=false;
    //   this.BrowseId='disabled';
    // }
  }

//Image zoomout function
  
  onZoomOut(i,event){
    this.zoom = false;
    this.noOfFilesShow = true;
    this.largeImage = true;
    // if(this.BrowseId==='disabled'){
    //   this.duplicate_browse=true;
    // }
    // else{
    //   this.largeImage = true;
    // }
  }

//Select report type

  selectId(event) {
    this.newDocumentInput = false;
    this.DropdownId = false;
    if (this.form.value.select !== 'Select Document') {
      this.Select_document_disabled = true;
      this.selectDropdownId = this.form.value.select;
      if (this.base64textString.length !== 0) {
        
        this.disabledupload = false;
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

    this.closebutton2.nativeElement.click();
    this.fileNames = [];
    this.error = false;
    this.uploadFileAlert = false;
    this.waitForResponse = false;
    this.duplicate_browse = false;
    this.DropdownId = false;
    this.verifyDocumentId = false;
    this.invalidDocumentId = false;
    this.unKnownError = false;
    this.largeImage = true;
    this.upArrow = false;
    this.downArrow = false;
    //this.form.value.select = null;
    this.image_view = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
    this.zoomIcon = false;
    this.newDocumentInput = false;
    this.markForReview = false;
    this.getResult = false;
    this.base64textString = [];
    
    this.result={};
    this.result_testreport={};
    this.result_imp=[];
    this.result_date=[];
    this.result_others = {};
    this.result_date_show = false;
    this.result_imp_show = false;
    this.result_testreport_show = false;
    this.isLoading = false
    this.responseButton = false;
    this.uploadButton = false;
    this.disabledupload = true; 
    this.tableShow = false;
    this.DocumentIdUploaded = "";
    // this.form.reset();
    this.Select_document_disabled = false;
    this.selectDropdownId = "";
    
  }

  onEdit() {
    this.Select_document_disabled = false;
    this.selectDropdownId = "";
    this.closebutton2.nativeElement.click();
    //this.form.value.select = null;
    this.error = false;
    this.closeIcon = true;
    this.largeImage = true;
    this.upArrow = false;
    this.downArrow = false;
    this.duplicate_browse =false;
    this.uploadFileAlert = false;
    this.waitForResponse = false;
    this.DropdownId = false;
    this.verifyDocumentId = false;
    this.invalidDocumentId = false;
    this.unKnownError = false;
    this.markForReview = false;
    this.getResult = false;
    this.result={};
    this.result_testreport={};
    this.result_imp=[];
    this.result_date=[];
    this.result_others = {};
    this.result_date_show = false;
    this.result_imp_show = false;
    this.result_testreport_show = false;
    this.isLoading = false
    this.responseButton = false;
    this.uploadButton = false;
    this.disabledupload = true; 
    this.tableShow = false;
    this.DocumentIdUploaded = "";
    if (this.tableShow) {
      //console.log(this.tableShow)
      this.getResult = false;
      this.markForReview = false;
    }
  }

  onchangeInput_date(event) {
    this.result_date[0]=event.target.value;
    //console.log(this.result_date[0])
  }
  onchangeInput_imp(event) {
    this.result_imp[0]=event.target.value;
  }
  onchangeInput_others(event) {
    var key = event.target.attributes.id.value;
    var value = event.target.value;
    this.result_others[key][0]=event.target.value;
  }



  onCreateInput(event) {
    var key = event.target.attributes.id.value;
    this.result_testreport[key].push([-1,["","",""],0])
  }
  onchangeInput_0(event) {
    var key = event.target.key;
    //console.log(event)
    var _id = event.target.attributes[3].value;
    //console.log(_id)
    var value = event.target.value;
    //console.log(value)
    this.result_testreport[key][_id][1][0] = value;
  }
  onchangeInput_1(event) {
    var key = event.target.key;
    var _id = event.target.row;
    var value = event.target.value;
    this.result_testreport[key][_id][1][1] = value;
  }
  onchangeInput_2(event) {
    var key = event.target.key;
    var _id = event.target.row;
    var value = event.target.value;
    this.result_testreport[key][_id][1][2] = value;
  }
    

//Send request and get Response to show result
  
  onSubmit() {
    this.successAlert = false;
    this.errorAlert = false;
    this.error = false;
    this.largeImage = false;
    this.zoom = false;
    this.duplicate_browse =true;
    this.tableShow = true;
    this.verifyDocumentId = false;
    this.invalidDocumentId = false;
    this.unKnownError = false;
    this.closeIcon = false;
    this.upArrow = true;
    this.downArrow = true;
    this.count();
    //console.log("Before")
    //console.log(this.result_testreport,this.result_date,this.result_imp,this.result_others)
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
          //console.log(response);
          this.result_testreport = {};
          this.result_date = [];
          this.result_imp = [];
          this.result_others = {};
          this.result = {};
          this.result__keys = [];
          this.result_testreport_show= false;
          this.result_imp_show = false;
          this.result_date_show = false;
          //console.log(response.response)
          this.result__keys = Object.keys(response.response);
          ////console.log(this.result__keys)
          for (var i = 0; i < this.result__keys.length; i++){
            if (this.result__keys[i] === 'Test_Report') {
              this.result_testreport_show= true;
              this.result_testreport= response.response[this.result__keys[i]]
            }
            else if (this.result__keys[i] === 'Impression') {
              this.result_imp_show = true;
              this.result_imp = response.response[this.result__keys[i]]
            }
            else if (this.result__keys[i] === 'Date') {
              this.result_date_show = true;
              this.result_date = response.response[this.result__keys[i]]
            }
            else {
              this.result_others[this.result__keys[i]] = response.response[this.result__keys[i]]
            }
          }
          //console.log("After")
          //console.log(this.result_testreport,this.result_date,this.result_imp,this.result_others)
          //console.log(this.result_others)
          var date = this.result_date[0]
          this.result_date[0] = date.split("-").reverse().join("-")
          this.isLoading = false;
          this.uploadButton = false;
          this.responseButton = false;
          this.getResult = true;
          this.markForReview = true;
          this.averageTime = Math.floor((this.seconds/this.base64textString.length ))
          //console.log(response.code )
          this.waitForResponse=false
          if(this.averageTime < 4){
          this.averageTime = 7
        }
          if (response.code === 20 || response.code === 3) {
            //console.log(response.code)
            this.verifyDocumentId = true
            this.isLoading = false;
            this.responseButton = false;
            this.disabledupload = true;
            this.uploadButton = false;
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
          }
        }, (error) => {
        })
      }
      
    },(error) =>{
      this.error = true;
    })
  }

//Counter for get response
  
  count() {
    this.seconds = this.averageTime * this.base64textString.length;
    this.waitForResponse = true;
    const timer = setInterval(() => { 
     this.seconds = this.seconds - 1;
     if (!this.seconds) clearInterval(timer);
   }, 1000);
  };

  test_button() {
    for (var i = 0; i < this.result__keys.length; i++){
      if (this.result__keys[i] === 'Test_Report') {
        this.result[this.result__keys[i]] = this.result_testreport
      }
      else if (this.result__keys[i] === 'Impression') {
        this.result[this.result__keys[i]] =  this.result_imp
      }
      else if (this.result__keys[i] === 'Date') {
        this.result[this.result__keys[i]] = this.result_date
      }
      else {
        this.result[this.result__keys[i]]=this.result_others[this.result__keys[i]] 
      }
    }
    //console.log(this.result)


  }
//Send data to database

  public onSubmitImage() {
    this.getResult = false;
    this.markForReview = false;
    for (var i = 0; i < this.result__keys.length; i++){
      if (this.result__keys[i] === 'Test_Report') {
        this.result[this.result__keys[i]] = this.result_testreport
      }
      else if (this.result__keys[i] === 'Impression') {
        this.result[this.result__keys[i]] =  this.result_imp
      }
      else if (this.result__keys[i] === 'Date') {
        this.result[this.result__keys[i]] = this.result_date
      }
      else {
        this.result[this.result__keys[i]]=this.result_others[this.result__keys[i]] 
      }
    }
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
    this.closebutton.nativeElement.click();
    this.service.postResponseSaveasImage(params).subscribe(response => {
      this.success = response;
      if(response.code === "success"){
        this.successAlert = true;
        this.tableShow = false;
        this.failedCount = this.failedCount + 1;
        this.duplicate_browse =false;
        this.largeImage = true;
        this.fileNames = [];
        this.base64textString = [];
        this.image_view = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
        this.zoomIcon = false
        //this.form.value.select = null;
        this.result = {};
        this.result_testreport={};
        this.result_imp=[];
        this.result_date=[];
        this.result_others = {};
        this.error = false;
        this.uploadFileAlert = false;
        this.waitForResponse = false;
        this.DropdownId = false;
        this.verifyDocumentId = false;
        this.invalidDocumentId = false;
        this.unKnownError = false;
        this.result_date_show = false;
        this.result_imp_show = false;
        this.result_testreport_show = false;
        this.getResult = false;
        this.markForReview = false;
        this.uploadButton = false;
        this.disabledupload = true;
        this.newDocumentInput = false;
        this.zoom = false;
        this.duplicate_browse = false;
        this.DocumentIdUploaded = "";
        this.Select_document_disabled = false;
        this.selectDropdownId = "";
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
  public onSubmitText() {
    for (var i = 0; i < this.result__keys.length; i++){
      if (this.result__keys[i] === 'Test_Report') {
        this.result[this.result__keys[i]] = this.result_testreport
      }
      else if (this.result__keys[i] === 'Impression') {
        this.result[this.result__keys[i]] =  this.result_imp
      }
      else if (this.result__keys[i] === 'Date') {
        this.result[this.result__keys[i]] = this.result_date
      }
      else {
        this.result[this.result__keys[i]]=this.result_others[this.result__keys[i]] 
      }
    }
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
    this.closebutton1.nativeElement.click();
    this.service.postResponseSaveasText(finalOutput).subscribe(response => {
       this.success = response;
      if(response.code === "success"){
        this.successAlert = true;
        this.successCount = this.successCount + 1;
        //console.log(this.successCount)
        this.tableShow = false;
        this.duplicate_browse =false;
        this.largeImage = true;
        this.fileNames = [];
        this.base64textString = [];
        this.image_view = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
        this.zoomIcon = false
        //this.form.value.select = null;
        this.getResult = false;
        this.result = {};
        this.result_testreport={};
        this.result_imp=[];
        this.result_date=[];
        this.result_others = {};
        this.error = false;
        this.uploadFileAlert = false;
        this.waitForResponse = false;
        this.DropdownId = false;
        this.verifyDocumentId = false;
        this.invalidDocumentId = false;
        this.unKnownError = false;
        this.result_date_show = false;
        this.result_imp_show = false;
        this.result_testreport_show = false;
        this.markForReview = false;
        this.uploadButton = false;
        this.disabledupload = true;
        this.zoom = false;
        this.duplicate_browse = false;
        this.DocumentIdUploaded = "";
        this.Select_document_disabled = false;
        this.selectDropdownId = "";
      }
      else{
        this.errorAlert = true;
      }
    }, (error) => {
      this.errorAlert = true;
    })
  }
}
