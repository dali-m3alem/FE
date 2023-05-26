import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthadminService } from '../views/services/authadmin.service';

@Injectable({
  providedIn: 'root'
})
export class GuardAdminManagerGuard implements CanActivate {
  constructor(private as:AuthadminService, private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.as.LoggedIsAdminManager()) {
      return true; // Autoriser l'accès à la route
    } else {
      this.router.navigate(['/login']);
      return false; // Rediriger vers la page de connexion
    }
  
}}
