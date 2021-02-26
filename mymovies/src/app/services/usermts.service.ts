import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsermtsService {

  private static readonly entityBaseURL: string = `${environment.backendApiURL}/${environment.api}/${environment.usermts}`;
  constructor(private _http: HttpClient,private _router: Router) { }

  getAll() : Observable<any>{
    return this._http.get<any>(UsermtsService.entityBaseURL);
  }

  getById(id:any): Observable<any>{
    return this._http.get<any>(`${UsermtsService.entityBaseURL}/${+id}`);
  }

  getByEmailAndMTSId(email,mtsid): Observable<any>{
    return this._http.get<any>(`${UsermtsService.entityBaseURL}/emailmts/${email}/${+mtsid}`);
  }
  newUserRating(email,mtsid,newRating): Observable<any>{
    return this._http.get<any>(`${UsermtsService.entityBaseURL}/user-rating/${email}/${mtsid}/${newRating}`);
  }
  

  add(data:any){
    return this._http.post<any>(UsermtsService.entityBaseURL,data);
  }

  update(data:any){
    return this._http.put<any>(UsermtsService.entityBaseURL,data);
  }

  delete(id:any): Observable<any[]>{
    return this._http.delete<any[]>(`${UsermtsService.entityBaseURL}/${+id}`);
  }
}
