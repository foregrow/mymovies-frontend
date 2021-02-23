import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private static readonly entityBaseURL: string = `${environment.backendApiURL}/${environment.api}/${environment.persons}`;
  constructor(private _http: HttpClient,private _router: Router) { }

  getAll() : Observable<any>{
    return this._http.get<any>(PersonService.entityBaseURL);
  }

  getAllNotInMTS(mtsid:any): Observable<any>{
    return this._http.get<any>(`${PersonService.entityBaseURL}/notinmts/${+mtsid}`);
  }
  findAllByFNameOrLNameContains(searchValue): Observable<any>{
    return this._http.get<any>(`${PersonService.entityBaseURL}/namecontains/${searchValue}`);
  }

  getById(id:any): Observable<any>{
    return this._http.get<any>(`${PersonService.entityBaseURL}/${+id}`);
  }
  
  add(data:any){
    return this._http.post<any>(PersonService.entityBaseURL,data);
  }

  update(data:any){
    return this._http.put<any>(PersonService.entityBaseURL,data);
  }

  delete(id:any): Observable<any[]>{
    return this._http.delete<any[]>(`${PersonService.entityBaseURL}/${+id}`);
  }
}
