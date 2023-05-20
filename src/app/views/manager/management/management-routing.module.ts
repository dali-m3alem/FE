import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TasksComponent } from './tasks/tasks.component';
import { ProfilComponent } from './profil/profil.component';
import { ProjectsComponent } from './projects/projects.component';
import { AddActivityComponent } from './activities/add-activity/add-activity.component';
import { AddTaskComponent } from './taskss/task/add-task/add-task.component';
import { AddTeamComponent } from './teams/add-team/add-team.component';
import { TaskComponent } from './taskss/task/task.component';
import { TeamComponent } from './activities/team/team.component';
import { TeamsComponent } from './teams/teams.component';
import { UpdateTaskComponent } from './taskss/task/update-task/update-task.component';
import { ActivityComponent } from './activities/activity/activity.component';
import { TaskUserComponent } from './task-user/task-user.component';

const routes: Routes = [
  {path:'dashboard',component:DashboardComponent},
  {path:'',component:DashboardComponent},
  {path:'project',component:ProjectsComponent},
  {path:'tasks',component:TasksComponent},
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
export class ManagementRoutingModule { }
