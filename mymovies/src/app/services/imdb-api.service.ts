import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/envs';

@Injectable({
  providedIn: 'root'
})
export class ImdbApiService {

  constructor(private _http: HttpClient) { }

  getMoviesByTitle(title) {
    return this._http.get(environment.imdbApiURL,{params:{q:title}});
  }
}
