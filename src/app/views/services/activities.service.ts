import { HttpClient } from '@angular/common/http';
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
  getActivityByProjectId(id: number): Observable<Activity[]> {
    return this.http.get<Activity[]>(`http://localhost:8080/api/v1/auth/getActivityByProjectId/${id}`);
  }
}
