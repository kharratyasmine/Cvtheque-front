import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-home',
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
  {name: 'Competence',
    url: '/competence',
    icon: 'cil-library-add'
  },
  {name: 'Avantages',
    url: '/avantages',
    icon: 'cil-star'
  },
  {name: 'Postes',
    url: '/Postes',
    icon: 'cil-contact'
  },
  {name: 'Université',
    url: '/University',
    icon: 'cil-education'
  },
  {name: 'Annonce',
    url: '/announcement',
    icon: 'cil-volume-low'
  },
];
