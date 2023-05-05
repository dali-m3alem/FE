import { Component, OnInit } from '@angular/core';
import { id } from 'date-fns/locale';
import { User } from 'src/app/views/model/user';
import { AuthadminService } from 'src/app/views/services/authadmin.service';
import { DataService } from 'src/app/views/services/data.service';
import {MatDialog} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  userInfo: any;
  selectedFile!: File;
  public errorMessage: string = '';

  imageSrc!: string;
  userForm!: FormGroup;

  constructor(private asd: DataService, private auth: AuthadminService, public dialog: MatDialog, private fb: FormBuilder) {
    
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
    const user = this.auth.getUser();
    this.asd.getUserData(user).subscribe((data: any) => {
      this.userInfo = data;
      this.imageSrc = 'data:image/jpeg;base64,' + this.userInfo.profilePicture;

    });
    Swal.close();

  }
  prepareForm(){
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      userLastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\d{8}$')]],
      titre: ['', Validators.required],
      roles: [[]],
    });
  }
  showOverlay=false;
  showPopup: boolean = false;
  showPopup2: boolean = false;


  togglePopup(): void {
    this.showPopup = !this.showPopup;
    this.showOverlay = !this.showOverlay;
  }
  togglePopup2(): void {
    this.showPopup2 = !this.showPopup2;
    this.showOverlay = !this.showOverlay;
  }
    
    editUser(user: User) {
      this.selectedUser = {
        id: user.id,
        username: user.username,
        userLastName: user.userLastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        titre: user.titre,
        
        profilePicture:user.profilePicture,
        roles: user.roles.map(role => ({...role}))
      };
      
      // Afficher le popup pour modifier l'utilisateur
      this.showPopup = true;
    } 
    // Afficher le popup pour modifier l'utilisateur
  
     
    selectedUser: User = {
      id: 0,
      username: '',
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

        },
        (error) => {
          console.log(error);
    
          if (error.status === 400) {
            this.errorMessage = "Email already exists";
          } else if (error.error && error.error.token) {
            this.errorMessage = "Failed to read profile picture file";
          } else {
            this.errorMessage = "Error updating user";
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

      this.asd.changePassword(this.userInfo.id, oldPassword, newPassword).subscribe(
        () => {
          alert('Mot de passe modifié avec succès.');
          this.passwordForm.reset();
        },
        (error) => {
          alert('Impossible de modifier le mot de passe.');
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
  
  
  

}

