import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteValidationGuard implements CanActivate, CanLoad {
  constructor(private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean{
    if(localStorage.getItem('token')){
      return true;
    }
    this.router.navigateByUrl('/auth/login');
    return false;


  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean  {
      if(localStorage.getItem('token')){
        return true;
      }
      this.router.navigateByUrl('/auth/login');
      return false;
  }
}

