import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { UserService } from './user.service';
import { Statics } from '../utils/statics';
import { ExternalApiService } from './external-api.service';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private inj: Injector) { }

  intercept(req:any,next:any){
    let tokenizedReq;
    if(req.url.startsWith(Statics.publicAPIBaseURL)){
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
      let userService = this.inj.get(UserService);
      tokenizedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${userService.getToken()}`
        }
      });
    }
    return next.handle(tokenizedReq);
  }
}
