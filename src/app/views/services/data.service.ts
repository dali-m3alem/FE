import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
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
  markUserNotificationsAsRead(userId:number){
    const url = `http://localhost:8080/api/v1/auth/${userId}/markAsRead`;
    return this.http.put(url, {});
  }
  getUnreadNotificationCount(userId: number): Observable<number> {
    const url = `http://localhost:8080/api/v1/auth/unread-count/${userId}`;
    return this.http.get<number>(url);
  }

  getUserNotifications(){
    const token = localStorage.getItem('token');
  
    // Create the headers and include the Authorization header with the token
       const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get('http://localhost:8080/api/v1/auth/getUserNotifications', {headers})

  }
  getAllusers(){
    return this.http.get('http://localhost:8080/api/v1/auth/getAllUsers')

  }

  adduser(formData: FormData) {
    const apiUrl = 'http://localhost:8080/register';

    return this.http.post('http://localhost:8080/api/v1/auth/register',formData)
  }


// Fonction pour récupérer les informations utilisateur à partir du backend
getUserData(): Observable<any> {
  const token = localStorage.getItem('token');
  
  // Create the headers and include the Authorization header with the token
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get<any>(`http://localhost:8080/api/v1/auth/getuserId`,{headers});
}


deleteUser(id: number) {
  const url = `http://localhost:8080/api/v1/auth/deleteUser?id=${id}`;
  return this.http.delete(url);
}
updateUser(formData: any) {
  return this.http.put('http://localhost:8080/api/v1/auth/updateUser', formData)
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
