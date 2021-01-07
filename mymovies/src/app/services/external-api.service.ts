import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateUtils } from '../utils/dateutils';
import { Statics } from '../utils/statics';

@Injectable({
  providedIn: 'root'
})
export class ExternalApiService {
  constructor(private _http: HttpClient) { }

  getExternalAccessToken(){
    return this._http.post<any>(Statics.externalTokenURL,null,{params: {
      'grant_type': 'client_credentials'
    }});
  }

  getChannels(){
    let channelsData = this._http.get<any>(Statics.channelsUrl,{params:{
      'channelType':'TV',
      'communityId': '1',
      'languageId': '404'
    }})
    return channelsData;
  }

  getChannelsMovies(cid:any){
    const req = this._http.get<any>(Statics.channelsMoviesUrl,
      {params:{
        'fromTime': DateUtils.getFromAndToDates().from,
        'toTime': DateUtils.getFromAndToDates().to,
        'communityId':'1',
        'languageId':'404',
        'cid':cid
      }});
      return req;
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
