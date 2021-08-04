import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// Import Containers
import {DefaultLayoutComponent} from './containers';

import {P404Component} from './views/error/404.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {path: 'Suivis',
        loadChildren: () => import('./views/suivis/Suivis.module').then(m => m.SuivisModule)
      },
      {path: 'candidat',
        loadChildren: () => import('./views/candidat/candidat.module').then(m => m.CandidatModule)
      },
      {path: 'avantages',
        loadChildren: () => import('./views/avantages/avantages.module').then(m => m.AvantagesModule)
      },
      {path: 'candidature',
        loadChildren: () => import('./views/candidature/candidature.module').then(m => m.CandidatureModule)
      },
      {path: 'competence',
        loadChildren: () => import('./views/competence/competence.module').then(m => m.CompetenceModule)
      },
      {path: 'postes',
        loadChildren: () => import('./views/postes/postes.module').then(m => m.PostesModule)
      },
      {path: 'université',
        loadChildren: () => import('./views/university/university.module').then(m => m.UniversityModule)
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}