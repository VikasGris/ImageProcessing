import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ResponseService } from '../response.service';

@Component({
  selector: 'app-image-scan',
  templateUrl: './image-scan.component.html',
  styleUrls: ['./image-scan.component.css']
})
export class ImageScanComponent implements OnInit {
  base64textString = [];
  listOfDocuments: any = ["Deepam", "Clarity", "Aran", "Rasi", "New_Document"];
  result = {
    Age: null,
    Patient_Name: null,
    Sex: null,
    Date: null,
    Impression: null,
  };
  form;
  error: any = null;
  isLoading = false;
  hasFinishedReading = false;
  selectDropdownId;
  idSelected = false;
  finalresult;
  successAlert:boolean = false;
  errorAlert:boolean = false;

  

  constructor(private service: ResponseService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      files: new FormControl(''),
      select: new FormControl("", Validators.required)
    });
  }

  onFileChange(event: any): void {
    var inputFile = event.target.files[0];
    if (inputFile) {
      const reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(inputFile)
      this.hasFinishedReading = true;
      console.log(this.hasFinishedReading)
    }
  }

  handleReaderLoaded(e) {
    this.base64textString.push('data:image/png;base64,' + btoa(e.target.result));
    //console.log(this.base64textString)
  }

  selectId(event) {
     //console.log(event.target.value);
     this.selectDropdownId = this.form.value.select;
    this.idSelected = true
    console.log(this.idSelected)
  }
  get f() {
    return this.form.controls;
  }


  onSubmit() {
    const params = {
      '_id': this.selectDropdownId,
      'page': this.base64textString,
    };
    
    //console.log('temp', params);
    //console.log(this.form.value)
    this.service.postResponse(params).subscribe(response => {
      this.result = response
      this.error = null
      this.isLoading = true;
    }, (error) => {
      this.error = error.statusText;
      this.isLoading = false
    })
  }

  onSubmitImage() {
    const params = {
      '_id': this.form.value.select,
      'page': this.base64textString,
    };

    this.service.postResponseSave(params).subscribe(response => {
      console.log("Success", response)
    }, (error) => {
      console.log("Error", error)
    })
  }

  onSubmitText() {
    this.finalresult = this.result;
    const finalOutput = {
      'r':
      {
        '_id': this.form.value.select,
        'page': this.base64textString,
      },
      's': {
        'text': this.finalresult
      }
    };
    this.service.postResponseSave(finalOutput).subscribe(response => {
      if(response.code === "success"){
        this.successAlert = true;
        this.base64textString = [];
        this.result = null;
        this.form.value.select = null;
        this.form.reset();
        console.log(this.form.reset())
      }
      else{
        this.errorAlert = true;
      }
      
      console.log("Final Response", response)
    }, (error) => {
      console.log("Final Error", error);
    })
  }
}
