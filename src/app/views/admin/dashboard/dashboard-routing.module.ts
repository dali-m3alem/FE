import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfilComponent } from './profil/profil.component';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { ProjectsComponent } from './projects/projects.component';
import { UsersComponent } from './user/users/users.component';

const routes: Routes = [
  {path:'',component:DashboardComponent},
  {path:'profil',component:ProfilComponent},
  {path:'Calender',component:CalendrierComponent},
  {path:'Projects',component:ProjectsComponent},

  {path:'user11',component:UsersComponent},




];

@NgModule({
  imports: [RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
