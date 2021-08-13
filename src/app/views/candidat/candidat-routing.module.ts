import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CandidatComponent} from './candidat.component';
import {CandidateDetailsComponent} from './candidate-details/candidate-details.component';


const routes: Routes = [
  {
    path: '',
    component: CandidatComponent,
    data: {
      title: 'Candidat'
    }
  },
  {
    path: 'details/:id',
    component: CandidateDetailsComponent,
    data: {
      title: 'Candidat Details'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidatRoutingModule {}
