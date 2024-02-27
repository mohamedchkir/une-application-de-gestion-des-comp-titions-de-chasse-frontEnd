import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, of, tap} from "rxjs";
import {AuthResponse} from "../../response/AuthResponse";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/v1/auth/';
  private loginUrl = this.baseUrl + 'login';
  private registerUrl = this.baseUrl + 'register';
  private userUrl = this.baseUrl + 'user';
  private logoutUrl = this.baseUrl + 'logout';
  private tokenKey: string = 'accessToken';

  private user!: any;

  constructor(private http:HttpClient, private router: Router) {}

  login(email: string, password: string):Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.loginUrl, {email, password});
  }

  register(email: string, password: string ,firstName: string , lastName:string, identityNumber:string,identityDocument:string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.registerUrl, {email, password,firstName, lastName,identityNumber,identityDocument});
  }

  profile(): Observable<any> {
    return this.http.get(this.baseUrl + 'user');
  }

  isHasAuthority(roles: string[]): Observable<boolean> {
    console.log(!this.user)
    if (!this.user){
      console.log('fetching user')
      return this.profile().pipe(
        tap(data => this.user = data),
        map(data => roles.includes(data['role']))
      );
    }


    return of(roles.includes(this.user['role']));
  }

  isAuthenticated(): boolean {
    let token = localStorage.getItem(this.tokenKey);
    let expire = localStorage.getItem('expireAt');

    if (token && expire) {
      let expireDate = new Date(expire);
      let today = new Date();

      return expireDate > today;
    }

    return false;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('expireAt');
    localStorage.removeItem('refreshToken');

    this.user = null;

    this.router.navigate(['/login']);
  }
}
