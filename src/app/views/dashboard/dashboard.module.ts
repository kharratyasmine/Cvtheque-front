import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {CommonModule} from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';



@NgModule({
  imports: [
    FormsModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    Ng2SmartTableModule,
    CommonModule,
    MatDialogModule,

  ],
  declarations: [ DashboardComponent ]
})
export class DashboardModule { }
