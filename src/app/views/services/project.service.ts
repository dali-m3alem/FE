import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, map } from 'rxjs';
import { Project } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
    helper=new JwtHelperService()
    constructor(private http:HttpClient) {
    }
    createProject(formData:any){
      return this.http.post('http://localhost:8080/api/v1/auth/createProject',formData)
    }
    updateProject(formData:any){
      return this.http.put('http://localhost:8080/api/v1/auth/updateProject', formData)
    }
    
    getAllProjectsByAdminId(adminId: number): Observable<Project[]> {
      return this.http.get<any>(`http://localhost:8080/api/v1/auth/projects?adminId=${adminId}`)
        .pipe(
          map(response => response.map((project: { id:any,projectName: any; descriptionP: any; objectiveP: any; durationP: any; deadlineP: any; projectManagerEmail: any; status:any; budget:any;}) => ({
            id:project.id,
            projectName: project.projectName,
            descriptionP: project.descriptionP,
            objectiveP: project.objectiveP,
            durationP: project.durationP,
            deadlineP: project.deadlineP,
            email: project.projectManagerEmail,
            status:project.status,
            budget:project.budget
          })))
        );
    
    
    }

    getAllProjectsByManagerId(managerId: number): Observable<Project[]> {
      return this.http.get<any>(`http://localhost:8080/api/v1/auth/projectsmanager?managerId=${managerId}`)
        .pipe(
          map(response => response.map((project: { id:any,projectName: any; descriptionP: any; objectiveP: any; durationP: any; deadlineP: any; admin: any; status:any; budget:any;}) => ({
            id:project.id,
            projectName: project.projectName,
            descriptionP: project.descriptionP,
            objectiveP: project.objectiveP,
            durationP: project.durationP,
            deadlineP: project.deadlineP,
            email: project.admin,
            status:project.status,
            budget:project.budget
          })))
        );
    
    
    }
    deleteProject(id: number) {
      const url = `http://localhost:8080/api/v1/auth/deleteProject?id=${id}`;
      return this.http.delete(url);
    }
    projects():Observable<number>{
      return this.http.get<number>('http://localhost:8080/api/v1/auth/count')
    }
    budgets():Observable<number>{
      return this.http.get<number>('http://localhost:8080/api/v1/auth/total')
    }
}

