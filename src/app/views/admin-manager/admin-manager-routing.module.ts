import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfilComponent } from './profil/profil.component';
import { CalendrierComponent } from '../user/home/calendrier/calendrier.component';
import { ProjectsComponent } from './projects/projects.component';
import { UsersComponent } from './user/users/users.component';
import { AddTeamComponent } from './teams/add-team/add-team.component';
import { AddTaskComponent } from './taskss/task/add-task/add-task.component';
import { ProjectManagerComponent } from './project-manager/project-manager.component';
import { ActivityComponent } from './activities/activity/activity.component';
import { TaskComponent } from './taskss/task/task.component';
import { TeamComponent } from './activities/team/team.component';
import { TeamsComponent } from './teams/teams.component';
import { TaskUserComponent } from '../manager/management/task-user/task-user.component';
import { EmployesComponent } from './user/users/employes/employes.component';
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [
  {path:'dashboard',component:DashboardComponent},
  {path:'',component:DashboardComponent},

  {path:'tasks',component:TasksComponent},
  {path:'profil',component:ProfilComponent},
  {path:'Calender',component:CalendrierComponent},
  {path:'Projects',component:ProjectsComponent},

  {path:'user11',component:UsersComponent},
  {path:'users',component:EmployesComponent},
    {path:'project',component:ProjectManagerComponent},
  {path:'profil',component:ProfilComponent},
  {path:'AddTeam',component:AddTeamComponent},
  {path:'AddTask',component:AddTaskComponent},
  {path:'activity/:id',component:ActivityComponent},
  {path:'activity/task/:idAc/:id',component:TaskComponent},
  {path:'activity/team/:idTe/:id',component:TeamComponent}
,  {path:'team',component:TeamsComponent}
,  {path:'TaskUser',component:TaskUserComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminManagerRoutingModule { }
