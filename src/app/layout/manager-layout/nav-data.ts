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
        routeLink:'profil',
        icon:'fa fa-user',
        label :'profile'

    },
    {
        routeLink:'tasks',
        icon:'fa fa-tasks',
        label :'Tasks of projects'

    },
{        routeLink:'project',
        icon:'fa fa-window-restore',
        label :'Porjects'

    }
    ,{
        routeLink:'team',
        icon:'fa fa-comments',
        label :'team'
        
    },
    {
        routeLink:'TaskUser',
        icon:'fa fa-tasks',
        label :'Tasks of Manager'

    }
    

];
