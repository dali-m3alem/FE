import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminManagerRoutingModule } from './admin-manager-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfilComponent } from './profil/profil.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProjectsComponent } from './projects/projects.component';
import { AddProjectComponent } from './projects/add/add-project.component';
import { EditProjectComponent } from './projects/edit/edit-project.component';
import { DetailsProjectComponent } from './projects/details/details-project.component';
import { AddComponent } from './user/users/add/add.component';
import { EditComponent } from './user/users/edit/edit.component';
import { DetailsComponent } from './user/users/details/details.component';
import { UsersComponent } from './user/users/users.component';
import { ActivityComponent } from './activities/activity/activity.component';
import { AddActivityComponent } from './activities/add-activity/add-activity.component';
import { UpdateActivityComponent } from './activities/update-activity/update-activity.component';
import { DetailsActivityComponent } from './activities/details-activity/details-activity.component';
import { TeamComponent } from './activities/team/team.component';
import { ProjectManagerComponent } from './project-manager/project-manager.component';
import { DashboardModule } from '../admin/dashboard/dashboard.module';
import { AddTaskComponent } from './taskss/task/add-task/add-task.component';
import { UpdateTaskComponent } from './taskss/task/update-task/update-task.component';
import { DetailsTaskComponent } from './taskss/task/details-task/details-task.component';
import { TaskComponent } from './taskss/task/task.component';
import { InfoTaskComponent } from './info-task/info-task.component';
import { AddTeamComponent } from './teams/add-team/add-team.component';
import { UpdateTeamComponent } from './teams/update-team/update-team.component';
import { DetailsTeamComponent } from './teams/details-team/details-team.component';
import { TeamsComponent } from './teams/teams.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskUserComponent } from './task-user/task-user.component';
import { ChatComponent } from './chat/chat.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ProfilComponent,
    ProjectsComponent,
    AddProjectComponent,
    EditProjectComponent,
    DetailsProjectComponent,
    AddComponent, EditComponent,DetailsComponent,
    UsersComponent,          UpdateActivityComponent,
    ActivityComponent,        AddActivityComponent,
    DetailsActivityComponent,        TeamComponent, ProjectManagerComponent,
    AddTaskComponent,UpdateTaskComponent,DetailsTaskComponent,TaskComponent
,InfoTaskComponent,AddTeamComponent,UpdateTeamComponent,DetailsTeamComponent
,TeamsComponent,TasksComponent,TaskUserComponent,ChatComponent
  ],
  imports: [
    CommonModule,
    AdminManagerRoutingModule
    ,
    MatIconModule,
    MatToolbarModule,
    MatIconModule ,
    DragDropModule,
    ReactiveFormsModule,
    HttpClientModule,FormsModule,MatDatepickerModule,MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,DashboardModule,
  ],
  entryComponents: [AddProjectComponent, DetailsProjectComponent, EditProjectComponent,AddComponent,InfoTaskComponent, EditComponent,DetailsComponent],

})
export class AdminManagerModule { }
