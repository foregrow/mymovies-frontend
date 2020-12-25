import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Statics } from '../utils/statics';

@Injectable({
  providedIn: 'root'
})
export class MovietvshowService {

  private static readonly entityBaseURL: string = `${Statics.serverBaseURL}/${Statics.api}/${Statics.mts}`;
  constructor(private _http: HttpClient,private _router: Router) { }

  getAllMovies() : Observable<any>{
    return this._http.get<any>(`${MovietvshowService.entityBaseURL}/movies`);
  }

  getAllTVShows() : Observable<any>{
    return this._http.get<any>(`${MovietvshowService.entityBaseURL}/tvshows`);
  }

  getById(id:any): Observable<any>{
    return this._http.get<any>(`${MovietvshowService.entityBaseURL}/${+id}`);
  }

  add(data:any){
    return this._http.post<any>(MovietvshowService.entityBaseURL,data);
  }

  update(data:any){
    return this._http.put<any>(MovietvshowService.entityBaseURL,data);
  }

  delete(id:any): Observable<any[]>{
    return this._http.delete<any[]>(`${MovietvshowService.entityBaseURL}/${+id}`);
  }
}
