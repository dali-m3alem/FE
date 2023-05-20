import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardadminGuard } from './guards/guardadmin.guard';
import { GuardmanagerGuard } from './guards/guardmanager.guard';
import { GuarduserGuard } from './guards/guarduser.guard';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { AuthAdminLayoutComponent } from './layout/log/auth-admin-layout/auth-admin-layout.component';
import { ManagerLayoutComponent } from './layout/manager-layout/manager-layout.component';
import { UserLayoutComponent } from './layout/user-layout/user-layout.component';
import { ResetPaswordComponent } from './layout/log/reset-pasword/reset-pasword.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { ForgotComponent } from './layout/log/forgot/forgot.component';
import { AdminManagerLayoutComponent } from './layout/admin-manager-layout/admin-manager-layout.component';
import { AdminUserLayoutComponent } from './layout/admin-user-layout/admin-user-layout.component';

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

  ]},{path:'AdminManager',component:AdminManagerLayoutComponent ,canActivate:[GuardmanagerGuard],children:[
    {path:'',loadChildren:()=>import('./views/admin-manager/admin-manager.module').then(m=>m.AdminManagerModule)},

  ]}
  ,{path:'AdminUser',component:AdminUserLayoutComponent ,canActivate:[GuarduserGuard],children:[
    {path:'',loadChildren:()=>import('./views/admin-user/admin-user.module').then(m=>m.AdminUserModule)},

    
  ]}
  ,{path:'login',component:AuthAdminLayoutComponent ,canActivate: [AuthGuardGuard]},
  { path: 'reset-password', component:ResetPaswordComponent },
  { path: 'forgot', component:ForgotComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }