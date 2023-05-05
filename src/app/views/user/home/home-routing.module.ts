import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfilComponent } from './profil/profil.component';
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'dashboard',component:HomeComponent},
  {path:'profil',component:ProfilComponent},
  {path:'tasks',component:TasksComponent}



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }