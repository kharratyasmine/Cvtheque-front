import {NgModule} from '@angular/core';
import {CandidatComponent} from './candidat.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {CandidatRoutingModule} from './candidat-routing.module';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatStepper, MatStepperModule} from '@angular/material/stepper';
import {CdkStepper, CdkStepperModule} from '@angular/cdk/stepper';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CandidatRoutingModule,
    Ng2SmartTableModule,
    MatDialogModule,
    MatButtonModule,
    MatStepperModule,
    CdkStepperModule,
    FormsModule,
    MatSelectModule,
    CommonModule
  ],
  declarations: [CandidatComponent],
  providers: [
    MatStepper, CdkStepper
  ]
})
export class CandidatModule {
}
