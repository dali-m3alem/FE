import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Task } from '../manager/management/tasks/tasks.component';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  helper=new JwtHelperService()
    constructor(private http:HttpClient) {
    }

    getTasksByUserId(userId: number):Observable<Task[]> {
      return this.http.get<Task[]> (`http://localhost:8080/api/v1/auth/getTasks?userId=${userId}`);
    }
    getTasksByManagerId(managerId: number):Observable<Task[]> {
      return this.http.get<Task[]> (`http://localhost:8080/api/v1/auth/getTasksManager?managerId=${managerId}`);
    }
    updateTask(task: Task) {
      const url = `http://localhost:8080/api/v1/auth/update`;
      return this.http.put(url, task);
    }
    createTasks(formData:any){
      return this.http.post('http://localhost:8080/api/v1/auth/create',formData)
    }
}
