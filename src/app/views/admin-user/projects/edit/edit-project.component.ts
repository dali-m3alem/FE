import {Component, Input, OnInit} from '@angular/core';

import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { DatePipe } from '@angular/common';
import { AuthadminService } from 'src/app/views/services/authadmin.service';
import { ProjectService } from 'src/app/views/services/project.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css'],
  providers: [
    DatePipe,
  ],
})
export class EditProjectComponent implements OnInit {
  @Input() public project: any;
   editProjectForm!: FormGroup;
   dateDeadline!: any;
   managers!: [] ;
  isSaving =false;
  constructor(private projectService: ProjectService, private activeModal: NgbActiveModal,
              private formBuilder: FormBuilder, private modal: NgbModal,public datePipe: DatePipe
              , private auth: AuthadminService) {}


  ngOnInit() {
    if(this.project.deadlineP){
    this.dateDeadline  = this.datePipe.transform(this.project.deadlineP, 'yyyy-MM-dd')
    console.log(this.dateDeadline)
    }
    this.editProjectForm = this.formBuilder.group({

      id: [this.project.id, [Validators.required]],
      projectName: [this.project.projectName, Validators.required],
      email: [this.project.email, Validators.required],
      descriptionP: [this.project.descriptionP, Validators.required],
      objectiveP: [this.project.objectiveP, Validators.required],
      deadlineP: [this.dateDeadline, Validators.required],
      budget: [this.project.budget, [Validators.required, Validators.pattern(/^[0-9]*$/)]],

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

      this.project.id=this.editProjectForm.value.id;
      this.project.projectName=this.editProjectForm.value.projectName;
      this.project.email=this.editProjectForm.value.email;
      this.project.descriptionP=this.editProjectForm.value.descriptionP;
      this.project.objectiveP=this.editProjectForm.value.objectiveP;
      this.project.deadlineP=this.editProjectForm.value.deadlineP;
      this.project.budget=this.editProjectForm.value.budget;
      this.project.userId=user;

      console.log(this.project)      
      console.log(this.project.id)
      this.projectService.updateProject(this.project).subscribe((data=>{
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
    this.projectService.Managers().subscribe(
      (response:any) => {
        console.log(response)
        this.managers = response; // Mettre à jour la variable 'managers' avec la réponse du service

      },
      (error) => {
        console.error(error);
      }
    );
  }
}
