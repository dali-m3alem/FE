import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthAdminLayoutComponent } from './log/auth-admin-layout/auth-admin-layout.component';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkMenuModule } from '@angular/cdk/menu';
import { ManagerLayoutComponent } from './manager-layout/manager-layout.component';
import { ResetPaswordComponent } from './log/reset-pasword/reset-pasword.component';
import { DashboardModule } from "../views/admin/dashboard/dashboard.module";
import { ForgotComponent } from './log/forgot/forgot.component';
import { AdminUserLayoutComponent } from './admin-user-layout/admin-user-layout.component';
import { AdminManagerLayoutComponent } from './admin-manager-layout/admin-manager-layout.component';




@NgModule({
    declarations: [
        AdminLayoutComponent,
        UserLayoutComponent,
        AuthAdminLayoutComponent,
        ManagerLayoutComponent,
        ResetPaswordComponent,
        ForgotComponent,
        AdminUserLayoutComponent,
        AdminManagerLayoutComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MatIconModule,
        FormsModule,
        OverlayModule,
        CdkMenuModule,
        DashboardModule
    ]
})
export class LayoutModule { }
