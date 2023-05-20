import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminUserRoutingModule } from './admin-user-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddProjectComponent } from './projects/add/add-project.component';
import { DashboardModule } from '../admin/dashboard/dashboard.module';
import { ProjectsComponent } from './projects/projects.component';
import { EditProjectComponent } from './projects/edit/edit-project.component';
import { DetailsProjectComponent } from './projects/details/details-project.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UsersComponent } from './user/users/users.component';
import { AddComponent } from './user/users/add/add.component';
import { EditComponent } from './user/users/edit/edit.component';
import { DetailsComponent } from './user/users/details/details.component';
import { TaskUserComponent } from './task-user/task-user.component';
import { InfoTaskComponent } from './info-task/info-task.component';
import { ProfilComponent } from './profil/profil.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AddProjectComponent,
    ProjectsComponent,EditProjectComponent,DetailsProjectComponent
    ,UsersComponent,AddComponent,EditComponent,DetailsComponent,
    TaskUserComponent,InfoTaskComponent,ProfilComponent
  ],
  imports: [
    CommonModule,
    AdminUserRoutingModule,DashboardModule,

    MatIconModule,
    MatToolbarModule,
    MatIconModule ,
    DragDropModule,
    ReactiveFormsModule,
    HttpClientModule,FormsModule,MatDatepickerModule,MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,

  ],
  entryComponents: [AddProjectComponent, DetailsProjectComponent, EditProjectComponent,AddComponent, EditComponent,DetailsComponent,InfoTaskComponent],

})
export class AdminUserModule { }
