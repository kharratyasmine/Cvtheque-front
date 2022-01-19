import {NgModule} from '@angular/core';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {CompetenceRoutingModule} from './competence-routing.module';
import {CompetenceComponent} from './competence.component';
import {CommonModule} from '@angular/common';


@NgModule({
    imports: [
        CompetenceRoutingModule,
        Ng2SmartTableModule,
        MatDialogModule,
        MatButtonModule,
        FormsModule,
        MatSelectModule,
        ReactiveFormsModule,
        CommonModule
    ],
  declarations: [CompetenceComponent],
  providers: [
  ]
})
export class CompetenceModule {
}
