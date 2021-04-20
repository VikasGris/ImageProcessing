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
  file;
  form;
  error: any = null;
  isLoading = false;
  hasFinishedReading = false;
  result;

  listOfDocuments: any = ["Deepam", "Clarity", "Aran", "Rasi", "New_Document"];
  

constructor(private service: ResponseService) {    
  }
  
  ngOnInit(): void {
    this.form = new FormGroup({
      files: new FormControl(null),
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
    }
  }

handleReaderLoaded(e) {
  this.base64textString.push('data:image/png;base64,' + btoa(e.target.result));
    console.log(this.base64textString)
  }
  
  selectId(event) {
    console.log(event.target.value);
    this.hasFinishedReading = true
  }
  get f() {
    return this.form.controls;
  }


  onSubmit() {
    this.isLoading = true;
    const params = [{
      '_id':this.form.value.select,
      'page': this.base64textString,
    }
    ];
    console.log('temp', params);
    console.log(this.form.value)
    this.service.postResponse(params).subscribe(response => {
      this.result = response
      this.error = null
    }, (error) => {
      this.error = error.statusText;
      this.isLoading = false
    })
  }

  onSubmitImage() {
    const params = [{
      '_id':this.form.value.select,
      'page': this.base64textString,
    }
    ];
    
    this.service.postResponse(params).subscribe(response => {
      console.log("Success", response)
    }, (error) => {
      console.log("Error", error)
    })
  }

  onSubmitText() {
    this.result = {
      'Name': 'P. Vikas',
      'Age': '21'
    };
    const finalOutput = [
      {
      '_id':this.form.value.select,
      'page': this.base64textString,
      },
      {
        'text':this.result
      }
    ];
    this.service.postResponse(finalOutput).subscribe(response => {
      console.log("Final Response" , response)
    }, (error) => {
      console.log("Final Error" , error);
    })
  }
}
