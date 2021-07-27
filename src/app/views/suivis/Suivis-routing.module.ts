import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SuivisComponent} from './Suivis.component';


const routes: Routes = [
  {
    path: '',
    component: SuivisComponent,
    data: {
      title: 'Suivis'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuivisRoutingModule {}
