import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';
import {HttpClient, HttpEventType} from '@angular/common/http';

@Component({
  selector: 'app-modal-option',
  templateUrl: './modal-option.component.html',
  styleUrls: ['./modal-option.component.scss']
})
export class ModalOptionComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  public files: NgxFileDropEntry[] = [];
  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: number = null;
  uploadedFilePath: string = null;

  constructor(private _formBuilder: FormBuilder,private http: HttpClient) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }










  fileProgress(fileInput: any) {

    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('files', this.fileData);

    this.fileUploadProgress = 0;

    this.http.post('https://us-central1-tutorial-e6ea7.cloudfunctions.net/fileUpload', formData, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(events => {
        if(events.type === HttpEventType.UploadProgress) {
          this.fileUploadProgress = Math.round(events.loaded / events.total * 100) ;
          console.log(this.fileUploadProgress);
        } else if(events.type === HttpEventType.Response) {
          this.fileUploadProgress = 0;
          console.log(events.body);
          alert('SUCCESS !!');
        }

      })
  }

  /*onSubmit() {
    const formData = new FormData();
    formData.append('file', this.fileData);
    this.http.post('https://us-central1-tutorial-e6ea7.cloudfunctions.net/fileUpload', formData)
      .subscribe(res => {
        console.log(res);
        this.uploadedFilePath = res.data.filePath;
        alert('SUCCESS !!');
      });
  }*/




  public fileOver(event){
    console.log(event);
  }

  public fileLeave(event){
    console.log(event);
  }


  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;

        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);
          this.fileData=file;
          this.preview();
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
