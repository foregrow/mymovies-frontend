import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private static readonly entityBaseURL: string = `${environment.backendApiURL}/${environment.api}/${environment.genres}`;
  constructor(private _http: HttpClient,private _router: Router) { }

  getAll() : Observable<any>{
    return this._http.get<any>(GenreService.entityBaseURL);
  }

  getById(id:any): Observable<any>{
    return this._http.get<any>(`${GenreService.entityBaseURL}/${+id}`);
  }

  add(data:any){
    return this._http.post<any>(GenreService.entityBaseURL,data);
  }

  // getYTVideoById(videoId){
  //   return this._http.get<any>(Statics.youtubeVideosApiURL,{params:{
  //     'id':videoId,
  //   }});
  // }

  update(data:any){
    return this._http.put<any>(GenreService.entityBaseURL,data);
  }

  delete(id:any): Observable<any[]>{
    return this._http.delete<any[]>(`${GenreService.entityBaseURL}/${+id}`);
  }
}
