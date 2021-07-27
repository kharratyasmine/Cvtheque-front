import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CompetanceComponent} from './Competance.component';


const routes: Routes = [
  {
    path: '',
    component: CompetanceComponent,
    data: {
      title: 'Competance'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompetanceRoutingModule {}
