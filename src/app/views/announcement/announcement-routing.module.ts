import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AnnouncementComponent} from './announcement.component';


const routes: Routes = [
  {
    path: '',
    component: AnnouncementComponent,
    data: {
      title: 'Announcement'
    }
  },
  {
    path: 'details',
    component: AnnouncementComponent,
    data: {
      title: 'Announcement'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnouncementRoutingModule {}
