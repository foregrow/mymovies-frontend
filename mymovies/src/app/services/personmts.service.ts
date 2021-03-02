import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/envs';

@Injectable({
  providedIn: 'root'
})
export class PersonmtsService {

  private static readonly entityBaseURL: string = `${environment.backendApiURL}/${environment.api}/${environment.personmts}`;
  constructor(private _http: HttpClient,private _router: Router) { }

  getAll() : Observable<any>{
    return this._http.get<any>(PersonmtsService.entityBaseURL);
  }

  getById(id:any): Observable<any>{
    return this._http.get<any>(`${PersonmtsService.entityBaseURL}/${+id}`);
  }

  getByMTSId(id:any): Observable<any>{
    return this._http.get<any>(`${PersonmtsService.entityBaseURL}/movietvshow/${+id}`);
  }

  add(data:any){
    return this._http.post<any>(PersonmtsService.entityBaseURL,data);
  }

  update(data:any){
    return this._http.put<any>(PersonmtsService.entityBaseURL,data);
  }

  delete(id:any): Observable<any[]>{
    return this._http.delete<any[]>(`${PersonmtsService.entityBaseURL}/${+id}`);
  }
}
