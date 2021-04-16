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
  public file;
  form;

  constructor(private service: ResponseService, private http: HttpClient) {
  }

  onFileChange($event: any): void {
    this.readThis($event.target)
  }

  readThis(inputValue: any) {
    const inputFile = inputValue.files[0];
    const myReader: FileReader = new FileReader();
    let fileOutput;
    myReader.readAsDataURL(inputFile);
    myReader.onloadend = function (e) {
      fileOutput = myReader.result;
    }
    this.file = fileOutput;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      file: new FormControl(null),
    });
  }

  onSubmit() {
    this.service.postResponse(this.file).subscribe(response => {
      console.log(response, "response")
    }, (error) => {
      console.log('error', error);
      alert(error.statusText);
    })
  }



}
