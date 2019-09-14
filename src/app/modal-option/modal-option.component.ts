import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {UploadService} from '../upload.service';
import {AuthentificationService} from '../authentification.service';
import {MatDialogRef, MatStepper} from '@angular/material';
import {HomeComponent} from '../home/home.component';

@Component({
  selector: 'app-modal-option',
  templateUrl: './modal-option.component.html',
  styleUrls: ['./modal-option.component.scss']
})
export class ModalOptionComponent implements OnInit {
  @ViewChild('stepper',{static : false}) stepper: MatStepper;
  public files: NgxFileDropEntry[] = [];
  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: number = null;
  uploadedFilePath: string = null;
  Reponse_Result : boolean =false;  //orignaly false
  EcgsampleRate: number =null;
  A_Ratio : any ;
  L_Ratio : any ;
  N_Ratio : any ;
  P_Ratio : any ;
  R_Ratio : any ;
  V_Ratio : any ;
  SelectedCat = '';

  constructor(private _formBuilder: FormBuilder,private http: HttpClient,private uploadSerive : UploadService,
               public dialogRef: MatDialogRef<HomeComponent>
              ,public auth: AuthentificationService) {}

  ngOnInit() {

  }

  move(index: number) {
    this.stepper.selectedIndex = index;
  }


  MaxChoice() : string{
    if(this.A_Ratio ==  Math.max(this.A_Ratio,this.L_Ratio,this.N_Ratio,this.P_Ratio,this.R_Ratio,this.V_Ratio)) return '1' ;
    else if (this.L_Ratio ==  Math.max(this.A_Ratio,this.L_Ratio,this.N_Ratio,this.P_Ratio,this.R_Ratio,this.V_Ratio)) return '2' ;
    else if (this.N_Ratio ==  Math.max(this.A_Ratio,this.L_Ratio,this.N_Ratio,this.P_Ratio,this.R_Ratio,this.V_Ratio)) return '3' ;
    else if (this.P_Ratio ==  Math.max(this.A_Ratio,this.L_Ratio,this.N_Ratio,this.P_Ratio,this.R_Ratio,this.V_Ratio)) return '4' ;
    else if (this.R_Ratio ==  Math.max(this.A_Ratio,this.L_Ratio,this.N_Ratio,this.P_Ratio,this.R_Ratio,this.V_Ratio)) return '5' ;
    else if (this.V_Ratio ==  Math.max(this.A_Ratio,this.L_Ratio,this.N_Ratio,this.P_Ratio,this.R_Ratio,this.V_Ratio)) return '6' ;


  }










  fileProgress(fileInput: any) {

    this.fileData = <File>fileInput.target.files[0];

  }



  onSubmit() {
    this.uploadSerive.UploadFile(this.fileData,this.EcgsampleRate).subscribe(
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
          this.move(2);
          console.log('SUCCESS !!');

        }
      });
  }


    Correct(){
    console.log(this.fileData);
    console.log(this.SelectedCat);
    this.uploadSerive.CorrectFile(this.fileData , <string> this.SelectedCat).subscribe(res => console.log(res))

  }



  onNoClick(): void {
     this.dialogRef.close();
    this.Reponse_Result=false;
  }


  public fileOver(event){
    console.log(event);
  }

  public fileLeave(event){
    console.log(event);
  }
  IsImageUploaded():boolean {
    //console.log(this.fileData);
    return this.fileData!=null ;
  }


  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    console.log(this.files);
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;

        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);
          this.fileData=file;

          /**
           // You could upload it like this:
           const formData = new FormData()
           formData.append('logo', file, relativePath)

           // Headers
           const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })

           this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
           .subscribe(data => {
            // Sanitized logo returned from backend
          })
           **/

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }


}
