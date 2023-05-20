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
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve,reject)=>{
      if(this.as.LoggedIsAdminManager()==true){
      resolve(true)
    }
    else{
      this.router.navigate(['/login'])
      resolve(false)
    }});
}}
