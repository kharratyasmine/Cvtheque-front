import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CandidatComponent} from './candidat.component';


const routes: Routes = [
  {
    path: '',
    component: CandidatComponent,
    data: {
      title: 'Candidat'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidatRoutingModule {}
