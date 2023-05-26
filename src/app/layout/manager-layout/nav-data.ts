export interface NavbarItem {
    routeLink: string;
    icon: string;
    label: string;
    notifications?: any; // Ajoutez la propriété notifications en option
  }
  
  export const navbarData=[
    {
    routeLink:'dashboard',
        icon:'fal fa-home',
        label :'dashboard'

    },
    {
        routeLink:'tasks',
        icon:'fa fa-check',
        label :'Tasks of manager'

    },
{        routeLink:'project',
        icon:'fa fa-cubes',
        label :'Porjects'

    }
    ,{
        routeLink:'team',
        icon:'fa fa-users',
        label :'team'
        
    },
    {
        routeLink:'TaskUser',
        icon:'fa fa-list',
        label :'Tasks of user'

    }
    
    ,
    {
        routeLink:'profil',
        icon:'fa fa-user',
        label :'profil'

    }
];
