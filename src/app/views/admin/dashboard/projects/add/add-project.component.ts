import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {HttpErrorResponse} from '@angular/common/http';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Project} from "../../../../model/user";
import {AuthadminService} from "../../../../services/authadmin.service";
import {ProjectService} from "../../../../services/project.service";


@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
})
export class AddProjectComponent implements OnInit {
  addProjectForm!: FormGroup;
  isSaving =false;
  project :Project = new Project() ;
  managers!: [] ;


  constructor(private activeModal: NgbActiveModal,
  private formBuilder: FormBuilder, private modal: NgbModal, private auth: AuthadminService,private asd:ProjectService,

  ) {}

  get f(): { [key: string]: AbstractControl } {
    return this.addProjectForm.controls;
  }
  ngOnInit() {

    this.addProjectForm = this.formBuilder.group({
      projectName: ['', Validators.required],
      email: ['', Validators.required],
      descriptionP: ['', Validators.required],
      objectiveP: ['', Validators.required],
      deadlineP: ['', Validators.required],
      budget: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],

    });
    this.getManager();
  }
  confirmSaveProject()
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

        this.addProject();
      }
    })
  }
  addProject() {
  const userId=this.auth.getUser();

    if (this.addProjectForm.valid) {
      Swal.fire({
        html: "Veuillez patienter,chargement en cours ...",
        icon : 'info',
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        }
      });

      this.isSaving=true;

      this.project.projectName=this.addProjectForm.value.projectName;
      this.project.email=this.addProjectForm.value.email;
      this.project.descriptionP=this.addProjectForm.value.descriptionP;
      this.project.objectiveP=this.addProjectForm.value.objectiveP;
      this.project.deadlineP=this.addProjectForm.value.deadlineP;
      this.project.budget=this.addProjectForm.value.budget;
      this.project.userId=userId;

console.log(userId)
      this.asd.createProject(this.project).subscribe((data=>{
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
  getManager(){
    this.asd.Managers().subscribe(
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
