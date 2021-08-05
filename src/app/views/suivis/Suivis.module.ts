import {NgModule} from '@angular/core';
import {SuivisComponent} from './Suivis.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {SuivisRoutingModule} from './Suivis-routing.module';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatStepper, MatStepperModule} from '@angular/material/stepper';
import {CdkStepper, CdkStepperModule} from '@angular/cdk/stepper';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {SuivisService} from '../../services/suivis.service';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [
        SuivisRoutingModule,
        Ng2SmartTableModule,
        MatDialogModule,
        MatButtonModule,
        MatStepperModule,
        CdkStepperModule,
        FormsModule,
        MatSelectModule,
        ReactiveFormsModule,
        CommonModule
    ],
    declarations: [SuivisComponent],
    exports: [
        SuivisComponent
    ],
    providers: [
        SuivisService
    ]
})
export class SuivisModule {
}
