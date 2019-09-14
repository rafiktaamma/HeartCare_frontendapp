import {Component, OnInit, ViewChild} from '@angular/core';
import {FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {UploadService} from '../upload.service';
import {AuthentificationService} from '../authentification.service';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {FormBuilder} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {CropperOptions} from 'ngx-cropperjs-wrapper';
import {Observable, Subject} from 'rxjs';
import {HomeComponent} from '../home/home.component';
import {MatDialogRef, MatStepper} from '@angular/material';

@Component({
  selector: 'app-modal-ecg-image',
  templateUrl: './modal-ecg-image.component.html',
  styleUrls: ['./modal-ecg-image.component.scss']
})
export class ModalEcgImageComponent implements OnInit {

    imageChangedEvent: any = '';
  croppedImage: any = '';
   croppedImage2: File =null;
  @ViewChild('stepper',{static : false}) stepper: MatStepper;

  public files: NgxFileDropEntry[] = [];
  fileData: File = null;

  previewUrl:any = null;
  fileUploadProgress: number = null;
  Reponse_Result : boolean =false;  //orignaly false
  uploadedFilePath: string = null;
  step2 : boolean = false;
  EcgPulses : number ;
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



  ecg() : boolean {
    return this.EcgPulses>2;
  }

  // Event fired after view is initialized





  //


  move(index: number) {

    this.stepper.selectedIndex = index;
    console.log(this.stepper.selectedIndex);
  }


  constructor(private _formBuilder: FormBuilder,private http: HttpClient,
              public dialogRef: MatDialogRef<HomeComponent>,
              private uploadSerive : UploadService , public auth: AuthentificationService , private sanitizer : DomSanitizer ) {}

  onNoClick(): void {
     this.dialogRef.close();
    this.Reponse_Result=false;
  }

  ngOnInit() {

  }


  IsImageUploaded():boolean {
    //console.log(this.fileData);
    return this.fileData!=null;
  }






  Correct() {
    console.log(this.croppedImage2);

    console.log("correct");
    this.uploadSerive.CorrectImage(this.croppedImage2 , this.SelectedCat).subscribe(res => console.log(res))
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
 /* onSubmit() {
    // i should send the cropped image
    this.uploadSerive.UploadImage(this.croppedImage2 , this.EcgPulses).subscribe(
      events => {
        if(events.type === HttpEventType.UploadProgress) {
          this.fileUploadProgress = Math.round(events.loaded / events.total * 100) ;
          console.log(this.fileUploadProgress);

        } else if(events.type === HttpEventType.Response) {
          //this.fileUploadProgress = 0;
          this.Reponse_Result=true;
          console.log(events.body);
          this.A_Ratio=events.body.A;
          this.L_Ratio=events.body.L;
          this.N_Ratio=events.body.N;
          this.P_Ratio=events.body.P;
          this.R_Ratio=events.body.R;
          this.V_Ratio=events.body.V;

          this.SelectedCat=this.MaxChoice();
          console.log(this.A_Ratio ,this.L_Ratio ,this.N_Ratio ,this.P_Ratio ,this.R_Ratio ,this.V_Ratio );
          console.log('SUCCESS !!');
          this.fileUploadProgress=0;
          this.move(4);

        }
      });




  }*/
  onSubmit() {
    this.uploadSerive.UploadImage(this.croppedImage2 , this.EcgPulses).subscribe(
      events => {
        if (events.type === HttpEventType.UploadProgress) {
          this.fileUploadProgress = Math.round(events.loaded / events.total * 100);
          console.log(this.fileUploadProgress);

        } else if (events.type === HttpEventType.Response) {
          this.fileUploadProgress=0;
          console.log(events.body);
          this.A_Ratio=events.body.A;
          this.L_Ratio=events.body.L;
          this.N_Ratio=events.body.N;
          this.P_Ratio=events.body.P;
          this.R_Ratio=events.body.R;
          this.V_Ratio=events.body.V;
          this.SelectedCat = this.MaxChoice();
          //this.fileUploadProgress = 0;
          this.Reponse_Result = true;
          this.move(4);
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




  // croppper function ----------------------------------


  public options = {

    movable: false,
    autoCrop : true,
    background : false ,
    scalable: true,
    zoomable: false,
    dragMode : 'move' ,

    viewMode: 2,

    /*aspectRatio: 1,*/
  } as CropperOptions;




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

  public blobToFile = (theBlob: Blob, fileName:string): File => {
    var b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;

    //Cast to a File() type
    return <File>theBlob;
  }


  onFileChange(file: File) {
    // TODO: upload file to backend
       this.croppedImage2=this.blobToFile(file , "image");
       //console.log(this.croppedImage2);
    this.readFile(file).subscribe((output) => {
      this.croppedImage=output;
    })

    /*
     let objectURL = URL.createObjectURL(file);
     this.CroppedImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      console.log(this.CroppedImage)    */


  }





  onCrop(file : File){

    console.log(file)


  }






}

