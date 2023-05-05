import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardadminGuard } from './guards/guardadmin.guard';
import { GuardmanagerGuard } from './guards/guardmanager.guard';
import { GuarduserGuard } from './guards/guarduser.guard';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { AuthAdminLayoutComponent } from './layout/auth-admin-layout/auth-admin-layout.component';
import { ManagerLayoutComponent } from './layout/manager-layout/manager-layout.component';
import { UserLayoutComponent } from './layout/user-layout/user-layout.component';
import { ResetPaswordComponent } from './layout/reset-pasword/reset-pasword.component';

const routes: Routes = [
  {path:'user',component:UserLayoutComponent,canActivate:[GuarduserGuard],children:[
    {path:'',loadChildren:()=>import('./views/user/home/home.module').then(m=>m.HomeModule)},

  ]},
  {path:'manager',component:ManagerLayoutComponent,canActivate:[GuardmanagerGuard],children:[
    {path:'',loadChildren:()=>import('./views/manager/management/management.module').then(m=>m.ManagementModule)},
    {path:'AddTask',loadChildren:()=>import('./views/manager/management/management.module').then(m=>m.ManagementModule)},


  ]},
  {path:'',component:AdminLayoutComponent ,canActivate:[GuardadminGuard],children:[
    {path:'',loadChildren:()=>import('./views/admin/dashboard/dashboard.module').then(m=>m.DashboardModule)},
    {path:'dashboard',loadChildren:()=>import('./views/admin/dashboard/dashboard.module').then(m=>m.DashboardModule)},
    {path:'tasks',loadChildren:()=>import('./views/admin/dashboard/dashboard.module').then(m=>m.DashboardModule)}, {path:'project',loadChildren:()=>import('./views/admin/dashboard/dashboard.module').then(m=>m.DashboardModule)},
    {path:'profil',loadChildren:()=>import('./views/admin/dashboard/dashboard.module').then(m=>m.DashboardModule)},

  ]}
  ,{path:'login',component:AuthAdminLayoutComponent },
  { path: 'reset-password', component:ResetPaswordComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }