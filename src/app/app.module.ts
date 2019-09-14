import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ImageCropperModule} from 'ngx-image-cropper';

import { HomeComponent } from './home/home.component';
import { ModalOptionComponent } from './modal-option/modal-option.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MAT_RADIO_DEFAULT_OPTIONS, MatInputModule} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { HttpClientModule } from '@angular/common/http';
import { FiledropComponent } from './filedrop/filedrop.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDividerModule} from '@angular/material/divider';
import { ModalUploadImageComponent } from './modal-upload-image/modal-upload-image.component';
import {MatDialogModule} from '@angular/material/dialog';
import {Ng2PageScrollModule} from 'ng2-page-scroll';
import { AuthComponent } from './auth/auth.component';
import {MatCardModule} from '@angular/material/card';
import {UploadService} from './upload.service';
import {MatRadioModule} from '@angular/material/radio';
import {AuthentificationService} from './authentification.service';
import { ImageCropperComponent } from './image-cropper/image-cropper.component';
import { NgxCropperJsModule } from 'ngx-cropperjs-wrapper';
import { ModalEcgImageComponent } from './modal-ecg-image/modal-ecg-image.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ModalOptionComponent,
    FileuploadComponent,
    FiledropComponent,
    ModalUploadImageComponent,
    AuthComponent,
    ImageCropperComponent,
    ModalEcgImageComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    ImageCropperModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    NgxFileDropModule,
    MatProgressBarModule,
    MatDividerModule,
    MatDialogModule,
    Ng2PageScrollModule,
    MatCardModule,
    MatRadioModule,
    NgxCropperJsModule
  ],
  providers: [UploadService,AuthentificationService,{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
