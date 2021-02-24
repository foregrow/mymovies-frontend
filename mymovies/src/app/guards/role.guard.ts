import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private _us: UserService, 
    private _router: Router) {}

    canActivate(next:ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean {
      if(this._us.loggedIn()){
        let roles = next.data['roles'] as Array<string>;
        if(roles){
          var match = this._us.isAuthorized(roles);
          if(match) return true;
          else{
            let loggedInUserRole = this._us.getRole();
            this._us.getRedirectedByRole(loggedInUserRole);
            return false;
          }
        }else
          return true;
      }else{
        this._router.navigate(['login']);
        return false;
      }
      
    }
  
}
