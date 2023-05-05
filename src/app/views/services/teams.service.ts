import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  helper=new JwtHelperService()


  constructor(private http:HttpClient) {
  }
  createTeam(formData:any){
    return this.http.post('http://localhost:8080/api/v1/auth/addTeam',formData)
  }
}
