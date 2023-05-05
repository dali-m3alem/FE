import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthadminService } from 'src/app/views/services/authadmin.service';
import { DataService } from 'src/app/views/services/data.service';

@Component({
  selector: 'app-auth-admin-layout',
  templateUrl: './auth-admin-layout.component.html',
  styleUrls: ['./auth-admin-layout.component.scss']
})
export class AuthAdminLayoutComponent implements OnInit{
 
  dataReceived:any
  url:any
  messageAuthError:any
  constructor(private asd:AuthadminService,private route:Router,private arouter:ActivatedRoute) {
    if(this.asd.LoggedIn()==true){
      this.route.navigate(['/'])
  }
  if(this.asd.LoggedIsManager()==true){
    this.route.navigate(['/manager'])
  }
  if(this.asd.LoggedIsUser()==true){
    this.route.navigate(['/user'])
  }
  
   }

  ngOnInit(): void {

    this.url=this.arouter.snapshot.queryParams['returnUrl'] || ''
    console.log(this.url)
  }

  loginadmin(f:any){
    let data=f.value
console.log(data)
    this.asd.login(data).subscribe((response)=>
      {
        this.dataReceived=response
        this.asd.saveDataProfil(this.dataReceived.token)
        if(this.asd.LoggedIn()==true ){
          this.route.navigate([''])
         
      }
      if(this.asd.LoggedIsUser()==true ){
        this.route.navigate(['/user'])
    }
    if(this.asd.LoggedIsManager()==true ){
      this.route.navigate(['/manager'])
     
  }
        
      },err=>this.messageAuthError="invalid email and password")

  }
  forgotPassword() {
    const email = prompt('Please enter your email address:');
    if (email) {
      this.asd.forgotPassword(email).subscribe(
        response => {
          console.log(response);
          this.route.navigate(['/reset-password']);
        },
        error => console.error(error)
      );
    }
  }
}