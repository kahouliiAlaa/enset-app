import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {finalize, Observable} from 'rxjs';
import {AppStateService} from "./app-state.service";
import {LoadingService} from "./loading.service";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private appState : AppStateService,
              public ls : LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    /*this.appState.setProductState({
      status : "LOADING"
    })*/

    //console.log(req.url)     c car on avait une prblm lors de login
    //if (!req.url.includes("/auth/login"){   cela implique tt le traitement } else {juste a partir de retuen next.handle(req)...}
    this.ls.showLoadingSpinner();  //cela pour remplacer en appliquant l'approach du Subject

    let req = request.clone({
      headers : request.headers.set('Authorization', 'Bearer JWT')
      // ds le cas d'un vrai backend elle devient .set('Authorization', 'Bearer JWT '+this.appState.token)
      // si on ne travaille pas avec appState  .set('Authorization', 'Bearer JWT '+this.authService.accessToken)

      //
    })
    return next.handle(req).pipe(
      finalize(()=>{
        /*this.appState.setProductState({
          status: ""          // ds ce cas on suppose que tt va bien mais on doit traiter le cas de l'error
        })*/

        this.ls.hideLoadingSpinner(); // cela pour remplacer ce qui est en cmntr
      })
    );
  }
}
