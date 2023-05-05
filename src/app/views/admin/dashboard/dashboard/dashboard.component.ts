import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'src/app/views/model/user';
import { AuthadminService } from 'src/app/views/services/authadmin.service';
import { DataService } from 'src/app/views/services/data.service';
import { ProjectService } from 'src/app/views/services/project.service';
import { AddProjectComponent } from '../projects/add/add-project.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dataArray!: Project[];
  budgetscount: number = 0;
  projectCount: number = 0;
  userCount:number=0;
  constructor(public modalService: NgbModal,private projectService: ProjectService,private serv:DataService, private auth: AuthadminService) {}

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
    this.loadProject;
   
  }
  loadProject(){
    const adminId = this.auth.getUser();
    this.projectService.getAllProjectsByAdminId(adminId).subscribe(
      (response: Project[]) => {
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
}
