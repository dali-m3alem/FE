import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
interface LoginResponse {
  token: string;
  roles: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthadminService {
  updatePassword(token: string, password: string) {
    throw new Error('Method not implemented.');
  }

 
 
 


  helper=new JwtHelperService()
  constructor(private http:HttpClient) {
    

   }
   forgotPassword(email:any) {
    const url = `http://localhost:8080/api/v1/auth/request?email=${email}`;
    return this.http.post(url, {});
  }
  resetPassword(token: string, password: string): Observable<any> {
    const url = `http://localhost:8080/api/v1/auth/reset-password?token=${token}&password=${password}`;
    return this.http.post(url, {}, { responseType: 'text' });
  }
  
 
    

  login(data:any){

    return this.http.post('http://localhost:8080/api/v1/auth/authenticate',data)
  } 

 /* SaveDataProfil(token:any,roles:any){
    localStorage.setItem('token',token)
    
    const rolesJSON = JSON.stringify(roles);
    localStorage.setItem('roles',rolesJSON)
    this.ProfilAdmin.roles=roles
    this.IsLoggedIn=true
  }*/
 saveDataProfil(token:any){

    
    let decodeToken= this.helper.decodeToken(token)
    console.log(decodeToken.username)
    console.log(token)

    console.log(decodeToken.roles) 
    console.log(this.LoggedIn())

   localStorage.setItem('token',token)
  }
  saveToken(token:any){

    localStorage.setItem('token',token)

  }
  getUser(): any {
    let token:any=localStorage.getItem('token')
   let decodeToken= this.helper.decodeToken(token)

    return decodeToken.id
  }
  getUsername(){
   let token:any=localStorage.getItem('token')
   let decodeToken= this.helper.decodeToken(token)

    return decodeToken.username

  }
  LoggedIsAdminUser() {
    let token: any = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    let decodeToken = this.helper.decodeToken(token);
    if (decodeToken.roles) {
      let hasAdminRole = decodeToken.roles.some((role: { authority: string }) => role.authority === 'admin');
      let hasUserRole = decodeToken.roles.some((role: { authority: string }) => role.authority === 'user');
      return hasAdminRole && hasUserRole && !this.helper.isTokenExpired(token);
    }
    return false;
  }
  
  LoggedIsAdminManager() {
    let token: any = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    let decodeToken = this.helper.decodeToken(token);
    if (decodeToken.roles) {
      let hasAdminRole = decodeToken.roles.some((role: { authority: string }) => role.authority === 'admin');
      let hasManagerRole = decodeToken.roles.some((role: { authority: string }) => role.authority === 'manager');
      return hasAdminRole && hasManagerRole && !this.helper.isTokenExpired(token);
    }
    return false;
  }
  
  LoggedIn() {
    let token: any = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    let decodeToken = this.helper.decodeToken(token);
    if (decodeToken.roles) {
      let hasAdminRole = decodeToken.roles.some((role: { authority: string }) => role.authority === 'admin');
      return hasAdminRole && !this.helper.isTokenExpired(token);
    }
    return false;
  }
  
  LoggedIsManager() {
    let token: any = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    let decodeToken = this.helper.decodeToken(token);
    if (decodeToken.roles) {
      let hasManagerRole = decodeToken.roles.some((role: { authority: string }) => role.authority === 'manager');
      let hasUserRole = decodeToken.roles.some((role: { authority: string }) => role.authority === 'user');
      return (hasManagerRole || (hasUserRole && hasManagerRole)) && !this.helper.isTokenExpired(token);
    }
    return false;
  }
  
  LoggedIsUser() {
    let token: any = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    let decodeToken = this.helper.decodeToken(token);
    if (decodeToken.roles) {
      let hasUserRole = decodeToken.roles.some((role: { authority: string }) => role.authority === 'user');
      return hasUserRole && !this.helper.isTokenExpired(token);
    }
    return false;
  }
}  