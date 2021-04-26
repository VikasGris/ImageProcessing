import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Dynamsoft from 'dwt';
import { WebTwain } from 'dwt/dist/types/WebTwain';

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
  selectDropdownId;
  getResult = false;
  finalresult;
  success;
  successAlert:boolean = false;
  errorAlert:boolean = false;
  deleteImage;

  //Dynamic Web Twin:
  DWObject:WebTwain;
  selectSources:HTMLSelectElement;
  containerId = 'card1';
  bwASM = Dynamsoft.Lib.env.bMobile || !Dynamsoft.DWT.UseLocalService
  
  

  constructor(private service: ResponseService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      files: new FormControl(null,Validators.required),
      select: new FormControl(null, Validators.required)
    });
    // Dynamsoft.DWT.Containers = [{ WebTwainId: 'dwtObject', ContainerId: this.containerId, Width:'auto', Height:'auto' }];
    // Dynamsoft.DWT.RegisterEvent('OnWebTwainReady', () => { this.Dynamsoft_OnReady(); });
    // console.log(Dynamsoft.DWT)
    // Dynamsoft.DWT.ProductKey = 't00891wAAAJyHArHjdRL0wBNHC47fVCY41/FatXNtYRsY6D/2tMOnqU3ecIoRTzEw1WNKa7lZJEgzA3fD39lzbscdtF5Wtxa/Cwnz3QLUgU8QaQCj65BTN2rtK7Q=';
    // Dynamsoft.DWT.ResourcesPath = 'assets/Resources';
    // Dynamsoft.DWT.Load();
  }

  //DWT

  // Dynamsoft_OnReady(): void {
  //   this.DWObject = Dynamsoft.DWT.GetWebTwain('card1');
  //   let count = this.DWObject.SourceCount;
  //   console.log(count)
  //   this.selectSources = <HTMLSelectElement>document.getElementById("sources");
  //   this.selectSources.options.length = 0;
  //   for (let i = 0; i < count; i++) {
  //     this.selectSources.options.add(new Option(this.DWObject.GetSourceNameItems(i), i.toString()));
  //   }
  // }

  // acquireImage(): void{
  //   if(!this.DWObject){
  //     this.DWObject = Dynamsoft.DWT.GetWebTwain('card1');
  //     console.log(Dynamsoft);
  //     console.log("First If",this.DWObject)
  //   }
  //   if(this.DWObject.SourceCount > 0 && this.DWObject.SelectSourceByIndex(this.selectSources.selectedIndex)){
  //     const onAcquireImageSuccess = () => { this.DWObject.CloseSource();};
  //     const onAcquireImageFailure = onAcquireImageSuccess;
  //     this.DWObject.OpenSource();
  //     this.DWObject.AcquireImage( {}, onAcquireImageSuccess,onAcquireImageFailure);
  //     console.log(this.DWObject)
  //   }
    
  //   else{
  //     alert("No Source Available!");
  //     console.log("No source")
  //   }
  // }

  


  onFileChange(event: any): void {
    var inputFile = event.target.files[0];
    console.log(event.target.files)
    if (inputFile) {
      const reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(inputFile)
    }
  }

  handleReaderLoaded(e) {
    this.base64textString.push('data:image/png;base64,' + btoa(e.target.result));
    console.log(this.base64textString)
  }

  // onDelete(){
  //   this.deleteImage = this.base64textString
  //   console.log(this.deleteImage)
  //   this.deleteImage.shift()
  //   console.log(this.deleteImage)
  // }

  // onRescan(e){
  //   console.log(this.deleteImage)
  //   console.log(this.base64textString)
  //   this.base64textString.splice(0,0,this.onFileChange)
  // }

  selectId(event) {
     //console.log(event.target.value);
     this.selectDropdownId = this.form.value.select;
  }
  get f() {
    return this.form.controls;
  }

  onReset(){
    location.reload();
  }

  onSubmit() {
    this.isLoading = true;
    const params = {
      '_id': this.selectDropdownId,
      'page': this.base64textString,
    };
    this.service.postResponse(params).subscribe(response => {
      this.result = response
      this.error = null
      this.isLoading = false;
      this.getResult = true;
    }, (error) => {
      this.error = error.statusText;
      this.isLoading = false
    })
  }

  onSubmitImage() {
    const params = {
      'input':
      {
        '_id': this.form.value.select,
        'page': this.base64textString,
      },
      'output': {
        'text': this.result
      }
    };

    this.service.postResponseSaveasImage(params).subscribe(response => {
      if(response.code === "success"){
        setTimeout(() =>{
          location.reload();
        },2000)
        this.successAlert = true;
      }
      else{
        this.errorAlert = true;
      }
      console.log("Success", response)
    }, (error) => {
      console.log("Error", error)
    })
  }

  onSubmitText() {
    const finalOutput = {
      'input':
      {
        '_id': this.form.value.select,
        'page': this.base64textString,
      },
      'output': {
        'text': this.result
      }
    };
    this.service.postResponseSaveasText(finalOutput).subscribe(response => {
      // this.success = response;
      // location.reload();
      if(response.code === "success"){
        location.reload()
           this.successAlert = true;
        this.base64textString = [];
        this.result = null;
        this.form.value.select = null;
           this.form.reset();
        console.log(this.form.reset())
      }
      console.log("Final Response", response)
    }, (error) => {
      this.errorAlert = true;
      console.log("Final Error", error);
    })
  }
}
