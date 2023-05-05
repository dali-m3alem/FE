import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthAdminLayoutComponent } from './auth-admin-layout/auth-admin-layout.component';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkMenuModule } from '@angular/cdk/menu';
import { ManagerLayoutComponent } from './manager-layout/manager-layout.component';
import { ResetPaswordComponent } from './reset-pasword/reset-pasword.component';




@NgModule({
  declarations: [
    AdminLayoutComponent,
    UserLayoutComponent,
    AuthAdminLayoutComponent,
    ManagerLayoutComponent,
    ResetPaswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule, 
    MatIconModule,
    FormsModule,
    OverlayModule,
    CdkMenuModule

  ]
})
export class LayoutModule { }
