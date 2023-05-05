import { Component, ViewChild } from '@angular/core';
import { AuthadminService } from 'src/app/views/services/authadmin.service';
import { ProjectService } from 'src/app/views/services/project.service';
import { Project } from 'src/app/views/model/user';
//import Swal from 'sweetalert2/dist/sweetalert2.js';
import { MatDatepicker } from '@angular/material/datepicker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from "sweetalert2";
import {NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {AddProjectComponent} from "./add/add-project.component";
import {DetailsProjectComponent} from "./details/details-project.component";
import {EditProjectComponent} from "./edit/edit-project.component";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {

  userForm!:FormGroup;
  dataArray!: Project[];
  submitted = false;
  showPopup: boolean = false;
  errorMessage=''
  showOverlay=false;
  public projects : Array<Project> = [];
  public project : Project = new Project();
  constructor(public modalService: NgbModal,private projectService: ProjectService, private auth: AuthadminService, private fb:FormBuilder) {
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

  loadData(){
    const adminId = this.auth.getUser();
    this.projectService.getAllProjectsByAdminId(adminId).subscribe(
      (response: Project[]) => {
        this.dataArray = response;
        console.log(this.dataArray);
        Swal.close();

      },
      (error: any) => {
        console.log(error);
      }
    );


    this.selectedProject = {
      id: 0,
      projectName: '',
      descriptionP: '',
      objectiveP: '',
      durationP: 0,
      deadlineP: new Date().toISOString().substring(0, 10),
      email: '',
      userId: 0,
      status: '',
      budget: 0,
      expanded:true
    };
    const date = new Date();
    const isoDateString = date.toISOString(); // "2023-04-28T13:14:46.107Z"
  }
  prepareForm(){
    this.userForm = this.fb.group({
      projectName: ['', Validators.required],
      email: ['', Validators.required],
      descriptionP: ['', Validators.required],
      objectiveP: ['', Validators.required],
      durationP: ['', Validators.required],
      deadlineP: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}\+00:00$/)      ]],

      budget: ['', [Validators.required, Validators.pattern('/^[0-9]*$/')]],
    });
  }

  togglePopup(): void {
    this.showPopup = !this.showPopup;
    this.showOverlay = !this.showOverlay;
  }

  add(){
    const options2: NgbModalOptions = {
      size: 'xl',
      centered: true,
      scrollable: true,
      windowClass:'modal-holder'

    };
    const modalRef = this.modalService.open(AddProjectComponent, options2);

    modalRef.result.then((result) => {
      this.loadData();
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }
  details(row: Project) {
    const options1: NgbModalOptions = {
      size: 'xl',
      centered: true,
      scrollable: true,
      windowClass:'modal-holder'

    };
    const modalRef = this.modalService.open(DetailsProjectComponent, options1);
    modalRef.componentInstance.project = row;

    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });

  }
  editer(row: Project) {
    const options3: NgbModalOptions = {
      size: 'xl',
      centered: true,
      scrollable: true,
      windowClass:'modal-holder'

    };
    const modalRef = this.modalService.open(EditProjectComponent, options3);
    modalRef.componentInstance.project = row;

    modalRef.result.then((result) => {
      this.loadData();
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }
  editUser(project:Project ) {
    this.selectedProject = {
      id: project.id,
      projectName: project.projectName,
      descriptionP: project.descriptionP,
      objectiveP: project.objectiveP,
      durationP: project.durationP,
      deadlineP: project.deadlineP,
      email:project.email,
      userId:project.userId,
      status:project.status,
      budget:project.budget,
      expanded:project.expanded
    };

    // Afficher le popup pour modifier l'utilisateur
    this.showPopup = true;

  }


  selectedProject: Project = {
    id: 0,
    projectName: '',
    descriptionP: '',
    objectiveP: '',
    durationP: 0,
    deadlineP: '', // initialisé dans ngOnInit()
    email: '',
    userId: 0,
    status: '',
    budget: 0,
    expanded:true
  };

  @ViewChild('picker')
  picker!: MatDatepicker<Date>;
  confirmDeleteProject(id: number)
  {
    Swal.fire({
      title: "Confirmation",
      text:  'Voulez vous confirmer ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler'

    }).then((result) => {
      if (result.isConfirmed) {

        this.deleteProject(id);
      }
    })
  }
  deleteProject(id: number): void {
    Swal.fire({
      html: 'Veuillez patienter,suppression en cours ...',
      icon : 'info',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      }
    });
    this.projectService.deleteProject(id).subscribe(
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

updateProject(): void {
  this.submitted = true;


  const user = this.auth.getUser();
this.selectedProject.userId=user
  console.log(this.selectedProject)

  this.projectService.updateProject(this.selectedProject).subscribe((updatedProject) => {
    console.log('Projet mis à jour', updatedProject);
    this.togglePopup();
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
}
