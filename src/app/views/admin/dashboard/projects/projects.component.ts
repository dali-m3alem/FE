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
  searchValue: string = '';

  dataArray!: Project[];
  submitted = false;
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
  }

  loadData(){
    this.projectService.getAllProjectsByAdminId().subscribe(
      (response: Project[]) => {
        this.dataArray = response;
        console.log(this.dataArray);
        Swal.close();

      },
      (error: any) => {
        console.log(error);
      }
    );


  
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
  details(row: any) {
    const options1: NgbModalOptions = {
      size: 'l',
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
      size: 'l',
      centered: true,
      scrollable: true,
      windowClass:'modal-holder'
    };
    const modalRef = this.modalService.open(EditProjectComponent, options3);
    modalRef.componentInstance.project = row;
    console.log(row)

    modalRef.result.then((result) => {
      this.loadData();
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }


  @ViewChild('picker')
  picker!: MatDatepicker<Date>;
  confirmDeleteProject(id: number)
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

        this.deleteProject(id);
      }
    })
  }
  deleteProject(id: number): void {
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


}
