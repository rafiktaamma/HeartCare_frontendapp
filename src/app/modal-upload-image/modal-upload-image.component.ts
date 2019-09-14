import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {MatDialogRef} from '@angular/material';
import {HomeComponent} from '../home/home.component';
import {UploadService} from '../upload.service';
import {AuthentificationService} from '../authentification.service';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-modal-upload-image',
  templateUrl: './modal-upload-image.component.html',
  styleUrls: ['./modal-upload-image.component.scss']
})
export class ModalUploadImageComponent implements OnInit {
  imageChangedEvent: any = '';
  croppedImage: any = '';
 // croppedImage2: any = '';


  public files: NgxFileDropEntry[] = [];
  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: number = null;
  Reponse_Result : boolean =false;
  uploadedFilePath: string = null;
   step2 : boolean = false;
   A_Ratio : any ;
   L_Ratio : any ;
   N_Ratio : any ;
   P_Ratio : any ;
   R_Ratio : any ;
   V_Ratio : any ;
  SelectedCat = '';
  //

  //


  MaxChoice() : string{
    if(this.A_Ratio ==  Math.max(this.A_Ratio,this.L_Ratio,this.N_Ratio,this.P_Ratio,this.R_Ratio,this.V_Ratio)) return 'A' ;
    else if (this.L_Ratio ==  Math.max(this.A_Ratio,this.L_Ratio,this.N_Ratio,this.P_Ratio,this.R_Ratio,this.V_Ratio)) return 'L' ;
    else if (this.N_Ratio ==  Math.max(this.A_Ratio,this.L_Ratio,this.N_Ratio,this.P_Ratio,this.R_Ratio,this.V_Ratio)) return 'N' ;
    else if (this.P_Ratio ==  Math.max(this.A_Ratio,this.L_Ratio,this.N_Ratio,this.P_Ratio,this.R_Ratio,this.V_Ratio)) return 'P' ;
    else if (this.R_Ratio ==  Math.max(this.A_Ratio,this.L_Ratio,this.N_Ratio,this.P_Ratio,this.R_Ratio,this.V_Ratio)) return 'R' ;
    else if (this.V_Ratio ==  Math.max(this.A_Ratio,this.L_Ratio,this.N_Ratio,this.P_Ratio,this.R_Ratio,this.V_Ratio)) return 'V' ;


  }


  /// stepper functions





  // Event fired after view is initialized





  //


  constructor(private _formBuilder: FormBuilder,private http: HttpClient,
              /*public dialogRef: MatDialogRef<HomeComponent>,*/
               private uploadSerive : UploadService , public auth: AuthentificationService ) {}


   onNoClick(): void {
   // this.dialogRef.close();
    this.Reponse_Result=false;
  }

  ngOnInit() {

  }

   IsImageUploaded():boolean {
    //console.log(this.fileData);
    return this.fileData!=null;
   }


Correct() {
    console.log(this.croppedImage);
    console.log("correct");
    this.uploadSerive.CorrectImage(<File>this.croppedImage , this.SelectedCat).subscribe(res => console.log(res))
}






  fileProgress(fileInput: any) {
     console.log(fileInput);
    this.fileData = <File>fileInput.target.files[0];
    this.imageChangedEvent = fileInput;
   // console.log(this.imageChangedEvent)
  }

  /*preview() {
    // Show preview
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/!*!/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }
  }*/



  onSubmit() {

      this.uploadSerive.UploadImage(this.fileData).subscribe(
        events => {
          if(events.type === HttpEventType.UploadProgress) {
            this.fileUploadProgress = Math.round(events.loaded / events.total * 100) ;
            console.log(this.fileUploadProgress);

          } else if(events.type === HttpEventType.Response) {
            //this.fileUploadProgress = 0;
            this.Reponse_Result=true;
            console.log(events.body);
            this.A_Ratio=events.body.result.A*100;
            this.L_Ratio=events.body.result.L*100;
            this.N_Ratio=events.body.result.N*100;
            this.P_Ratio=events.body.result.P*100;
            this.R_Ratio=events.body.result.R*100;
            this.V_Ratio=events.body.result.V*100;
            this.SelectedCat=this.MaxChoice();
            console.log('SUCCESS !!');

          }
      });



  }






  public fileOver(event){
    console.log(event);

  }

  public fileLeave(event){
    console.log(event);
  }





  public dropped(files: any ) {
    /*this.imageChangedEvent=files;
    console.log(this.imageChangedEvent);*/
    this.files = <NgxFileDropEntry[]>files;
    for (const droppedFile of this.files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;

        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);
          this.fileData=file;





        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }



  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    // this.croppedImage2 = event.file;

    console.log("image cropped");
    //console.log(this.croppedImage)
  }



  imageLoaded() {

  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }




}
