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
   const rolesJSON = JSON.stringify(decodeToken.roles);
   localStorage.setItem('roles',rolesJSON);
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
  LoggedIsManager(){
    let token:any=localStorage.getItem('token')
   if(!token){
     return false
    }
    let decodeToken = this.helper.decodeToken(token);
    let isAdmin: boolean = false;
    if (decodeToken.roles) {
      for (let i = 0; i < decodeToken.roles.length; i++) {
        const role = decodeToken.roles[i];
        if (role.authority === 'manager') {
          isAdmin = true;
          break;
        }
        if (role.authority === 'admin') { // ajout de cette condition
          return false;
        }
      }
    }

if(!isAdmin){
 return false;
}
    if(this.helper.isTokenExpired(token)){
      return false
    }

    return true
}


 LoggedIn(){
     let token:any=localStorage.getItem('token')
    if(!token){
      return false
     }
     let decodeToken = this.helper.decodeToken(token);
     let isAdmin: boolean = false;
     if (decodeToken.roles) {
       for (let i = 0; i < decodeToken.roles.length; i++) {
         const role = decodeToken.roles[i];
         if (role.authority === 'admin') {
           isAdmin = true;
           break;
         }
       }
     }

 if(!isAdmin){
  return false;
}
     if(this.helper.isTokenExpired(token)){
       return false
     }

     return true
}


LoggedIsUser(){
  let token:any=localStorage.getItem('token')
 if(!token){
   return false
  }
  let decodeToken = this.helper.decodeToken(token);
  let isUser: boolean = false;
  if (decodeToken.roles) {
    for (let i = 0; i < decodeToken.roles.length; i++) {
      const role = decodeToken.roles[i];
      if (role.authority === 'user') {
        isUser = true;
        break;
      }
      if (role.authority === 'admin' || role.authority === 'manager') { // ajout de cette condition
        return false;
      }
    
    }
  }

  

if(!isUser){
return false;
}
  if(this.helper.isTokenExpired(token)){
    return false
  }

  return true
}






}
