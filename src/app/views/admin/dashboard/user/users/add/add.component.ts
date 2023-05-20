import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {HttpErrorResponse} from '@angular/common/http';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { User } from 'src/app/views/model/user';
import { AuthadminService } from 'src/app/views/services/authadmin.service';
import { DataService } from 'src/app/views/services/data.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  formLogin!: FormGroup;
  isSaving =false;
  project :User = new User() ;
  selectedFile!: File;

  constructor(private activeModal: NgbActiveModal,
    private fb:FormBuilder, private modal: NgbModal, private auth: AuthadminService,private asd:DataService,

  ) {}

  get f(): { [key:string|number]: AbstractControl } {
    return this.formLogin.controls;
  }
  ngOnInit() {
    this.formLogin = this.fb.group({
      firstname: ['', Validators.required],
      email: ['',  [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\d{8}$')]],
      password: ['', Validators.required],
      userLastName: ['', Validators.required],
      roleName: ['', Validators.required],
      titre: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      profilePicture: ['']
    }, { validator: this.ConfirmedValidator('password', 'confirmPassword') });

  }
 

  ConfirmedValidator(controlPassword: string, matchingControlPassword: string){
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlPassword];
      const matchingControl = formGroup.controls[matchingControlPassword];
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }
  confirmSaveProject()
  {
    Swal.fire({
      title: "Confirmation",
      text:  'Voulez vous confirmer ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "Confirmer",
      cancelButtonText: "Annuler"

    }).then((result) => {
      if (result.isConfirmed) {

        this.addProject();
      }
    })
  }
  addProject() {
  const userId=this.auth.getUser();

    if (this.formLogin.valid) {
      Swal.fire({
        html: "Veuillez patienter,chargement en cours ...",
        icon : 'info',
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        }
      });

      this.isSaving=true;
      const formData = new FormData();
  
      formData.append('firstname', this.formLogin.get('firstname')!.value);
      formData.append('email', this.formLogin.get('email')!.value);
      formData.append('phoneNumber', this.formLogin.get('phoneNumber')!.value);
      formData.append('password', this.formLogin.get('password')!.value);
      formData.append('userLastName', this.formLogin.get('userLastName')!.value);
      formData.append('roleName', this.formLogin.get('roleName')!.value);
      formData.append('titre', this.formLogin.get('titre')!.value);
      formData.append('confirmPassword', this.formLogin.get('confirmPassword')!.value);
      console.log(this.formLogin)
      if (this.selectedFile) {
        formData.append('profilePicture', this.selectedFile);
      }

      this.asd.adduser(formData).subscribe((data=>{
          Swal.close();
            Swal.fire(
              'Succès',
              "Enregistré avec succès",
              'success'
            ).then((result) => {
              if (result.isConfirmed) {
                this.activeModal.close(data);
                this.isSaving=false;
              }
            })

        }),
        (error: HttpErrorResponse) => {
          Swal.fire(
            'Erreur',
            'Veuillez vérifier les informations saisies',
            'error'
          )
          this.isSaving=false;
          if (error.status === 400 && error.error) {
            Swal.fire(
              'Erreur',
              '  email existe',
              'error'
            )  }
            else{ Swal.fire(
              'Erreur',
              'Error photo file too large to upload.',
              'error'
            )}
        }
      );

    } else {
      this.isSaving=false;
      Swal.fire(
        'Erreur',
        'Veuillez vérifier les informations saisies',
        'error'
      )
    }
  }


  closeModal() {
    this.activeModal.close('Modal Closed');
  }
  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }
}