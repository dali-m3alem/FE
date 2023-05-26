import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'src/app/views/model/user';
import { AuthadminService } from 'src/app/views/services/authadmin.service';
import { DataService } from 'src/app/views/services/data.service';
import { ProjectService } from 'src/app/views/services/project.service';
import { AddProjectComponent } from '../projects/add/add-project.component';
import { AddComponent } from '../user/users/add/add.component';
import { TasksService } from 'src/app/views/services/tasks.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dataArray!: any;
  budgetscount: number = 0;
  projectCount: number = 0;
  userCount:number=0;
  countTask:any;
  dataUser: any;
  constructor(private asd: DataService,public modalService: NgbModal,private projectService: ProjectService,private serv:DataService, private auth: AuthadminService,private task :TasksService) {}

  ngOnInit(): void {
    this.loadProject();
    this.loadData();
    this.UsersData();
    
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

  getImageUrl() {
    return this.imageSrc;
  }

  UsersData(){
   
    this.serv.getAllusers().subscribe(
      (response: any) => {
        this.dataUser = response;
      },
      (error: any) => {
        console.log(error);
      }
    );


    
  } 
  loadProject(){
    this.projectService.getAllProjectsByAdminId().subscribe(
      (response) => {
        this.dataArray = response;
        console.log(this.dataArray);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  
  addProject(){
  
      const options2: NgbModalOptions = {
        size: 'xl',
        centered: true,
        scrollable: true,
        windowClass:'modal-holder'
  
      };
      const modalRef = this.modalService.open(AddProjectComponent, options2);
  
      modalRef.result.then((result) => {
        console.log(result);
        this.loadProject();
      }).catch((error) => {
        console.log(error);
      });
   
  }
  addUser(){
  
    const options2: NgbModalOptions = {
      size: 'xl',
      centered: true,
      scrollable: true,
      windowClass:'modal-holder'

    };
    const modalRef = this.modalService.open(AddComponent, options2);

    modalRef.result.then((result) => {
      console.log(result);
      this.loadProject();
    }).catch((error) => {
      console.log(error);
    });
 
}







  isTodoActive: boolean = true;
  isProgressActive: boolean = false;
  timeElement: HTMLElement | null = null;
  dateElement: HTMLElement | null = null;

  setActiveButton(button: string) {
    if (button === 'todo') {
      this.isTodoActive = true;
      this.isProgressActive = false;
    } else if (button === 'progress') {
      this.isTodoActive = false;
      this.isProgressActive = true;
    }
  }
  
 
  
  imageSrc!: string;
  userInfo: any;


  loadData() {
    this.asd.getUserData().subscribe((data: any) => {
      this.userInfo = data;
      this.imageSrc = 'data:image/jpeg;base64,' + this.userInfo.profilePicture;

    });

  }
}