import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfilComponent } from './profil/profil.component';
import { TasksComponent } from './tasks/tasks.component';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { ProjectsComponent } from './projects/projects.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddTaskComponent } from './add-task/add-task.component';
import { AddTeamComponent } from './add-team/add-team.component';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  declarations: [
    DashboardComponent,
    ProfilComponent,
    TasksComponent,
    CalendrierComponent,
    ProjectsComponent,
    AddActivityComponent,
    AddTaskComponent,
    AddTeamComponent
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    DragDropModule,
    ReactiveFormsModule,
    FormsModule,MatExpansionModule
  ]
})
export class ManagementModule { }
