import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfilComponent } from './profil/profil.component';
import { ProjectsComponent } from './projects/projects.component';
import { UsersComponent } from './user/users/users.component';
import { TaskUserComponent } from './task-user/task-user.component';
import { EmployesComponent } from './user/users/employes/employes.component';

const routes: Routes = [
  {path:'',component:DashboardComponent},
  {path:'profil',component:ProfilComponent},
  {path:'Projects',component:ProjectsComponent},
  {path:'user11',component:UsersComponent},
  {path:'users',component:EmployesComponent},
    {path:'TaskUser',component:TaskUserComponent}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminUserRoutingModule { }
