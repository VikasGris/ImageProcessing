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
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      file: new FormControl(null),
    });
  }

  onFileChange($event: any): void {
    this.readFile($event.target)
  }

  readFile(inputValue: any) {
    const inputFile = inputValue.files[0];
    const myReader: FileReader = new FileReader();
    myReader.readAsDataURL(inputFile);
    myReader.onloadend = () => {
      this.file = myReader.result;
      this.hasFinishedReading = true;
    }
  }

  onSubmit() {
    this.service.postResponse(this.file).subscribe(response => {
      console.log(response, "response");
      this.hasFinishedReading = false;
      this.file = null;
    }, (error) => {
      console.log('error', error);
      alert(error.statusText);
    })
  }



}
