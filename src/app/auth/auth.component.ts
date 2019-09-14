import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {AuthentificationService, TokenPayload} from '../authentification.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  credentials: TokenPayload = {
    username_email: '',
    password: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthentificationService

  ) { }






  ngOnInit() {
    /*this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });*/

    // reset login status

  }


  login() {
    this.auth.login(this.credentials).subscribe(tokenResponse => {
      if(tokenResponse.access_token !== undefined){
        this.router.navigateByUrl('/home');
      } else {
        alert(tokenResponse.message);
      }
    }, (err) => {
      console.error(err);
    });
  }



}
