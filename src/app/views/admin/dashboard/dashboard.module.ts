import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { KanbanModule } from 'smart-webcomponents-angular/kanban';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { ProfilComponent } from './profil/profil.component';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GanttModule } from '@syncfusion/ej2-angular-gantt';
import { MbscModule } from '@mobiscroll/angular-lite/src/js/modules/mobiscroll.angular.free';
import { ProjectsComponent } from './projects/projects.component';

import { CustomDatePipe } from 'src/assets/pipes/custom-date.pipe';
import { CustomDateTimePipe } from 'src/assets/pipes/custom-date-time.pipe';
import {AddProjectComponent} from "./projects/add/add-project.component";
import {DetailsProjectComponent} from "./projects/details/details-project.component";
import {EditProjectComponent} from "./projects/edit/edit-project.component";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { UsersComponent } from './user/users/users.component';
import { AddComponent } from './user/users/add/add.component';
import { DetailsComponent } from './user/users/details/details.component';
import { EditComponent } from './user/users/edit/edit.component';
import { FilterPipe } from 'src/assets/pipes/filter.pipe';
import { EmployesComponent } from './user/users/employes/employes.component';


@NgModule({
  declarations: [DashboardComponent, CustomDateTimePipe,CustomDatePipe, ProfilComponent, CalendrierComponent, ProjectsComponent, AddProjectComponent, DetailsProjectComponent, EditProjectComponent, UsersComponent, AddComponent, DetailsComponent, FilterPipe,EditComponent, EmployesComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
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
  exports:[CustomDatePipe, CustomDateTimePipe,FilterPipe],
  entryComponents: [AddProjectComponent, DetailsProjectComponent, EditProjectComponent,AddComponent, EditComponent,DetailsComponent],

  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DashboardModule {

}
