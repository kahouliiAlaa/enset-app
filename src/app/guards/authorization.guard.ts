import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {inject, Injectable} from "@angular/core";
import {AppStateService} from "../services/app-state.service";
import {Observable} from "rxjs";


@Injectable({
  providedIn : "root"
})
export class AuthorizationGuard{
  constructor(private appState : AppStateService, private route : Router) {

  }

    canActivate(
      route : ActivatedRouteSnapshot,
      state : RouterStateSnapshot) : boolean  {
       if(this.appState.authState.roles.includes(route.data['requiredRoles'])){
         return true;
       }else {
         this.route.navigateByUrl("/admin/notauthorized");
         return false;
       }
    }
 }

   export const isAuthorizationGuard: CanActivateFn = (route, state) => {
  return inject(AuthorizationGuard).canActivate(route,state);
 };
