import {NgModule} from '@angular/core';
import {CandidatureComponent} from './candidature.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {CandidatureRoutingModule} from './candidature-routing.module';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CandidatureRoutingModule,
    Ng2SmartTableModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [CandidatureComponent],
  providers: [
  ]
})
export class CandidatureModule {
}
