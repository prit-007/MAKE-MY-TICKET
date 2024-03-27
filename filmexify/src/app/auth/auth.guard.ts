import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      // Check if the user has the necessary role (admin or manager)
      const userRole = this.authService.getUserRole();
      if (userRole === 'admin' || userRole === 'manager') {
        return true;
      } else {
        // Redirect to client component if the user is not admin or manager
        this.router.navigate(['/']);
        return false;
      }
    } else {
      // Redirect to login page if the user is not logged in
      this.router.navigate(['/auth']);
      return false;
    }
  }
}
