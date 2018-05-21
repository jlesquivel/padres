import { Injectable, EventEmitter } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  menuEmmiter = new EventEmitter<boolean>();
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | boolean {

    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      this.menuEmmiter.emit(true);
      return true;
    } else {
      // not logged in so redirect to login page with the return url
      this.menuEmmiter.emit(false);
      this.router.navigate(['/login']);
      return false;
    }
  }
}
