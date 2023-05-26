
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { DashboardModule } from './views/admin/dashboard/dashboard.module';
import { DashboardComponent } from './views/admin/dashboard/dashboard/dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { KanbanModule } from '@syncfusion/ej2-angular-kanban';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { MatDialogModule } from '@angular/material/dialog';

import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CustomDatePipe } from 'src/assets/pipes/custom-date.pipe';
import { CustomDateTimePipe } from 'src/assets/pipes/custom-date-time.pipe';
import { FilterPipe } from 'src/assets/pipes/filter.pipe';
import { MorrisJsModule } from 'angular-morris-js';

@NgModule({
  declarations: [
    AppComponent,
    
 ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    DashboardModule,
    MatIconModule,
    HttpClientModule,
    KanbanModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    MatDialogModule,
    MorrisJsModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
