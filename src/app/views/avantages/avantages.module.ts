import {NgModule} from '@angular/core';
import {AvantagesComponent} from './avantages.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatStepper, MatStepperModule} from '@angular/material/stepper';
import {CdkStepper, CdkStepperModule} from '@angular/cdk/stepper';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {AvantagesRoutingModule} from './avantages-routing.module';

@NgModule({
  imports: [
    AvantagesRoutingModule,
    Ng2SmartTableModule,
    MatDialogModule,
    MatButtonModule,
    MatStepperModule,
    CdkStepperModule,
    FormsModule,
    MatSelectModule
  ],
  declarations: [AvantagesComponent],
  providers: [
  ]
})
export class AvantagesModule {
}
