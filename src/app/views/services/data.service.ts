import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import * as jwt_decode from 'jwt-decode';
import { Observable, catchError, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  helper=new JwtHelperService()


  constructor(private http:HttpClient) {
  }
 
  getAllusers(){
    return this.http.get('http://localhost:8080/api/v1/auth/getAllUsers')

  }

  adduser(formData: FormData) {
    const apiUrl = 'http://localhost:8080/register';

    return this.http.post('http://localhost:8080/api/v1/auth/register',formData)
  }


// Fonction pour récupérer les informations utilisateur à partir du backend
getUserData(id: number): Observable<any> {
  return this.http.get<any>(`http://localhost:8080/api/v1/auth/getuserId?id=${id}`);
}


deleteUser(id: number) {
  const url = `http://localhost:8080/api/v1/auth/deleteUser?id=${id}`;
  return this.http.delete(url);
}
updateUser(updatedUser: User): Observable<User> {
  return this.http.put<User>('http://localhost:8080/api/v1/auth/updateUser', updatedUser);
}
updateUserWP(updatedUser: User): Observable<User> {
  return this.http.put<User>('http://localhost:8080/api/v1/auth/updateUserWP', updatedUser);
}

getAllRoles(){
  return this.http.get('http://localhost:8080/api/v1/auth/getAllRole')

}
changePassword(id: number, oldPassword: string, newPassword: string) {
  const url = `http://localhost:8080/api/v1/auth/change-password?id=${id}&oldPassword=${oldPassword}&newPassword=${newPassword}`;
  return this.http.post(url, {});
}
uploadProfilePicture(file: File, userId: number) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('userId', userId.toString());
  return this.http.post('http://localhost:8080/api/v1/auth/upload-profile-picture', formData);
}
Users():Observable<number>{
  return this.http.get<number>('http://localhost:8080/api/v1/auth/countUser')
}



}
