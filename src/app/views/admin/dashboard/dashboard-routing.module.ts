import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfilComponent } from './profil/profil.component';
import { TasksComponent } from './tasks/tasks.component';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { ListUserComponent } from './list-user/list-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ProjectsComponent } from './projects/projects.component';

const routes: Routes = [
  {path:'',component:DashboardComponent},
  {path:'tasks',component:TasksComponent},
  {path:'profil',component:ProfilComponent},
  {path:'Calender',component:CalendrierComponent},
  {path:'users',component:ListUserComponent},
  {path:'Projects',component:ProjectsComponent},
  {path:'adduser',component:AddUserComponent}





];

@NgModule({
  imports: [RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
