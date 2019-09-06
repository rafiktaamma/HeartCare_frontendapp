import { Component, OnInit } from '@angular/core';
import {HttpClient , HttpEventType} from '@angular/common/http';
import {FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';


@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})
export class FileuploadComponent implements OnInit {

  public files: NgxFileDropEntry[] = [];
  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: number = null;
  uploadedFilePath: string = null;
  constructor(private http: HttpClient) { }



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

  ngOnInit(): void {
  }


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
