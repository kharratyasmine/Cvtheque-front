import {NgModule} from '@angular/core';
import {CandidatComponent} from './candidat.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {CandidatRoutingModule} from './candidat-routing.module';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatStepper, MatStepperModule} from '@angular/material/stepper';
import {CdkStepper, CdkStepperModule} from '@angular/cdk/stepper';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {CommonModule} from '@angular/common';
import { CandidateDetailsComponent } from './candidate-details/candidate-details.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {SuivisModule} from '../suivis/Suivis.module';
import {PdfViewerModule} from 'ng2-pdf-viewer';

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
    CommonModule,
    MatExpansionModule,
    MatIconModule,
    MatDatepickerModule,
    SuivisModule,
    ReactiveFormsModule,
    PdfViewerModule
  ],
  declarations: [CandidatComponent, CandidateDetailsComponent],
  providers: [
    MatStepper, CdkStepper
  ]
})
export class CandidatModule {
}
