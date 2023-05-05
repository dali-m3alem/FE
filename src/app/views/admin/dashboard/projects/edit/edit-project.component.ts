import {Component, Input, OnInit} from '@angular/core';

import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {ProjectService} from "../../../../services/project.service";
import { DatePipe } from '@angular/common';

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
  isSaving =false;
  constructor(private projectService: ProjectService, private activeModal: NgbActiveModal,
              private formBuilder: FormBuilder, private modal: NgbModal,public datePipe: DatePipe
              ) {}


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
      durationP: [this.project.durationP, Validators.required],
      deadlineP: [this.dateDeadline, Validators.required],
      budget: [this.project.budget, [Validators.required, Validators.pattern(/^[0-9]*$/)]],

    });
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

      this.project.id=this.editProjectForm.value.id;
      this.project.projectName=this.editProjectForm.value.projectName;
      this.project.email=this.editProjectForm.value.email;
      this.project.descriptionP=this.editProjectForm.value.descriptionP;
      this.project.objectiveP=this.editProjectForm.value.objectiveP;
      this.project.durationP=this.editProjectForm.value.durationP;
      this.project.deadlineP=this.editProjectForm.value.deadlineP;
      this.project.budget=this.editProjectForm.value.budget;


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

}
