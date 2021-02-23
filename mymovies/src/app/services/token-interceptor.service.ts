import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { UserService } from './user.service';
import { ExternalApiService } from './external-api.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

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
    if(req.url.startsWith(environment.externalApiBaseURL)){
      let externalAPIService = this.inj.get(ExternalApiService);
      if(req.url!==`${environment.externalApiBaseURL}${environment.externalTokenURL}`){ 
        tokenizedReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${externalAPIService.getExternalAccessTokenFromLocalStorage()}`
          }
        });  
      }else{
        tokenizedReq = req.clone({
          setHeaders: {
            Authorization: environment.authHeadersValue
          }
          
        });
      }
       
    }else if(req.url.startsWith(environment.translateApiURL)){
      const headers = {
        "content-type": "application/x-www-form-urlencoded",
        "x-rapidapi-key": "9a33971c83msh3abc36037362aebp102680jsn2f12e3b45be6",
        "x-rapidapi-host": "google-translate1.p.rapidapi.com",
        "useQueryString": "true"
      }
      tokenizedReq = req.clone({
        setHeaders: headers,
      });
    }else{
      //https://www.googleapis.com/youtube/v3/videos?key=AIzaSyDPn3TxVEHi51jAqEAQLignX25Uf_NaZag&id=YoHD9XEInc0
      let userService = this.inj.get(UserService);
      if(req.url===environment.youtubeVideosApiURL){
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
          if(errorResponse.url!==`${environment.backendApiURL}/${environment.authenticateURL}`){
            let userService = this.inj.get(UserService);
            //userService.removeTokenFromStorage();
            
            if (errorResponse.status!==502) this._router?.navigate(['error']) 
            
          }
          return this.handleError(errorResponse);
      })
  );
  }
}
