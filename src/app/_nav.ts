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
    url: '/post',
    icon: 'cil-contact'
  },
  {name: 'Université',
    url: '/university',
    icon: 'cil-education'
  },
  {name: 'Annonces',
    url: '/announcement',
    icon: 'cil-volume-low'
  },
];
