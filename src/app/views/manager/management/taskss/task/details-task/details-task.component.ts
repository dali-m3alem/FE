import {Component, Input, OnInit} from '@angular/core';

import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AuthadminService } from 'src/app/views/services/authadmin.service';
import { TasksService } from 'src/app/views/services/tasks.service';
import { DatePipe } from '@angular/common';
import { Task } from 'src/app/views/model/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-task',
  templateUrl: './details-task.component.html',
  styleUrls: ['./details-task.component.scss'],
  providers: [DatePipe]

})
export class DetailsTaskComponent {
  @Input() public task: any;
  dueDate!: any;

  editProjectForm!: FormGroup;
  managers!: [] ;
 isSaving =false;
  projectId: any;
  idAc: any;
 constructor( private activeModal: NgbActiveModal,
             private formBuilder: FormBuilder, private modal: NgbModal,public datePipe: DatePipe
             , private auth: AuthadminService,private taskSer:TasksService,private route: ActivatedRoute) {}


 ngOnInit() {
  
   if(this.task.dueDate){
   this.dueDate  = this.datePipe.transform(this.task.dueDate, 'yyyy-MM-dd')
   console.log(this.dueDate)
   }
   this.editProjectForm = this.formBuilder.group({

     id: [this.task.id, [Validators.required]],
     title: [this.task.title, Validators.required],
     email: [this.task.user.email, Validators.required],
     description: [this.task.description, Validators.required],
     status: [this.task.status, Validators.required],
     dueDate: [this.dueDate, Validators.required],
     activity: [this.task.activity, Validators.required],




   });
   this.getManager();
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
     const user = this.auth.getUser();

     const updatedTask: any = {
      id: this.task.id,
      title: this.editProjectForm.value.title,
      email: this.editProjectForm.value.email,
      description: this.editProjectForm.value.description,
      status: this.editProjectForm.value.status,
      dueDate: this.editProjectForm.value.dueDate,
      activity: this.editProjectForm.value.activity.id,
    };

    console.log(updatedTask)
    this.taskSer.updateTask1(this.task.id, updatedTask).subscribe((data=>{
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
   this.taskSer.managersUsers().subscribe(
     (response:any) => {
       console.log(response)
       this.managers = response; // Mettre à jour la variable 'managers' avec la réponse du service

     },
     (error) => {
       console.error(error);
     }
   );
 }}