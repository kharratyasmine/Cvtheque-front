import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UniversityComponent} from './university.component';


const routes: Routes = [
  {
    path: '',
    component: UniversityComponent,
    data: {
      title: 'University'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UniversityRoutingModule {}
