import {Component, Input, OnInit} from '@angular/core';

import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AuthadminService } from 'src/app/views/services/authadmin.service';
import { DataService } from 'src/app/views/services/data.service';
import { Authorisation, User } from 'src/app/views/model/user';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  @Input() public user: User | undefined; // Ajoutez l'union de types "undefined"
 isSaving =false;
 existingRoles!: Authorisation[] ;
 rolesFormArray!: FormArray;
 userForm!: FormGroup;
  dataArray: any;

 constructor( private ds: DataService,private activeModal: NgbActiveModal,
   private fb: FormBuilder, 
              private modal: NgbModal
             , private auth: AuthadminService) {  
             }


 ngOnInit() {
  if (!this.user) {
    // Gérez le cas où "user" est null ou undefined, par exemple, affichez un message d'erreur ou effectuez une action appropriée.
    return;
  }

  this.getroles(); // Appel à la méthode pour initialiser existingRoles
  
  
  this.userForm = this.fb.group({
    id: [this.user.id],
    firstname: [this.user.firstname || '', Validators.required],
    userLastName: [this.user.userLastName || '', Validators.required],
    email: [this.user.email || '', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')]],
    phoneNumber: [this.user.phoneNumber || '', [Validators.required, Validators.pattern('^\\d{8}$')]],
    titre: [this.user.titre || '', Validators.required],
    roles: [this.user.roles || []], // Set initial value to user.roles or empty array
    profilePicture: [this.user.profilePicture || ''],


  });
  
  this.selectedUser = {
    id: this.userForm.value.id || 0,
    firstname: this.userForm.value.firstname || '',
    userLastName: this.userForm.value.userLastName || '',
    email: this.userForm.value.email || '',
    phoneNumber: this.userForm.value.phoneNumber || 0,
    titre: this.userForm.value.titre || '',
    profilePicture: this.userForm.value.profilePicture || '', // Initialize as string
    roles: this.userForm.value.roles || [] as Authorisation[]
  };
  console.log(this.selectedUser)
  this.patchFormValues();
 }
 
 patchFormValues() {
  const controls = this.userForm.controls;
  const user = this.selectedUser;

  controls['id'].patchValue(user.id || 0);
  controls['firstname'].patchValue(user.firstname || '');
  controls['userLastName'].patchValue(user.userLastName || '');
  controls['email'].patchValue(user.email || '');
  controls['phoneNumber'].patchValue(user.phoneNumber || 0);
  controls['titre'].patchValue(user.titre || '');
  const profilePictureString = this.uint8ArrayToString(user.profilePicture);
  console.log(profilePictureString);
  controls['profilePicture'].patchValue(profilePictureString || ''); // Patch as string
  controls['roles'].patchValue(user.roles || [] as Authorisation[]);
}
private uint8ArrayToString(uint8Array: Uint8Array): string {
  let string = '';
  for (let i = 0; i < uint8Array.length; i++) {
    string += String.fromCharCode(uint8Array[i]);
  }
  return string;
}
 get f(): { [key: string]: AbstractControl } {
  const controls = this.userForm.controls;
  this.selectedUser.id = controls['id'].value || 0;
  this.selectedUser.firstname = controls['firstname'].value || '';
  this.selectedUser.userLastName = controls['userLastName'].value || '';
  this.selectedUser.email = controls['email'].value || '';
  this.selectedUser.phoneNumber = controls['phoneNumber'].value || 0;
  this.selectedUser.titre = controls['titre'].value || '';
  this.selectedUser.profilePicture = controls['profilePicture'].value || new Uint8Array();
  this.selectedUser.roles = controls['roles'].value || [] as Authorisation[];
  return controls;

}
 confirmEditTypeCourrier()
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

       this.editTypeCourrier()
       
     }
   })
 }
 getroles() {
  
  this.ds.getAllRoles().subscribe(
    (roles: any) => { // Utilisez le type "Authorisation[] | null" au lieu de "any"
      if (roles) {
        this.existingRoles = roles;

        // Mettre à jour les ID des rôles modifiés
        this.userForm.value.roles.forEach((role: { roleName: string; id: number; }, index: number) => {
          const existingRole = this.existingRoles.find(r => r.roleName === role.roleName);
          if (existingRole) {
            role.id = existingRole.id;
            this.userForm.get(`roles.${index}.id`)?.patchValue(existingRole.id); 
            // Utilisation de la vérification de nullité (?)
          }
        });
      }
    },
    (error) => {
      console.log(error);
    }
  );  
  
}
 
 editTypeCourrier() {

   if (this.userForm.valid) {
     Swal.fire({
       html: "Veuillez patienter,mise à jour en cours ...",
       icon : 'info',
       allowEscapeKey: false,
       allowOutsideClick: false,
       didOpen: () => {
         Swal.showLoading()
       }
     });

     this.isSaving=true;
     const user = this.auth.getUser();

     this.selectedUser.roles.forEach((role: { roleName: string; id: number; }) => {
      const existingRole = this.existingRoles.find(r => r.roleName === role.roleName);
      if (existingRole) {
        role.id = existingRole.id;
      }
    });
    this.patchFormValues();


     console.log(this.selectedUser)      

     this.ds.updateUser(this.selectedUser).subscribe((data=>{
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
      this.modal.dismissAll();
      this.isSaving=false;
      console.log(error)

      let errorMessage = 'Une erreur s\'est produite. Veuillez réessayer plus tard.';
    
      if (error.status === 400 && error.error) {
        Swal.fire(
          'Erreur',
          '  email existe',
          'error'
        )  }
        else{ Swal.fire(
          'Erreur',
          'Veuillez vérifier les informations saisies',
          'error'
        )}
        this.modal.dismissAll();
        this.isSaving=false;
        console.log(error)
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


selectedUser: User = {
  id: 0,
  firstname: '',
  userLastName: '',
  email: '',
  phoneNumber: 0,
  titre: '',
  profilePicture:new Uint8Array(),
  roles: [] as Authorisation[]
};
// Fonction pour supprimer un rôle
removeRole(index: number) {
  this.selectedUser.roles.splice(index, 1);
}
addRole() {
  this.selectedUser.roles.push({ roleName: '', id: 0 });
}
}