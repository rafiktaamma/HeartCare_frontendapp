import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthentificationService} from './authentification.service';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  url_result_image = 'http://54.145.191.230/predict/light_prepare';
  url_result_file = 'http://54.145.191.230/predict/file2image';
  url_labeling_image ='http://54.145.191.230/labelling/cnn';
  url_labeling_file ='http://54.145.191.230/labelling/svm';

  constructor(private http : HttpClient, public  auth : AuthentificationService) { }


  UploadImage(f : File , NumberPulses : number): Observable<any>{
    const formData = new FormData();
    formData.append('v5', f);
    let x = <unknown> NumberPulses
    formData.append('pulses',<string> x);

   // http://127.0.0.1:5000/
    // https://us-central1-tutorial-e6ea7.cloudfunctions.net/fileUpload
    return this.http.post<any>(this.url_result_image, formData ,{
      reportProgress: true,
        observe: 'events'
    })
  }

  UploadFile(f : File,SamplingRate : number): Observable<any>{
    const formData = new FormData();
    formData.append('myfile', f);
    let x = <unknown> SamplingRate;
    formData.append('rate',<string> x);

    // http://127.0.0.1:5000/
    // https://us-central1-tutorial-e6ea7.cloudfunctions.net/fileUpload
    return this.http.post<any>(this.url_result_file, formData ,{
      reportProgress: true,
      observe: 'events'
    });
  }



  CorrectImage(f : File , Cat : string ) :Observable<any> {

    const header = { headers :new HttpHeaders().set('Authorization',  `Bearer ${this.auth.getAccessToken()}`) };
    const formData = new FormData();
    formData.append('entryFile', f );
    formData.append('label',Cat);

    return this.http.post<any>(this.url_labeling_image ,formData, header)

  }

  CorrectFile(f : File , Cat : string ) :Observable<any> {

    const header = { headers :new HttpHeaders().set('Authorization',  `Bearer ${this.auth.getAccessToken()}`) };
    console.log( `Bearer ${this.auth.getAccessToken()}`);
    const formData = new FormData();
    formData.append('entryFile', f );
    formData.append('label',Cat);

    return this.http.post<any>(this.url_labeling_file ,formData, header)

  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };




}
