import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Team } from '../model/user';
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
  getTeamByActivityAndProjectAndManager(id: number,idProject:number): Observable<Team[]> {
    const token = localStorage.getItem('token');
  
  // Create the headers and include the Authorization header with the token
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Team[]>(`http://localhost:8080/api/v1/auth/getTeamByActivityAndProjectAndManager/${id}/${idProject}`, {headers});
  }
  getTeam(){
    return this.http.get('http://localhost:8080/api/v1/auth/getAllTeam')
  }
  getTeamId(){
    return this.http.get('http://localhost:8080/api/v1/auth/ids')
  }
  updateTeam(id: number, teamDto: any) {
    const url = `http://localhost:8080/api/v1/auth/updateTeam/${id}`;
    return this.http.put(url, teamDto);
  }
  deleteTeam(team: number): Observable<void> {
    const url = `http://localhost:8080/api/v1/auth/deleteTeam/${team}`;
    return this.http.delete<void>(url);
  }
}
