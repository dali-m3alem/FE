import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthadminService } from 'src/app/views/services/authadmin.service';
import { notifcations } from './header-data';
import { navbarData } from './nav-data';
import { DataService } from 'src/app/views/services/data.service';
interface SideNavToggle{
  screenWidth:number;
  collapsed:boolean;
}
@Component({
  selector: 'app-manager-layout',
  templateUrl: './manager-layout.component.html',
  styleUrls: ['./manager-layout.component.scss']
})
export class ManagerLayoutComponent {
  imageSrc!: string;
  userInfo: any;
  unreadNotificationCount!: number;
  notifications: any;
  constructor(private asd:AuthadminService, private route :Router,private ser:DataService){
    console.log(this.asd.LoggedIsUser())

    this.ser.getUserData().subscribe((data: any) => {
      this.userInfo = data;
      this.imageSrc = 'data:image/jpeg;base64,' + this.userInfo.profilePicture;

    });
   }

  
  userItems=[
    {icon:'far fa-user',
     label:'profil', action: () => {
      this.profil();}},
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
profil(){
  this.route.navigate(['/manager/profil'])
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
    this.getUnreadNotificationCount();
    
    this.getUserNotifications()
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



  getUnreadNotificationCount(){
    const user = this.asd.getUser();

    this.ser.getUnreadNotificationCount(user).subscribe(count => this.unreadNotificationCount = count);

   }
   markNotificationsAsRead() {
    const user = this.asd.getUser();

    this.ser.markUserNotificationsAsRead(user)
      .subscribe(updatedNotifications => this.notifications = updatedNotifications);
      this.unreadNotificationCount = 0; // Réinitialiser le compteur de notifications non lues

  }
   getImageUrl() {
    return this.imageSrc;
  }
  getUserNotifications() {
    this.ser.getUserNotifications().subscribe(
      (response:any) => {
    this.notifcations=response
    this.notifications = response.reverse();
  // Appel pour mettre à jour le compteur de notifications non lues

          },
      (error: any) => {
        console.log(error);
      })
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