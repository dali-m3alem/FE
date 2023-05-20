import {Component, Input, OnInit} from '@angular/core';

import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AuthadminService } from 'src/app/views/services/authadmin.service';
import { TasksService } from 'src/app/views/services/tasks.service';
import { DatePipe } from '@angular/common';
import { Task, Team } from 'src/app/views/model/user';
import { ActivatedRoute } from '@angular/router';
import { ActivitiesService } from 'src/app/views/services/activities.service';
import { TeamsService } from 'src/app/views/services/teams.service';

@Component({
  selector: 'app-update-activity',
  templateUrl: './update-activity.component.html',
  styleUrls: ['./update-activity.component.scss'],
  providers: [DatePipe]

})
export class UpdateActivityComponent {
  @Input() public activity: any;
  editProjectForm!: FormGroup;
  deadlineA!: any;
  managersUser!: any;
 isSaving =false;
 constructor(private activityService: ActivitiesService, private activeModal: NgbActiveModal,
             private formBuilder: FormBuilder, private modal: NgbModal,public datePipe: DatePipe
            , private teamSer:TeamsService) {}


 ngOnInit() {
   if(this.activity.deadlineA){
   this.deadlineA  = this.datePipe.transform(this.activity.deadlineA, 'yyyy-MM-dd')
   }
   this.editProjectForm = this.formBuilder.group({

     id: [this.activity.id, [Validators.required]],
     activityName: [this.activity.activityName, Validators.required],
     team: [this.activity?.team?.teamName      , Validators.required],
     descriptionA: [this.activity.descriptionA, Validators.required],
     objectiveA: [this.activity.objectiveA, Validators.required],
     deadlineA: [this.deadlineA, Validators.required],
     projectId: [this.activity.project.id]

   });
   this.getTeam();

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

     this.isSaving=true;

    const updatedTask: any = {
      id: this.editProjectForm.value.id,
      activityName: this.editProjectForm.value.activityName,
      descriptionA: this.editProjectForm.value.descriptionA,
      objectiveA:this.editProjectForm.value.objectiveA,
      deadlineA: this.editProjectForm.value.deadlineA,
      teamName: this.editProjectForm.value.team,
      projectId: this.editProjectForm.value.projectId,

    };

    console.log(updatedTask)
   
     this.activityService.updateActivity(this.activity.id,updatedTask).subscribe((data=>{
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
 getTeam(){

  // ...
  
  this.teamSer.getTeamId().subscribe(
    (response) => {
      this.managersUser=response
      console.log(response)
    },
    (error: any) => {
      console.log(error);
    }
  );
  
  } 
}
