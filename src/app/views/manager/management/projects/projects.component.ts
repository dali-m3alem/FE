import { Component } from '@angular/core';
import { Activity, Project } from 'src/app/views/model/user';
import { AuthadminService } from 'src/app/views/services/authadmin.service';
import { ProjectService } from 'src/app/views/services/project.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { ActivitiesService } from 'src/app/views/services/activities.service';
import { ManagementRoutingModule } from '../management-routing.module';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import Swal from "sweetalert2";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
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
    const adminId = this.auth.getUser();
    this.projectService.getAllProjectsByManagerId(adminId).subscribe(
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


