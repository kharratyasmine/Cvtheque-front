import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CandidatureComponent} from './candidature.component';


const routes: Routes = [
  {
    path: '',
    component: CandidatureComponent,
    data: {
      title: 'Candidature'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidatureRoutingModule {}
