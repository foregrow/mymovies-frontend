import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {

  private static readonly entityBaseURL: string = `${environment.backendApiURL}/${environment.api}/${environment.seasons}`;
  constructor(private _http: HttpClient,private _router: Router) { }

  getAll() : Observable<any>{
    return this._http.get<any>(SeasonService.entityBaseURL);
  }

  getById(id:any): Observable<any>{
    return this._http.get<any>(`${SeasonService.entityBaseURL}/${+id}`);
  }

  add(data:any){
    return this._http.post<any>(SeasonService.entityBaseURL,data);
  }

  update(data:any){
    return this._http.put<any>(SeasonService.entityBaseURL,data);
  }

  delete(id:any): Observable<any[]>{
    return this._http.delete<any[]>(`${SeasonService.entityBaseURL}/${+id}`);
  }
}
