import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { UserService } from './user.service';
import { Statics } from '../utils/statics';
import { ExternalApiService } from './external-api.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private inj: Injector,private _router: Router) { }

  handleError(error:HttpErrorResponse){
    console.log(error);    
    return throwError(error);
  }
  
  intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
    let tokenizedReq;
    if(req.url.startsWith(Statics.externalAPIBaseURL)){
      let externalAPIService = this.inj.get(ExternalApiService);
      if(req.url!==Statics.externalTokenURL){ 
        tokenizedReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${externalAPIService.getExternalAccessTokenFromLocalStorage()}`
          }
        });  
      }else{
        tokenizedReq = req.clone({
          setHeaders: {
            Authorization: Statics.authHeadersValue
          }
          
        });
      }
       
    }else{
      //https://www.googleapis.com/youtube/v3/videos?key=AIzaSyDPn3TxVEHi51jAqEAQLignX25Uf_NaZag&id=YoHD9XEInc0
      let userService = this.inj.get(UserService);
      if(req.url===Statics.youtubeVideosApiURL){
        tokenizedReq = req.clone({
          setParams: {
            key: 'AIzaSyDPn3TxVEHi51jAqEAQLignX25Uf_NaZag',
            
          }
        });
      }else{
        tokenizedReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${userService.getToken()}`
          }
        });
      }
      
      
    }
    return next.handle(tokenizedReq).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
          if(errorResponse.url!==`${Statics.serverBaseURL}/${Statics.authenticateURL}`){
            let userService = this.inj.get(UserService);
            //userService.removeTokenFromStorage();
            this._router?.navigate(['error']);
          }
          return this.handleError(errorResponse);
      })
  );
  }
}
