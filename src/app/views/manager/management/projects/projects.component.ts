import { Component } from '@angular/core';
import { Activity, Project } from 'src/app/views/model/user';
import { AuthadminService } from 'src/app/views/services/authadmin.service';
import { ProjectService } from 'src/app/views/services/project.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { ActivitiesService } from 'src/app/views/services/activities.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  dataArray!: Project[];
  panelOpenState = false;
  activitiesMap: {[projectId: number]: Activity[]} = {}; // tableau associatif pour stocker les activités de chaque projet

  constructor(private projectService: ProjectService, private auth: AuthadminService, private activitySer:ActivitiesService) {
   
   }

   ngOnInit(): void {
    const adminId = this.auth.getUser();
    this.projectService.getAllProjectsByManagerId(adminId).subscribe(
      (response: Project[]) => {
        this.dataArray = response;
        console.log(this.dataArray);
        this.dataArray.forEach(project => {
          this.activitySer.getActivityByProjectId(project.id).subscribe(
            (response: Activity[]) => {
              this.activitiesMap[project.id] = response;
               // stocker les activités dans le tableau associatif
              console.log(response)
            },
            (error: any) => {
              console.log(error);
            });
        });
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


