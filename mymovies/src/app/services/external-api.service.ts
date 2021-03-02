import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/envs';
import { DateUtils } from '../utils/dateutils';

@Injectable({
  providedIn: 'root'
})
export class ExternalApiService {
  constructor(private _http: HttpClient) { }

  getExternalAccessToken(){
    return this._http.post<any>(`${environment.externalApiBaseURL}${environment.externalTokenURL}`,null,{params: {
      'grant_type': 'client_credentials'
    }});
  }

  getChannels(){
    let channelsData = this._http.get<any>(`${environment.externalApiBaseURL}${environment.channelsUrl}`,{params:{
      'channelType':'TV',
      'communityId': '1',
      'languageId': '404'
    }})
    return channelsData;
  }

  getChannelsMovies(cid:any){
    const req = this._http.get<any>(`${environment.externalApiBaseURL}${environment.channelsMoviesUrl}`,
      {params:{
        'fromTime': DateUtils.getFromAndToDates().from,
        'toTime': DateUtils.getFromAndToDates().to,
        'communityId':'1',
        'languageId':'404',
        'cid':cid
      }});
      return req;
  }

  getYTVideoById(videoId){
    return this._http.get<any>(environment.youtubeVideosApiURL,{params:{
      'id':videoId,
    }});
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
