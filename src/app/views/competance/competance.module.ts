import {NgModule} from '@angular/core';
import {CompetanceComponent} from './Competance.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {CompetanceRoutingModule} from './Competance-routing.module';



@NgModule({
    imports: [
        CompetanceRoutingModule,
        Ng2SmartTableModule,
        MatDialogModule,
        MatButtonModule,
        FormsModule,
        MatSelectModule,
        ReactiveFormsModule
    ],
  declarations: [CompetanceComponent],
  providers: [
  ]
})
export class CompetanceModule {
}
