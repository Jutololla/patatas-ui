import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { TokenStorageService } from 'src/app/services/tokenStorage/token-storage.service';
import { Observable } from 'rxjs';

const TOKEN_HEADER_KEY = 'Authorization';       // for Spring Boot back-end

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.token.getToken();
    if (token != null) {
      req = req.clone({ 
        headers: req.headers.set(TOKEN_HEADER_KEY,`Bearer ${token}`)
      })
    }
    return next.handle(req);}
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];