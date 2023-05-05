import {Component, OnInit, Inject, ChangeDetectorRef} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import{HttpClient}from'@angular/common/http';
import { DataService } from 'src/app/views/services/data.service';
import { Route, Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Authorisation, User } from 'src/app/views/model/user';


@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit{
  dataArray!: User[] ;
  existingRoles!: Authorisation[] ;
  userForm!: FormGroup;
  showPopup: boolean = false;
  constructor(private ds: DataService, private router: Router, public dialog: MatDialog, private fb: FormBuilder, private cdRef: ChangeDetectorRef) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      userLastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\d{8}$')]],
      titre: ['', Validators.required],
      roles: [[]],
    });
  }
 
  ngOnInit(): void {
    this.getUsers();
    this.getroles();
    
    
  }
  
  getroles(): void {
    this.ds.getAllRoles().subscribe(
      (roles:any) => {
        this.existingRoles = roles;
        
        // Mettre à jour les ID des rôles modifiés
        this.selectedUser.roles.forEach(role => {
          const existingRole = this.existingRoles.find(r => r.roleName === role.roleName);
          if (existingRole) {
            role.id = existingRole.id;
          }
        });
      },
      (error) => {
        console.log(error);
      }
    );  
  }

 

  getUsers(): void {
    this.ds.getAllusers().subscribe(
      (response: any) => {
        this.dataArray = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
 
  deleteUser(id: number): void {
    this.ds.deleteUser(id).subscribe(
      (response: any) => {
        console.log(response);
        this.getUsers();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  
  showOverlay=false;
  
  togglePopup(): void {
    this.showPopup = !this.showPopup;
    this.showOverlay = !this.showOverlay;
  }
  
  // Fonction pour supprimer un rôle
  removeRole(index: number) {
    this.selectedUser.roles.splice(index, 1);
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
  
  selectedUser: User = {
    id: 0,
    username: '',
    userLastName: '',
    email: '',
    phoneNumber: 0,
    titre: '',
    profilePicture:new Uint8Array(),
    roles: [] as Authorisation[]
  };
  errorMessage=''

  
  updateUser() {
    if (!this.selectedUser.email || !this.selectedUser.userLastName || !this.selectedUser.titre ||!this.selectedUser.username) {
      console.log('Veuillez remplir tous les champs obligatoires');
      return;
    }
    console.log(this.selectedUser);
     // Mettre à jour les ID des rôles modifiés
  this.selectedUser.roles.forEach(role => {
    const existingRole = this.existingRoles.find(r => r.roleName === role.roleName);
    if (existingRole) {
      role.id = existingRole.id;
    }
  });
    this.ds.updateUser(this.selectedUser).subscribe(
     (response) => {
       console.log(response);
       // Faire quelque chose avec la réponse du service
       this.router.navigate(['/users']);
       console.log('User updated:', this.selectedUser);
       this.togglePopup();


     },
     (error) => {
      console.log(error);
      if (error.status === 400) {
        this.errorMessage = "Email already exists";
      } else {
        this.errorMessage = "An error occurred";
      }
    
      
       // Faire quelque chose avec l'erreur renvoyée par le service
     }
   );
  }
  addRole() {
    this.selectedUser.roles.push({ roleName: '', id: 0 });
  }
}
