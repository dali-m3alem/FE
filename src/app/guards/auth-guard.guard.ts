import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthadminService } from 'src/app/views/services/authadmin.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthadminService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.LoggedIn()) {
      // Utilisateur non connecté, autoriser l'accès à la page de connexion
      return true;
    } else if (this.authService.LoggedIsAdminUser()) {
      // Utilisateur avec les rôles admin+user, rediriger vers la page appropriée
      this.router.navigate(['/AdminUser']);
      return false; // Empêcher l'accès au composant
    } else if (this.authService.LoggedIsAdminManager()) {
      // Utilisateur avec les rôles admin+manager, rediriger vers la page appropriée
      this.router.navigate(['/AdminManager']);
      return false; // Empêcher l'accès au composant
    } else if (this.authService.LoggedIsManager()) {
      // Utilisateur avec le rôle manager, rediriger vers la page appropriée
      this.router.navigate(['/Manager']);
      return false; // Empêcher l'accès au composant
    } else if (this.authService.LoggedIsUser()) {
      // Utilisateur avec le rôle user, rediriger vers la page appropriée
      this.router.navigate(['/User']);
      return false; // Empêcher l'accès au composant
    } else {
      this.router.navigate(['']);
      return false; // Empêcher l'accès au composant
    }
  }
  
}