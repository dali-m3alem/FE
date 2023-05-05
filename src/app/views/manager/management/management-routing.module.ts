import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TasksComponent } from './tasks/tasks.component';
import { ProfilComponent } from './profil/profil.component';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { ProjectsComponent } from './projects/projects.component';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { AddTeamComponent } from './add-team/add-team.component';

const routes: Routes = [
  {path:'dashboard',component:DashboardComponent},
  {path:'',component:DashboardComponent},
  {path:'project',component:ProjectsComponent},
  {path:'tasks',component:TasksComponent},
  {path:'profil',component:ProfilComponent},
  {path:'Calender',component:CalendrierComponent},
  {path:'AddActivity',component:AddActivityComponent},
  {path:'AddTeam',component:AddTeamComponent},
  {path:'AddTask',component:AddTaskComponent}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
