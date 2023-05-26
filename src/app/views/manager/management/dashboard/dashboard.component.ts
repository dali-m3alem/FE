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


   chartData;
   chartOptions;
   lineData;
   lineOption;
  public barColors = {
    a: "#ff9b44",
    b: "#fc6075",
  };
  public lineColors = {
    a: "#ff9b44",
    b: "#fc6075",   
  };

  ngOnInit(): void {
   

    this.chartOptions = {
      xkey: "y",
      ykeys: ["a", "b"],
      labels: ["Total Income", "Total Outcome"],
      barColors: [this.barColors.a, this.barColors.b],
    };

    this.chartData = [
      { y: "2006", a: 100, b: 90 },
      { y: "2007", a: 75, b: 65 },
      { y: "2008", a: 50, b: 40 },
      { y: "2009", a: 75, b: 65 },
      { y: "2010", a: 50, b: 40 },
      { y: "2011", a: 75, b: 65 },
      { y: "2012", a: 100, b: 90 },
    ];

    this.lineOption = {
      xkey: "y",
      ykeys: ["a", "b"],
      labels: ["Total Sales", "Total Revenue"],
      resize: true,
      lineColors: [this.lineColors.a, this.lineColors.b],
    };

    this.lineData = [
      { y: '2006', a: 50, b: 90 },
      { y: '2007', a: 75,  b: 65 },
      { y: '2008', a: 50,  b: 40 },
      { y: '2009', a: 75,  b: 65 },
      { y: '2010', a: 50,  b: 40 },
      { y: '2011', a: 75,  b: 65 },
      { y: '2012', a: 100, b: 50 }
    ];




  
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
    this.asd.getUserData().subscribe((data: any) => {
      this.userInfo = data;
      this.imageSrc = 'data:image/jpeg;base64,' + this.userInfo.profilePicture;

    });

  }
 
  loadProject(){
    this.projectService.getAllProjectsByManagerId().subscribe(
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