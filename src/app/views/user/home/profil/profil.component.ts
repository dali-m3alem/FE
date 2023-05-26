import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { id } from 'date-fns/locale';
import { User } from 'src/app/views/model/user';
import { AuthadminService } from 'src/app/views/services/authadmin.service';
import { DataService } from 'src/app/views/services/data.service';
import {MatDialog} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import Swal from 'sweetalert2';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit {
  @ViewChild('content', { static: true }) content!: TemplateRef<any>;

	closeResult = '';

  userInfo: any;
  selectedFile!: File;
  public errorMessage: string = '';
  modalRef!: NgbModalRef;

  imageSrc!: string;
  userForm!: FormGroup;

  constructor(private asd: DataService, private auth: AuthadminService, public dialog: MatDialog, private fb: FormBuilder,private modalService: NgbModal) {
    
  }
  getImageUrl() {
    return this.imageSrc;
  }

  ngOnInit(): void {
    Swal.fire({
      title: "Chargement",
      html: "Veuillez patientez, chargements en cours ....",
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      }
    });
   this.loadData();
   this.prepareForm();
   
    
  }
  loadData() {
    this.asd.getUserData().subscribe((data: any) => {
      this.userInfo = data;
      this.imageSrc = 'data:image/jpeg;base64,' + this.userInfo.profilePicture;

    });
    Swal.close();

  }
  prepareForm(){
    this.userForm = this.fb.group({
      firstname: ['', Validators.required],
      userLastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\d{8}$')]],
      titre: ['', Validators.required],
      roles: [[]],
    });
  }
  showOverlay=false;
  showPopup2: boolean = false;


  togglePopup(): void {
    this.showOverlay = !this.showOverlay;
  }
  togglePopup2(): void {
    this.showPopup2 = !this.showPopup2;
    this.showOverlay = !this.showOverlay;
  }
    
    editUser(user: User) {
      this.modalService.open(user, { size: 'lg' });

      this.selectedUser = {
        id: user.id,
        firstname: user.firstname,
        userLastName: user.userLastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        titre: user.titre,
        
        profilePicture:user.profilePicture,
        roles: user.roles.map(role => ({...role}))
      };
      
      // Afficher le popup pour modifier l'utilisateur
      this.showPopup();
    } 
    // Afficher le popup pour modifier l'utilisateur
  
     
    selectedUser: User = {
      id: 0,
      firstname: '',
      userLastName: '',
      email: '',
      phoneNumber: 0,
      titre: '',
      profilePicture:new Uint8Array(),
      roles: [] 
    }

  
    updateUser() {
      let success = true; // initialiser le flag à true
    
    
      let updateObs = this.asd.updateUserWP(this.selectedUser);
      let uploadObs = this.selectedFile ? this.asd.uploadProfilePicture(this.selectedFile, this.selectedUser.id) : of(null);
    
      forkJoin([updateObs, uploadObs]).subscribe(
        ([updateResponse, uploadResponse]) => {
          console.log('User updated:', this.selectedUser.id);
          this.togglePopup();
          this.loadData();
            Swal.close();
    
            Swal.fire(
              'Succès',
              'Suppression avec succès',
              'success'
            ).then((result) => {
              if (result.isConfirmed) {
                this.loadData();
              }
            })
        },
        (error) => {
          console.log(error);
    
          if (error.status === 400) {
            Swal.fire(
              'Error',
              'Email already exists',
              'error'
            );
          } else if (error.error && error.error.token) {
            Swal.fire(
              'Error',
              'Failed to read profile picture file',
              'error'
            );
          } else {
            if (uploadObs) {
              Swal.fire(
                'Error',
                'Error updating user picture file',
                'error'
              );
            } else {
              Swal.fire(
                'Error',
                'Error updating user. Failed to upload profile picture.',
                'error'
              );
            }
          }
        }
      );
    }
    
    
    
    
  passwordForm = this.fb.group({
    oldPassword: ['', Validators.required],
    newPassword: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  }, {
    validator: this.passwordMatchValidator
  });
 
  onSubmit() {
    if (this.passwordForm.valid) {
      const { oldPassword, newPassword } = this.passwordForm.value;
      console.log(this.userInfo.id); // Utilisez `this.id` au lieu de `id`

      this.asd.changePassword(this.userInfo.id, oldPassword, newPassword).subscribe
      (
        () => {
          this.togglePopup();
          this.loadData();
            Swal.close();
    
            Swal.fire(
              'Succès',
              'Suppression avec succès',
              'success'
            )
            
          this.passwordForm.reset();
          
        },
        (error) => {
          Swal.fire(
            'Erreur',
            'Password incorrecte',
            'error'
          )
          console.error(error);
        }
      );
    }
  }

  private passwordMatchValidator(form: { value: { newPassword: any; confirmPassword: any; }; }) {
    const { newPassword, confirmPassword } = form.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }
  change(){
this.showPopup2=true
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => this.imageSrc = e.target!.result as string;
    reader.readAsDataURL(this.selectedFile);
  }
  
  showPopup() {
    this.modalRef = this.modalService.open(this.content, { size: 'lg' });
  }
  
  closePopup() {
    this.modalRef.dismiss();
  }
  
  openLg(userInfo: any) {
    this.selectedUser = {
      id: userInfo.id,
      firstname: userInfo.firstname,
      userLastName: userInfo.userLastName,
      email: userInfo.email,
      phoneNumber: userInfo.phoneNumber,
      titre: userInfo.titre,
      profilePicture: userInfo.profilePicture,
      roles: userInfo.roles.map((role: any) => ({ ...role }))
    };
    this.modalRef = this.modalService.open(this.content, { size: 'lg' });
  }
	openScrollableContent(longContent: any) {
		this.modalService.open(longContent, { scrollable: true });
	}
  
  

  showChangePasswordModal: boolean = false;

}

