import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/envs';
@Injectable({
  providedIn: 'root'
})
export class TranslateApiService {

  constructor(private _http: HttpClient) { }

  getTranslation(word) {
    let sourceLang: string = 'sr';
    let tragetLang: string = 'en';
    let data: string = `q=${word}&source=${sourceLang}&target=${tragetLang}`
    return this._http.post(environment.translateApiURL, data);
  }

  /*getLangs():Observable<any>{
    return this._http.get('https://google-translate1.p.rapidapi.com/language/translate/v2/languages');
  }

  detect(sentence){
    let data = `q=${sentence}`
    return this._http.post('https://google-translate1.p.rapidapi.com/language/translate/v2/detect',data);
    
  }*/

}
