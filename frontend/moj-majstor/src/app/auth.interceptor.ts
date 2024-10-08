import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService,
              private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.authService.isLoggedIn()) {
      if (this.isAllowedUrl(request.url)) {
        return next.handle(request);
      } else {
        this.router.navigate(['/home']);
        return of();
      }
    }
    const token = this.authService.getAuthToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `${token}`
        }
      });
    }
    return next.handle(request);
  }

  private isAllowedUrl(url: string): boolean {
    const allowedUrls = ['/home', '/register', '/login', '/profile', '/servicer'];
    // return allowedUrls.some(allowedUrl => url.includes(allowedUrl));
    return true;
  }
}
