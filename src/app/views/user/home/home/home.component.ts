import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Project, Task } from 'src/app/views/model/user';
import { AuthadminService } from 'src/app/views/services/authadmin.service';
import { DataService } from 'src/app/views/services/data.service';
import { ProjectService } from 'src/app/views/services/project.service';
import { TasksService } from 'src/app/views/services/tasks.service';
import { TeamsService } from 'src/app/views/services/teams.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
 
   userId=this.auth.getUser();
   tasks: Task[] = [];

 




  constructor(private asd: DataService,public modalService: NgbModal,private projectService: ProjectService,private serv:DataService, private auth: AuthadminService,private task :TasksService,private teamSer:TeamsService) {}
  dataArray!:any;
  budgetscount: number = 0;
  projectCount: number = 0;
  userCount:number=0;
  countTask:any;
  dataUser: any;
  ngOnInit(): void {
    this.loadProject();
    this.loadData();
    this.getTeam()
    this.task.getTasksnotDone().subscribe(
      (countTask) => {
        this.countTask = countTask;
      },
      (error: any) => {
        console.log(error);
      }
    );
   
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
    this.task.getTasksByUserId()
    .subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks;
      },
      error => console.error(error)
    );}
  imageSrc!: string;
  userInfo: any;
  getImageUrl() {
    return this.imageSrc;
  }
  loadData() {
    this.asd.getUserData().subscribe((data: any) => {
      this.userInfo = data;
      this.imageSrc = 'data:image/jpeg;base64,' + this.userInfo.profilePicture;

    });

  }
 
  loadProject(){
    this.task.getTasksByUserId().subscribe(
      (response:any) => {
        this.dataArray = response;
        console.log(this.dataArray);

      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  getTeam(){

    // ...
    
    this.teamSer.getTeam().subscribe(
      (response: any) => {
        this.dataUser = response; // Assign the response to 'dataArray'
        console.log(response);
      },
      (error: any) => {
        console.log(error);
      }
    );
    
    }    
 }
