import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
  },
  {
    name: 'Candidat',
    url: '/candidat',
    icon: 'icon-people'
  },
  // {
  //   name: 'candidature',
  //   url: '/candidature',
  //   icon: 'icon-people'
  // },
  // {name: 'Suivis',
  //   url: '/Suivis',
  //   icon: 'icon-pie-chart'
  // },
  {name: 'Competence',
    url: '/competence',
    icon: 'icon-pie-chart'
  },
  {name: 'Avantages',
    url: '/avantages',
    icon: 'icon-pie-chart'
  },
  {name: 'Postes',
    url: '/Postes',
    icon: 'icon-pie-chart'
  },
  {name: 'Université',
    url: '/University',
    icon: 'icon-pie-chart'
  },
];