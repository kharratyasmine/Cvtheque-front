import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PostesComponent} from './postes.component';


const routes: Routes = [
  {
    path: '',
    component: PostesComponent,
    data: {
      title: 'Postes'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostesRoutingModule {}
