import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { InscriptionServiceService } from '../services/inscription-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProfilGuard implements CanActivate {
  constructor(private is: InscriptionServiceService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.is.isCandidat()) {
        return true;
      } else {
        // Redirect to login page if user is not an admin
        this.router.navigate(['/login']);
        return false;
      }
  }
}
