import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfilComponent } from './profil/profil.component';
import { TasksComponent } from './tasks/tasks.component';
import { ProjectsComponent } from './projects/projects.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AddActivityComponent } from './activities/add-activity/add-activity.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddTaskComponent } from './taskss/task/add-task/add-task.component';
import { AddTeamComponent } from './teams/add-team/add-team.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { DashboardModule } from "../../admin/dashboard/dashboard.module";
import { TaskComponent } from './taskss/task/task.component';
import { TeamComponent } from './activities/team/team.component';
import { TeamsComponent } from './teams/teams.component';
import { UpdateTaskComponent } from './taskss/task/update-task/update-task.component';
import { CustomDatePipe } from 'src/assets/pipes/custom-date.pipe';
import { CustomDateTimePipe } from 'src/assets/pipes/custom-date-time.pipe';
import { UpdateActivityComponent } from './activities/update-activity/update-activity.component';
import { UpdateTeamComponent } from './teams/update-team/update-team.component';
import { DetailsTaskComponent } from './taskss/task/details-task/details-task.component';
import { DetailsActivityComponent } from './activities/details-activity/details-activity.component';
import { DetailsTeamComponent } from './teams/details-team/details-team.component';
import { ActivityComponent } from './activities/activity/activity.component';
import { TaskUserComponent } from './task-user/task-user.component';
import { InfoTaskComponent } from './info-task/info-task.component';
import { FilterPipe } from 'src/assets/pipes/filter.pipe';
import { NgApexchartsModule } from "ng-apexcharts";
import { MatIconModule } from '@angular/material/icon';
import { MorrisJsModule } from 'angular-morris-js';



@NgModule({
    declarations: [
        DashboardComponent,
        ProfilComponent,
        TasksComponent,
        ProjectsComponent,
        AddActivityComponent,
        AddTaskComponent,
        AddTeamComponent,
        ActivityComponent,
        TaskComponent,
        TeamComponent,
        TeamsComponent,
        UpdateTaskComponent,
        UpdateActivityComponent,
        UpdateTeamComponent,
        DetailsTaskComponent,
        DetailsActivityComponent,
        DetailsTeamComponent,
        TaskUserComponent,
        InfoTaskComponent,
    ],
    imports: [
        CommonModule,
        ManagementRoutingModule,
        DragDropModule,
        MatIconModule,
        ReactiveFormsModule,
        FormsModule, MatExpansionModule,DashboardModule      ,
        NgApexchartsModule,
        MorrisJsModule
        ],
    providers: [
        DatePipe
      ],
    entryComponents: [AddActivityComponent,AddTeamComponent,AddTaskComponent,UpdateTaskComponent,UpdateTeamComponent,UpdateActivityComponent,InfoTaskComponent]
})
export class ManagementModule { }
