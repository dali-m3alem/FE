import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthadminService } from 'src/app/views/services/authadmin.service';
import { DataService } from 'src/app/views/services/data.service';

@Component({
  selector: 'app-auth-admin-layout',
  templateUrl: './auth-admin-layout.component.html',
  styleUrls: ['./auth-admin-layout.component.scss']
})
export class AuthAdminLayoutComponent implements OnInit {
  dataReceived: any;
  url: any;
  messageAuthError: any;

  constructor(
    private asd: AuthadminService,
    private route: Router,
    private arouter: ActivatedRoute
  ) {
    if (this.asd.LoggedIsAdminManager()) {
      this.route.navigate(['/AdminManager']);
      console.log(this.asd.LoggedIsAdminManager)
    }
    if (this.asd.LoggedIsAdminUser()) {
      this.route.navigate(['/AdminUser']);
    }
    if (this.asd.LoggedIn()) {
      this.route.navigate(['/']);
    }
    if (this.asd.LoggedIsManager()) {
      this.route.navigate(['/manager']);
    }
    if (this.asd.LoggedIsUser()) {
      this.route.navigate(['/user']);
    }
  }

  ngOnInit(): void {
    this.url = this.arouter.snapshot.queryParams['returnUrl'] || '';
    console.log(this.url);
  }

  loginadmin(f: any) {
    let data = f.value;
    console.log(data);
   
    if (data.email && data.password){
    this.asd.login(data).subscribe(
      (response) => {
        this.dataReceived = response;
        this.asd.saveDataProfil(this.dataReceived.token);
        
        if (this.asd.LoggedIsAdminManager()) {
          if (this.url) {
            // Rediriger vers l'URL spécifiée dans returnUrl
            this.route.navigateByUrl(this.url);
          } else {
            this.route.navigate(['/AdminManager']);
          }
        } else if (this.asd.LoggedIsAdminUser()) {
          if (this.url) {
            // Rediriger vers l'URL spécifiée dans returnUrl
            this.route.navigateByUrl(this.url);
          } else {
            this.route.navigate(['/AdminUser']);
          }
        } else if (this.asd.LoggedIn()) {
          if (this.url) {
            // Rediriger vers l'URL spécifiée dans returnUrl
            this.route.navigateByUrl(this.url);
          } else {
            this.route.navigate(['']);
          }
        } 
        else if (this.asd.LoggedIsManager()) {
          if (this.url) {
            // Rediriger vers l'URL spécifiée dans returnUrl
            this.route.navigateByUrl(this.url);
          } else {
            this.route.navigate(['/manager']);
          }
        }else if (this.asd.LoggedIsUser()) {
          if (this.url) {
            // Rediriger vers l'URL spécifiée dans returnUrl
            this.route.navigateByUrl(this.url);
          } else {
            this.route.navigate(['/user']);
          }
        }
      },
      (err) => (this.messageAuthError = 'Invalid email or password')
    );
    }
  }
  

  forgotPassword() {
    const email = prompt('Please enter your email address:');
    if (email) {
      this.asd.forgotPassword(email).subscribe(
        (response) => {
          console.log(response);
          this.route.navigate(['/reset-password']);
        },
        (error) => console.error(error)
      );
    }
  }
}
