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

  private static readonly entityBaseURL: string = `${Statics.serverBaseURL}/${Statics.api}/${Statics.users}`;
  constructor(private _http: HttpClient,private _router: Router) { }

  getAll() : Observable<any>{
    return this._http.get<any>(UserService.entityBaseURL);
  }

  getById(id:any): Observable<any>{
    return this._http.get<any>(`${UserService.entityBaseURL}/${+id}`);
  }

  add(data:any){
    return this._http.post<any>(UserService.entityBaseURL,data);
  }

  update(data:any){
    return this._http.put<any>(UserService.entityBaseURL,data);
  }

  delete(id:any): Observable<any[]>{
    return this._http.delete<any[]>(`${UserService.entityBaseURL}/${+id}`);
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

  removeTokenFromStorage(){
    localStorage.removeItem("jwt");
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
