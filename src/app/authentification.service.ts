import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';




export interface UserDetails {
  identity: string;
  email: string;
  name: string;
  exp: number;
  iat: number;
}

interface TokenResponse {
  message: string;
  access_token: string;
  refresh_token: string;
}

export interface TokenPayload {
  username_email: string;
  password: string;
}

export interface User {
  username: string;
  email: string;
  password: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private access_token: string;
  private refresh_token: string;
  apiUrl = 'http://54.145.191.230/auth';

  expired = false;






  constructor(private http: HttpClient, private router: Router) { }

  private saveToken(access_token: string,refresh_token: string): void {
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    this.access_token = access_token;
    this.refresh_token= refresh_token;
  }
  /// it should be private ;
  public getAccessToken(): string {
    if (!this.access_token) {
      this.access_token = localStorage.getItem('access_token');
    }
    return this.access_token;
  }

  private getRefreshToken(): string {
    if (!this.refresh_token) {
      this.refresh_token = localStorage.getItem('refresh_token');
    }
    return this.refresh_token;
  }

  public getUserDetails(): UserDetails {
    const token = this.getAccessToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }


  public refreshTokenExpired(): boolean{
    const token = this.getRefreshToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      if(JSON.parse(payload).exp > Date.now() / 1000){
        return false;
      } else {
        alert('Refresh token has expired');
        return true;
      }

    } else {
      return true;
    }
  }



  public isLoggedIn(): boolean {
    var user = this.getUserDetails();
    if (user) {
      if(user.exp > Date.now() / 1000)
        return true;
      else {
        this.expired = true;
        return false;
      }
    } else
      return false;
  }


  public isAdmin(): boolean{
    if(this.isLoggedIn()){
      const user = this.getUserDetails();
      const username = user.identity.split(',')[0];
      return username ==='admin'?true:false;
    } else{
      return false;
    }
  }

  public getUserName(): string{
    if(this.isLoggedIn()){
      const user = this.getUserDetails();
      const username = user.identity.split(',')[0];
      return username;
    } else {
      return 'not logged in';
    }
  }


  private updateAccessToken(access_token: string) {
    window.localStorage.removeItem('access_token');
    localStorage.setItem('access_token', access_token);
    this.access_token = access_token;
  }




  private request(method: 'post'|'get', type: 'login'|'register'|'profil'|'logout/access'|'logout/refresh'|'token/refresh', user_login?: TokenPayload,user_register?: User): Observable<any> {
    let base;

    if (method === 'post') {
      if(type === 'register')
        base = this.http.post(`${this.apiUrl}/${type}`, user_register);
      else if(type === 'login')
        base = this.http.post(`${this.apiUrl}/${type}`, user_login);
      else if(type === 'logout/access'){
        // console.log('logout access '+this.getAccessToken())
        base = this.http.post<TokenResponse>(`${this.apiUrl}/${type}`, null,{ headers: { Authorization: `Bearer ${this.getAccessToken()}` }});

      }
      else {// when refresh token or logout refresh
        // console.log('logout refresh '+this.getRefreshToken())
        base = this.http.post<TokenResponse>(`${this.apiUrl}/${type}`, null,{ headers: { Authorization: `Bearer ${this.getRefreshToken()}` }});
      }

    } else {
      base = this.http.get(`${this.apiUrl}/${type}`, { headers: { Authorization: `Bearer ${this.getAccessToken()}` }});
    }

    if(type === 'login' || type==='register' || type === 'profil'){
      const request = base.pipe(
        map((data: TokenResponse) => {
          if (data.access_token) {
            this.saveToken(data.access_token,data.refresh_token);
          }
          return data;
        })
      );

      return request;
    } else {
      return base;
    }
  }

  public register(user: User): Observable<TokenResponse> {
    return this.request('post', 'register',null, user);
  }

  public login(user: TokenPayload): Observable<TokenResponse> {
    return this.request('post', 'login', user);
  }

  public profil(): Observable<User> {
    return this.request('get', 'profil');
  }

  public logout(): void {
    this.request('post', 'logout/access').subscribe(data=> alert(data.message));
    this.request('post', 'logout/refresh').subscribe(data=> alert(data.message));
    this.access_token = '';
    this.refresh_token= '';
    window.localStorage.removeItem('access_token');
    window.localStorage.removeItem('refresh_token');
    this.router.navigateByUrl('/welcome');
  }

  public tokenRefresh(): void{
    this.request('post','token/refresh').subscribe(data=> {
      this.updateAccessToken(data.access_token);
    });
  }


}
