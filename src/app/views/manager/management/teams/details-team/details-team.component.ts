import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Team, User } from 'src/app/views/model/user';
import { TasksService } from 'src/app/views/services/tasks.service';
import { TeamsService } from 'src/app/views/services/teams.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-details-team',
  templateUrl: './details-team.component.html',
  styleUrls: ['./details-team.component.scss']
})
export class DetailsTeamComponent {
  @Input() public team: any;
  editProjectForm!: FormGroup;
  deadlineA!: any;
 isSaving =false;
  managers: any;
 constructor(private serv: TasksService, private activeModal: NgbActiveModal,
             private formBuilder: FormBuilder, private modal: NgbModal
            , private teamSer:TeamsService) {
              console.log(this.editProjectForm)

            }


            ngOnInit() {
              this.editProjectForm = this.formBuilder.group({
                teamName: [this.team.teamName, Validators.required],
                teamDesc: [this.team.teamDesc, Validators.required],
                members: this.formBuilder.array([]) // Initialize an empty FormArray

                // Autres contrôles de formulaire...
              });
              this.populateMembers();

            }
            
 get f(): { [key: string]: AbstractControl } {
   return this.editProjectForm.controls;
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
 editTypeCourrier() {

   if (this.editProjectForm.valid) {
     Swal.fire({
       html: "Veuillez patienter,mise à jour en cours ...",
       icon : 'info',
       allowEscapeKey: false,
       allowOutsideClick: false,
       didOpen: () => {
         Swal.showLoading()
       }
     });
     this.isSaving = true;

     // Créer une liste des emails des membres
    // Créer une liste des emails des membres
const emails = this.editProjectForm.value.members.map((memberEmail: string) => {
  return memberEmail;
});

 
     // Créer l'objet à envoyer au serveur
     const updatedTeam: Team = {
       teamId: this.team.id,
       teamDesc: this.editProjectForm.value.teamDesc,
       teamName: this.editProjectForm.value.teamName,
       emails: emails,
     };
 
     console.log(updatedTeam);
   
     this.teamSer.updateTeam(this.team.teamId,updatedTeam).subscribe((data=>{
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
 getManager(){
  this.serv.managersUsers().subscribe(
    (response:any) => {
      console.log(response)
      this.managers = response; // Mettre à jour la variable 'managers' avec la réponse du service

    },
    (error) => {
      console.error(error);
    }
  );
}




get membersFormArray() {
  return this.editProjectForm.get('members') as FormArray;
}

populateMembers() {
  const members = this.team.members || [];
  members.forEach((member: User) => {
    this.membersFormArray.push(
      this.formBuilder.control(member.email, Validators.required)
    );
  });
}


addMember() {
  this.membersFormArray.push(
    this.formBuilder.control('', Validators.required)
  );
}

removeMember(index: number) {
  this.membersFormArray.removeAt(index);
}
}
