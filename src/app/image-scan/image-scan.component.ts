import { HttpClient } from '@angular/common/http';
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

  constructor(private service: ResponseService, private http: HttpClient) {
    
    this.file;
  }

  onFileChange($event: any): void {
    this.readThis($event.target)
       
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      files: new FormControl(null),
    });
  }

  readThis(inputValue: any) {
    const inputFile: File = inputValue.files[0];
    console.log(inputFile)
    const myReader: FileReader = new FileReader();
    console.log(myReader);
    myReader.readAsDataURL(inputFile);
    myReader.onloadend = () => {
      this.file = myReader.result;
      let jsonstring = JSON.stringify(this.file);
      const temp = {
        '_id':1,
        'page': jsonstring
      };
      console.log('JSON Data', temp);
      this.hasFinishedReading = true;
    }
}

  

  onSubmit() {
    this.service.postResponse(this.file).subscribe(response => {
      console.log(response, "response");
      console.log(this.file);
      this.hasFinishedReading = false;
      this.file = null;
    }, (error) => {
      console.log('error', error);
      alert(error.statusText);
    })
  }
}
