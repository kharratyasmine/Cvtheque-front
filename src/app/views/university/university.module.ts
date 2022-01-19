import {NgModule} from '@angular/core';
import {UniversityComponent} from './university.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {UniversityRoutingModule} from './university-routing.module';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatStepper, MatStepperModule} from '@angular/material/stepper';
import {CdkStepper, CdkStepperModule} from '@angular/cdk/stepper';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    UniversityRoutingModule,
    Ng2SmartTableModule,
    MatDialogModule,
    MatButtonModule,
    MatStepperModule,
    CdkStepperModule,
    FormsModule,
    MatSelectModule,
    CommonModule
  ],
  declarations: [UniversityComponent],
  providers: [
    MatStepper, CdkStepper
  ]
})
export class UniversityModule {
}
