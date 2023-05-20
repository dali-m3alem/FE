import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthadminService } from 'src/app/views/services/authadmin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent {
  constructor(
    private asd: AuthadminService,
    private route: Router,
    private arouter: ActivatedRoute
  ) {}
  email:any
  forgotPassword() {
    if (this.email) {
      
      this.asd.forgotPassword(this.email).subscribe(
        (response) => {
          console.log(response);

        },
        (error) => {
          if(error.error.text!=0){
          Swal.fire(
            'Succès',
            error.error.text,
            'success'
          )}
          if(error.status==400){
            Swal.fire(
              'Erreur',
              'Veuillez vérifier les informations saisies',
              'error'
            )
          }
        console.log(error.error.text)
        }
      );
    }
  }
}
