import { Component } from '@angular/core';
import { AuthadminService } from 'src/app/views/services/authadmin.service';
import { DataService } from 'src/app/views/services/data.service';
import { ProjectService } from 'src/app/views/services/project.service';
import { TasksService } from 'src/app/views/services/tasks.service';
import { Task } from '../tasks/tasks.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  budgetscount: number = 0;
  projectCount: number = 0;
  userCount:number=0;
   userId=this.auth.getUser();
   tasks: Task[] = [];

  constructor(private projectService: ProjectService,private serv:DataService, private auth: AuthadminService ,private taskService :TasksService) {}
  ngOnInit(): void {

  this.projectService.projects().subscribe(
    (count: number) => {
      this.projectCount = count;
    },
    (error: any) => {
      console.log(error);
    }
  );
  this.serv.Users().subscribe(
    (count: number) => {
      this.userCount = count;
    },
    (error: any) => {
      console.log(error);
    }
  );
  this.projectService.budgets().subscribe(
    (budgets: number) => {
      this.budgetscount = budgets;
    },
    (error: any) => {
      console.log(error);
    }
  );

  this.taskService.getTasksByUserId(this.userId)
  .subscribe(
    (tasks: Task[]) => {
      this.tasks = tasks;
    },
    error => console.error(error)
  );}
}
