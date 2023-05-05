import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { ProfilComponent } from './profil/profil.component';
import { TasksComponent } from './tasks/tasks.component';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    HomeComponent,
    ProfilComponent,
    TasksComponent,
    CalendrierComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule
  ]
})
export class HomeModule { }