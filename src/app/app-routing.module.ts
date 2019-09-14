import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './home/home.component';
import {ModalOptionComponent} from './modal-option/modal-option.component';
import {FileuploadComponent} from './fileupload/fileupload.component';
import {FiledropComponent} from './filedrop/filedrop.component';
import {ModalUploadImageComponent} from './modal-upload-image/modal-upload-image.component';
import {AuthComponent} from './auth/auth.component';

import {ImageCropperComponent} from './image-cropper/image-cropper.component';
import {ModalEcgImageComponent} from './modal-ecg-image/modal-ecg-image.component';


const routes: Routes = [

  {path :'' , component: HomeComponent},
 /* {path :'home' , component: HomeComponent},*/
  {path :'modal' , component: ModalOptionComponent},
  {path : 'upload', component: FileuploadComponent},
  {path : 'drop', component: FiledropComponent},
  {path : 'modal2', component: ModalUploadImageComponent},
  {path : 'auth' , component: AuthComponent},
  {path : 'crop' , component : ImageCropperComponent},
  {path : 'Modalcrop' , component : ModalEcgImageComponent},
  {path :"**" , redirectTo : ""}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
