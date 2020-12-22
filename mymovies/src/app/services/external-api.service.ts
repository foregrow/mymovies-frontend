import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateUtils } from '../utils/dateutils';
import { Statics } from '../utils/statics';

@Injectable({
  providedIn: 'root'
})
export class ExternalApiService {
  constructor(private _http: HttpClient) { }

  getExternalAccessToken(){
    return this._http.post<any>(Statics.externalTokenURL,null);
  }

  getChannels(){
    let channelsData = this._http.get<any>(Statics.channelsUrl);
    return channelsData;
  }

  getChannelsMovies(cid:any){
    return this._http.get<any>(
      `${Statics.channelsMoviesUrl}fromTime=${DateUtils.getFromAndToDates().from}&toTime=${DateUtils.getFromAndToDates().to}&communityId=1&languageId=404&cid=${cid}`);
  }

  setExternalAccessTokenInLocalStorage(accessToken:any){
    if(accessToken){
      localStorage.setItem('accessToken',accessToken);
    }
  }

  getExternalAccessTokenFromLocalStorage(){
    return localStorage.getItem('accessToken');
  }
}
