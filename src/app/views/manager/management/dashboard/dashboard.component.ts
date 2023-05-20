import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'src/app/views/model/user';
import { AuthadminService } from 'src/app/views/services/authadmin.service';
import { DataService } from 'src/app/views/services/data.service';
import { ProjectService } from 'src/app/views/services/project.service';
import { TasksService } from 'src/app/views/services/tasks.service';
import { TeamsService } from 'src/app/views/services/teams.service';
import { ChartComponent } from "ng-apexcharts";
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private asd: DataService,public modalService: NgbModal,private projectService: ProjectService,private serv:DataService, private auth: AuthadminService,private task :TasksService,private teamSer:TeamsService) {}
  dataArray!: Project[];
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
   
  }
  imageSrc!: string;
  userInfo: any;
  getImageUrl() {
    return this.imageSrc;
  }
  loadData() {
    const user = this.auth.getUser();
    this.asd.getUserData(user).subscribe((data: any) => {
      this.userInfo = data;
      this.imageSrc = 'data:image/jpeg;base64,' + this.userInfo.profilePicture;

    });

  }
 
  loadProject(){
    const adminId = this.auth.getUser();
    this.projectService.getAllProjectsByManagerId(adminId).subscribe(
      (response: Project[]) => {
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