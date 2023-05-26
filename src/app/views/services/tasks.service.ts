import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Task } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  helper=new JwtHelperService()
    constructor(private http:HttpClient) {
    }
    
    getTasksByUserId():Observable<Task[]> {
      
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<Task[]> (`http://localhost:8080/api/v1/auth/getTasks`,{headers});
    }
    getTasksnotDone() {
      return this.http.get(`http://localhost:8080/api/v1/auth/countTask`);
    }
    getTasksByManagerId():Observable<Task[]> {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<Task[]> (`http://localhost:8080/api/v1/auth/getTasksManager`,{headers});
    }
    updateTask(task: Task) {
      const url = `http://localhost:8080/api/v1/auth/update`;
      return this.http.put(url, task);
    }
    createTasks(formData:any){
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.post('http://localhost:8080/api/v1/auth/create',formData, {headers})
    }
    getTasksByActivityAndProjectAndManager(id: number,idProject:number): Observable<Task[]> {
      const token = localStorage.getItem('token');
    
    // Create the headers and include the Authorization header with the token
       const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<Task[]>(`http://localhost:8080/api/v1/auth/getTasksByActivityAndProjectAndManager/${id}/${idProject}`, {headers});
    }
    deleteTask(task: number) {
      const url = `http://localhost:8080/api/v1/auth/delete/${task}`;
      return this.http.delete(url);
    }
    managersUsers(){
      return this.http.get('http://localhost:8080/api/v1/auth/managersUsers')
    }
    getTeamMembersByActivityId(activityId: number): Observable<string[]> {
      const url = `http://localhost:8080/api/v1/auth/${activityId}/team-members`;
      return this.http.get<string[]>(url);
    }
    updateTask1(id: number, task: Task){
      const url = `http://localhost:8080/api/v1/auth/update/${id}`;
      return this.http.put(url, task);
    }
    
}
