import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Activity } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  helper=new JwtHelperService()


  constructor(private http:HttpClient) {
  }
  createActivity(formData:any){
    return this.http.post('http://localhost:8080/api/v1/auth/createActivity',formData)
  }
  getActivityByProjectId(id: number) {
    const token = localStorage.getItem('token');
  
  // Create the headers and include the Authorization header with the token
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`http://localhost:8080/api/v1/auth/getActivityByProjectId/${id}`, {headers});
  }
  
  deleteActivity(activity: number): Observable<void> {
    const url = `http://localhost:8080/api/v1/auth/deleteActivity/${activity}`;
    return this.http.delete<void>(url);
  }
  updateActivity(id: number, activityDto: any) {
    const url = `http://localhost:8080/api/v1/auth/activities/${id}`;
    return this.http.put(url, activityDto);
  }
}
