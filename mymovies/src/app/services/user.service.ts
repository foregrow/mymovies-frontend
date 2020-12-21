import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Statics } from '../utils/statics';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private static readonly usersBaseURL: string = `${Statics.serverBaseURL}/${Statics.api}/${Statics.users}`;
  constructor(private _http: HttpClient,private _router: Router) { }

  getAll() : Observable<any>{
    return this._http.get<any>(UserService.usersBaseURL);
  }

  getById(id:any): Observable<any>{
    return this._http.get<any>(`${UserService.usersBaseURL}/${+id}`);
  }

  add(data:any){
    return this._http.post<any>(UserService.usersBaseURL,data);
  }

  update(data:any){
    return this._http.put<any>(UserService.usersBaseURL,data);
  }
  
  login(userData:any){
    return this._http.post<any>(`${Statics.serverBaseURL}/${Statics.authenticateURL}`, userData);
  }

  getRedirectedByRole(role:any){
    if(role == Statics.adminRole)
      this._router.navigate(['admin']);
    else if(role == Statics.userRole)
      this._router.navigate(['main']);
    else
      this._router.navigate(['login']);
    
  }

  loggedIn(){
    if(!this.getToken())
      return false;
    
    return true;
  }

  getToken(){
    return localStorage.getItem('jwt');
  }

  getEmailFromToken(){
    //npm install @auth0/angular-jwt
    const helper = new JwtHelperService();
    const token = this.getToken();
    if(token){
      const decodedToken = helper.decodeToken(token);
      const email = decodedToken.sub;
      return email;
    }
    return null;
  }

  getRole(){
    const helper = new JwtHelperService();
    const token = this.getToken();
    if(token){
      const decodedToken = helper.decodeToken(token);
      const role = decodedToken.roles[0].authority;
      return role;
    }
    return null;
  }

  logout(){
    localStorage.removeItem("jwt");
    this._router.navigate(['login'])
  }

  isAuthorized(roles:any): boolean {
    let isMatch = false;
    
    let role = this.getRole();
    if(roles.includes(role)){
      isMatch=true;
      return isMatch;
    }
    
    return isMatch;
  }
}
