import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/envs';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {

  private static readonly entityBaseURL: string = `${environment.backendApiURL}/${environment.api}/${environment.episodes}`;
  constructor(private _http: HttpClient,private _router: Router) { }

  getAll() : Observable<any>{
    return this._http.get<any>(EpisodeService.entityBaseURL);
  }

  getById(id:any): Observable<any>{
    return this._http.get<any>(`${EpisodeService.entityBaseURL}/${+id}`);
  }

  add(data:any){
    return this._http.post<any>(EpisodeService.entityBaseURL,data);
  }

  update(data:any){
    return this._http.put<any>(EpisodeService.entityBaseURL,data);
  }

  delete(id:any): Observable<any[]>{
    return this._http.delete<any[]>(`${EpisodeService.entityBaseURL}/${+id}`);
  }
}
