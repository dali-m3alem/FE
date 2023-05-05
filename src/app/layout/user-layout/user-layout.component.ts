import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthadminService } from 'src/app/views/services/authadmin.service';
import { navbarData } from './nav-data';
import { notifcations } from './header-data';


interface SideNavToggle{
  screenWidth:number;
  collapsed:boolean;
}
@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent {
  constructor(private asd:AuthadminService, private route :Router){
   }


 userItems=[
    {icon:'far fa-user',
     label:'profil'},
      {icon:'far fa-cog',
     label:'settings'},
     {icon:'far fa-unlock-alt',
     label:'lock screen'},
     {icon:'far fa-power-off',
     label:'logout ', action: () => {
        this.logout();}
    }
]
logout(): void {
  // supprimer le token ici
  localStorage.removeItem('token');
  localStorage.removeItem('roles')
  this.route.navigate(['/login'])
}
   notifcations=notifcations;
  
  @HostListener('window:resize',['$event'])
  onResize(event:any){
    this.checkcanShowSearchAsOverlay(window.innerWidth)
    this.screenWidth=window.innerWidth; 
    if(this.screenWidth<=768){
      this.collapsed =false;
      this.onToggleSideNav.emit({collapsed: this.collapsed , screenWidth: this.screenWidth});
    } }

  ngOnInit(): void {
this.screenWidth=window.innerWidth; 
this.checkcanShowSearchAsOverlay(window.innerWidth) }
  @Output() onToggleSideNav:EventEmitter<SideNavToggle>=new EventEmitter();
  collapsed=false;
  screenWidth=0;
  navData=navbarData;
  toggleCollapse(){
    this.collapsed=!this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth:this.screenWidth});
  }
  closeSidenav(){
    this.collapsed=false
  }

  canShowSearchAsOverlay=false;
  getHeadClass():string{
let styleClass='';
if(this.collapsed && this.screenWidth> 768){
  styleClass='headt-trimed';
}else{
  styleClass='head-md-screen'
}
return styleClass
  }
  checkcanShowSearchAsOverlay(innerWidth:number):void{
    if(innerWidth<845)
    {
      this.canShowSearchAsOverlay=true;
    }else{
      this.canShowSearchAsOverlay=false;
    }
  }







  getBodyClass(){
    let styleClass ='';
    if(this.collapsed&&this.screenWidth>768){
      styleClass ='body-trimed';
    }
    else if (this.collapsed&&this.screenWidth>768 && this.screenWidth>0){
      styleClass='body-md-screen'

    }
    return styleClass;


  }

}
