import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";

import { Authorisation, User } from 'src/app/views/model/user';
import { AuthadminService } from 'src/app/views/services/authadmin.service';
import { AddComponent } from './add/add.component';
import { DataService } from 'src/app/views/services/data.service';
import Swal from 'sweetalert2';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
 
})
export class UsersComponent {
  searchValue: string = '';

  userForm!:FormGroup;
  dataArray!: User[];
  submitted = false;
  showPopup: boolean = false;
  existingRoles!: Authorisation[] ;
  errorMessage=''
  showOverlay=false;
  public users : Array<User> = [];
  public user : User = new User();
  constructor(private ds: DataService,public modalService: NgbModal, private auth: AuthadminService, private fb:FormBuilder) {
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

  togglePopup(): void {
    this.showPopup = !this.showPopup;
    this.showOverlay = !this.showOverlay;
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


  editUser(user: User) {
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
    this.showPopup = true;
  }
  editer(row: User) {
    const options3: NgbModalOptions = {
      size: 'xl',
      centered: true,
      scrollable: true,
      windowClass:'modal-holder'
    };
    const modalRef = this.modalService.open(EditComponent, options3);
    modalRef.componentInstance.user = row;
    console.log(row);
  
    modalRef.result.then((result) => {
      if (result === 'success') {
        this.loadData();
       
        console.log(result)
      }
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }
  

  add(){
    const options2: NgbModalOptions = {
      size: 'xl',
      centered: true,
      scrollable: true,
      windowClass:'modal-holder'

    };
    const modalRef = this.modalService.open(AddComponent, options2);

    modalRef.result.then((result) => {
      this.loadData();
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  loadData(){
    const adminId = this.auth.getUser();

    this.ds.getAllusers().subscribe(
      (response: any) => {
        this.dataArray = response.filter((user: any) => user.id !== adminId);
        Swal.close();
      },
      (error: any) => {
        console.log(error);
      }
    );


    
  } 
  confirmDeleteUser(id: number)
  {
    Swal.fire({
      title: "Confirmation",
      text:  'Voulez vous confirmer ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler'

    }).then((result) => {
      if (result.isConfirmed) {

        this.deleteUser(id);
      }
    })
  }
  deleteUser(id: number): void {
    console.log(id)
    Swal.fire({
      html: 'Veuillez patienter,suppression en cours ...',
      icon : 'info',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      }
    });
    this.ds.deleteUser(id).subscribe(
      (response: any) => {
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
      (error: any) => {
        Swal.fire(
          'Erreur',
          'Veuillez vérifier les informations saisies',
          'error'
        )
      }
    );
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
  controls['profilePicture'].patchValue(user.profilePicture || new Uint8Array());
  controls['roles'].patchValue(user.roles || [] as Authorisation[]);
}

updateUser(): void {
  this.submitted = true;


  console.log(this.selectedUser)
  this.selectedUser.roles.forEach(role => {
  const existingRole = this.existingRoles.find(r => r.roleName === role.roleName);
  if (existingRole) {
    role.id = existingRole.id;
  }
});
this.patchFormValues()
this.ds.updateUser(this.selectedUser).subscribe(
  (updateUser) => {
    console.log('Projet mis à jour', updateUser);
    this.togglePopup();
    this.loadData();
    
   
  },
  (error) => {
    console.log(error);
    if (error.status === 400) {
      this.errorMessage = "Email does not exists";
    } else {
      this.errorMessage = "An error occurred";
    }
  });

}




  removeRole(index: number) {
    this.selectedUser.roles.splice(index, 1);
  }
  addRole() {
    this.selectedUser.roles.push({ roleName: '', id: 0 });
  }

  details(row: User) {
    const options1: NgbModalOptions = {
      size: 'xl',
      centered: true,
      scrollable: true,
      windowClass:'modal-holder'

    };
    const modalRef = this.modalService.open(DetailsComponent, options1);
    modalRef.componentInstance.user = row;

    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });

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
}

