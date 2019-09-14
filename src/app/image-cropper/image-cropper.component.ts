import { Component, OnInit } from '@angular/core';
import {CropperOptions} from 'ngx-cropperjs-wrapper';
import {DomSanitizer} from '@angular/platform-browser';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss']
})
export class ImageCropperComponent  {

  public fileInput: any = null;
  public CroppedImage ;
  public test;

  // Config for cropper.js (see official cropper.js repo for complete list of available options)
  public options = {

    movable: false,
    autoCrop : true,
    background : false ,
    scalable: true,
    zoomable: false,
    dragMode : 'move' ,
    viewMode: 1,
    /*aspectRatio: 1,*/
  } as CropperOptions;
  private base64data: string | ArrayBuffer;

  onFilePick(event: any) {
    // Feed selected file to cropper
    this.fileInput = event.target.files.item(0);
  }

  onFail(error) {
    console.error(error);
  }


  readFile(file: File): Observable<any> {
    const sub = new Subject<any>();
    var reader = new FileReader();

    reader.onload = () => {
      console.log(reader.result);
      const content  = reader.result  ;
      sub.next(content);
      sub.complete();
    };

    reader.readAsDataURL(file);
    return sub.asObservable();
  }


  onFileChange(file: File) {
    // TODO: upload file to backend

    this.readFile(file).subscribe((output) => {
     this.CroppedImage=output;
    })

    /*
     let objectURL = URL.createObjectURL(file);
     this.CroppedImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      console.log(this.CroppedImage)    */


  }




  constructor(private sanitizer : DomSanitizer) {
  }

  onCrop(file : File){

    console.log(file)


  }


}
