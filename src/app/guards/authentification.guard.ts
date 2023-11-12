import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {inject, Injectable} from "@angular/core";
import {AppStateService} from "../services/app-state.service";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard {
  constructor(private appState: AppStateService, private route: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.appState.authState.isAuthenticated==true){
      return true;
    }else {
      this.route.navigateByUrl("/login");
      return false;
    }
  }
}
    export const isAuthentificationGuard: CanActivateFn = (route, state) => {
  return inject(AuthenticationGuard).canActivate(route,state);
    };
