import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Statics } from '../utils/statics';

@Injectable({
  providedIn: 'root'
})
export class TranslateApiService {

  constructor(private _http: HttpClient) { }

  getTranslation(word) {
    let sourceLang: string = 'sr';
    let tragetLang: string = 'en';
    let data: string = `q=${word}&source=${sourceLang}&target=${tragetLang}`
    let translatedText;
    this._http.post(environment.translateApiURL, data).subscribe(
      data => {
        if (data.hasOwnProperty('data')) {
          let dOfData = data['data'];
          let translations = dOfData['translations'];
          translatedText = translations[0].translatedText;
          console.log(translatedText);
        }
      }, err => {
        console.error(err)
      });
    return translatedText;
  }

  /*getLangs():Observable<any>{
    return this._http.get('https://google-translate1.p.rapidapi.com/language/translate/v2/languages');
  }

  detect(sentence){
    let data = `q=${sentence}`
    return this._http.post('https://google-translate1.p.rapidapi.com/language/translate/v2/detect',data);
    
  }*/

}
