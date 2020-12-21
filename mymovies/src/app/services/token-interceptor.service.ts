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
      if(req.url!==Statics.externalTokenURL){ 
        let externalAPIService = this.inj.get(ExternalApiService);
        tokenizedReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${externalAPIService.getExternalAccessTokenFromLocalStorage()}`
          }
        });
        
      }
      //ignores headers
      return next.handle(req);
      
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
