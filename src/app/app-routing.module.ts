import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CropPageComponent} from './crop-page/crop-page.component';
import {HomeComponent} from './home/home.component';
import {ModalOptionComponent} from './modal-option/modal-option.component';
import {FileuploadComponent} from './fileupload/fileupload.component';
import {FiledropComponent} from './filedrop/filedrop.component';
import {ModalUploadImageComponent} from './modal-upload-image/modal-upload-image.component';

const routes: Routes = [
  {path :'crop',component: CropPageComponent },
  {path :'hom',component:HomeComponent},
  {path :'modal',component:ModalOptionComponent},
  {path : 'upload', component:FileuploadComponent},
  {path : 'drop', component:FiledropComponent},
  {path : 'modal2',component:ModalUploadImageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
