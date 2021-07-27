import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AvantagesComponent} from './avantages.component';


const routes: Routes = [
  {
    path: '',
    component: AvantagesComponent,
    data: {
      title: 'Avantages'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvantagesRoutingModule {}
