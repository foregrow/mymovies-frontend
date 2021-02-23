import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private static readonly entityBaseURL: string = `${environment.backendApiURL}/${environment.api}/${environment.photos}`;
  constructor(private _http: HttpClient,private _router: Router) { }

  getAll() : Observable<any>{
    return this._http.get<any>(PhotoService.entityBaseURL);
  }

  getById(id:any): Observable<any>{
    return this._http.get<any>(`${PhotoService.entityBaseURL}/${+id}`);
  }

  add(data:any){
    return this._http.post<any>(PhotoService.entityBaseURL,data, {observe:'response'}).subscribe(
      res=>{
        if(res.status===200){
          alert('img uploaded successfully');
        }
      },error=>{console.error(error)}
    );
  }

}
