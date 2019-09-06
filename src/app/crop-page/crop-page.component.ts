import { Component, OnInit } from '@angular/core';
import {ImageCroppedEvent} from 'ngx-image-cropper';

@Component({
  selector: 'app-crop-page',
  templateUrl: './crop-page.component.html',
  styleUrls: ['./crop-page.component.scss']
})
export class CropPageComponent implements OnInit {


  imageChangedEvent: any = '';
  croppedImage: any = '';
  imageload=false;
  valid=false;
  valider(){
    this.valid=true;
  }
  annuler(){
    this.imageload=false;
    this.imageChangedEvent='';
    this.croppedImage='';
    this.valid=false;
  }
  fileChangeEvent(event: any): void {
    this.valid=false;

    console.log(event);
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    console.log("image cropped");
    console.log(this.croppedImage)
  }
  imageLoaded() {
    this.imageload=true;
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }



  constructor() { }

  ngOnInit() {
  }

}
