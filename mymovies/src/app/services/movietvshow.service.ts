import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovietvshowService {

  private static readonly entityBaseURL: string = `${environment.backendApiURL}/${environment.api}/${environment.mts}`;
  constructor(private _http: HttpClient,private _router: Router) { }


  getAll() : Observable<any>{
    return this._http.get<any>(MovietvshowService.entityBaseURL);
  }

  getAllMovies() : Observable<any>{
    return this._http.get<any>(`${MovietvshowService.entityBaseURL}/movies`);
  }

  getAllTVShows() : Observable<any>{
    return this._http.get<any>(`${MovietvshowService.entityBaseURL}/tvshows`);
  }

  getById(id:any): Observable<any>{
    return this._http.get<any>(`${MovietvshowService.entityBaseURL}/${+id}`);
  }


  findAllByNameContains(name): Observable<any>{
    return this._http.get<any>(`${MovietvshowService.entityBaseURL}/namecontains/${name}`);
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
