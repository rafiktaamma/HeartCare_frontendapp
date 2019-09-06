import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {ModalOptionComponent} from '../modal-option/modal-option.component';
import {ModalUploadImageComponent} from '../modal-upload-image/modal-upload-image.component';
import {PageScrollConfig} from 'ng2-page-scroll';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  
  openDialog(): void {
    const dialogRef = this.dialog.open( ModalOptionComponent , {
      height: '400px',
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }
  openDialog2(): void {
    const dialogRef = this.dialog.open( ModalUploadImageComponent , {
      height: '400px',
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  constructor(public dialog: MatDialog) {
    PageScrollConfig.defaultDuration=150;
  }

  ngOnInit() {
  }

}
