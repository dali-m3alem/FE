import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthadminService } from 'src/app/views/services/authadmin.service';

@Component({
  selector: 'app-reset-pasword',
  templateUrl: './reset-pasword.component.html',
  styleUrls: ['./reset-pasword.component.scss']
})
export class ResetPaswordComponent {
  password!: string;
  confirmPassword!: string;
  error!: string;
  success!: string;

  constructor(private route: ActivatedRoute, private authService: AuthadminService, private router: Router) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      this.error = "Passwords don't match";
      return;
    }

    const token = this.route.snapshot.queryParamMap.get('token')!;
console.log(token)
console.log(this.password)
this.authService.resetPassword(token, this.password).subscribe(
  (response) => {
    this.success = response; // use the response as a string
    this.error = '';
    this.router.navigate(['/login']);
  },
  (error) => {
    this.error = error;
    console.log(error); // log the full error object
    this.success = '';
  }
);
  }
}