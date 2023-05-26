import { Component } from '@angular/core';
import { Activity, Project } from '../../model/user';
import { AuthadminService } from '../../services/authadmin.service';
import { ProjectService } from '../../services/project.service';
import { ActivitiesService } from '../../services/activities.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-project-manager',
  templateUrl: './project-manager.component.html',
  styleUrls: ['./project-manager.component.scss']
})
export class ProjectManagerComponent {
  dataArray!: Project[];
  panelOpenState = false;
  searchValue: string = '';
 
  activitiesMap: {[projectId: number]: Activity[]} = {}; // tableau associatif pour stocker les activités de chaque projet

  constructor(private projectService: ProjectService, private auth: AuthadminService, private activitySer:ActivitiesService , private router:Router) {
   
   }

   ngOnInit(): void {
    Swal.fire({
      title: "Chargement",
      html: "Veuillez patientez, chargements en cours ....",
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      }
    });
    this.projectService.getAllProjectsByManagerId().subscribe(
      (response: Project[]) => {
        this.dataArray = response;
        console.log(this.dataArray);
        Swal.close();

      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  togglePanel(project: Project) {
    project.expanded = !project.expanded;
  }
  
 
}


