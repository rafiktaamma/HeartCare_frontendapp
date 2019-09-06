import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ImageCroppedEvent} from 'ngx-image-cropper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit ,AfterViewInit{

  title = 'proj';

  @ViewChild('text1',{static :false}) text1;
  @ViewChild('image1',{static :false}) image1;


  imageChangedEvent: any = '';
  croppedImage: any = '';
  constructor(){
  /*  console.log(this.text1.innerText)*/
    /*this.text1=document.getElementById('t1');*/
    //console.log(this.text1.innerText);

  }
  ngOnInit(): void {
    //console.log(this.p.nativeElement.innerText)

  }

  fileChangeEvent(event: any): void {
    console.log(event);
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  ngAfterViewInit(): void {
    console.log(this.text1.nativeElement.innerText)
    this.text1.nativeElement.innerText="souad";
    //this.f1()
  }

  f1(e:any) {

      var offset = this.image1.nativeElement;
      console.log(offset.offsetLeft);
      var X = (e.pageX - offset.offsetLeft);
      var Y = (e.pageY - offset.offsetTop);
      console.log('X: ' + X.toString() + ', Y: ' + Y);


  }




}
