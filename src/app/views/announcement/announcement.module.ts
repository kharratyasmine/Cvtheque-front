import {NgModule} from '@angular/core';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatStepper, MatStepperModule} from '@angular/material/stepper';
import {CdkStepper, CdkStepperModule} from '@angular/cdk/stepper';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {CommonModule} from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {AnnouncementRoutingModule} from './announcement-routing.module';
import {AnnouncementComponent} from './announcement.component';

@NgModule({
  imports: [
    AnnouncementRoutingModule,
    Ng2SmartTableModule,
    MatDialogModule,
    MatButtonModule,
    MatStepperModule,
    CdkStepperModule,
    FormsModule,
    MatSelectModule,
    CommonModule,
    MatExpansionModule,
    MatIconModule,
    MatDatepickerModule
  ],
  declarations: [ AnnouncementComponent],
  providers: [
    MatStepper, CdkStepper
  ]
})
export class AnnouncementModule {
}
