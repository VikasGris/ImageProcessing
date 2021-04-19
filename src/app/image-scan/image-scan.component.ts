import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ResponseService } from '../response.service';


@Component({
  selector: 'app-image-scan',
  templateUrl: './image-scan.component.html',
  styleUrls: ['./image-scan.component.css']
})
export class ImageScanComponent implements OnInit {
  file;
  form;
  hasFinishedReading = false;
  result;
  error: any = null;
  isLoading=false;

  constructor(private service: ResponseService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      files: new FormControl(null),
    });
  }

  onFileChange($event: any): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any) {
    const inputFile: File = inputValue.files[0];
    // console.log(inputFile)
    const myReader: FileReader = new FileReader();
    // console.log(myReader);
    myReader.readAsDataURL(inputFile);
    myReader.onloadend = () => {
      this.file = myReader.result;
      // let jsonstring = JSON.stringify(this.file);
      // const temp = {
      //   '_id': 1,
      //   'page': this.file
      // };
      // console.log('JSON Data', temp);
      this.hasFinishedReading = true;
    }
  }

  onSubmit() {
    this.isLoading=true;
    // console.log('onsubmit', this.file);
    const params = {
      '_id': 1,
      'page': this.file
    };
    // console.log('temp', params);
    this.service.postResponse(params).subscribe(response => {
      // console.log(response, "response");
      // console.log(this.file);
      this.result = response;
      // this.hasFinishedReading = false;
      // this.file = null;
      this.error = null;
      this.isLoading=false;
    }, (error) => {
      // console.log('error', error);
      this.error = error.statusText;
      this.isLoading=false;
      // alert(error.statusText);
    })
  }
}
