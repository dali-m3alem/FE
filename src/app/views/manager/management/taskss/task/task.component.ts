import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/views/model/user';
import { TasksService } from 'src/app/views/services/tasks.service';
import Swal from "sweetalert2";
import { AddTaskComponent } from './add-task/add-task.component';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { MatDatepicker } from '@angular/material/datepicker';
import { DetailsTaskComponent } from './details-task/details-task.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit{
  searchValue: string = '';

  projectId: any;
  idAc: any;
  public projects : Array<Task> = [];
  public project : Task = new Task();
  constructor(public modalService: NgbModal,private taskSer:TasksService,private route: ActivatedRoute){}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = params['id'];
      this.idAc = params['idAc'];

      // Utilisez this.projectId comme bon vous semble dans votre composant
    });
    this.getTasks()
  }
  dataArray!: Task[] ;
  @ViewChild('picker')
  picker!: MatDatepicker<Date>;
  getTasks(){
    Swal.fire({
      title: "Chargement",
      html: "Veuillez patientez, chargements en cours ....",
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      }
    });
    this.taskSer.getTasksByActivityAndProjectAndManager(this.idAc,this.projectId).subscribe(
      (response: Task[]) => {
        this.dataArray = response;
        console.log(response)
        Swal.close();
console.log(response)
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  confirmDeleteProject(id:number){  {
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

        this.deleteActivity(id);
      }
    })
  }}
  editer(row: Task) {
    const options3: NgbModalOptions = {
      size: 'l',
      centered: true,
      scrollable: true,
      windowClass:'modal-holder'
    };
    const modalRef = this.modalService.open(UpdateTaskComponent, options3);
    modalRef.componentInstance.task = row;
    console.log(row)

    modalRef.result.then((result) => {
      this.getTasks();
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }  
  deleteActivity(id: number): void {
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
    this.taskSer.deleteTask(id).subscribe(
      (response: any) => {
        Swal.close();

        Swal.fire(
          'Succès',
          'Suppression avec succès',
          'success'
        ).then((result) => {
          if (result.isConfirmed) {
            this.getTasks();
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

add(){
  const options2: NgbModalOptions = {
    size: 'l',
    centered: true,
    scrollable: true,
    windowClass:'modal-holder'

  };
  const modalRef = this.modalService.open(AddTaskComponent, options2);
  modalRef.componentInstance.idAc = this.idAc; // Pass the projectId to the modal component

  modalRef.result.then((result) => {
    this.getTasks();
    console.log(result);
  }).catch((error) => {
    console.log(error);
  });
}
details(row: Task) {
  const options1: NgbModalOptions = {
    size: 'l',
    centered: true,
    scrollable: true,
    windowClass:'modal-holder'

  };
  const modalRef = this.modalService.open(DetailsTaskComponent, options1);
  modalRef.componentInstance.task = row;

  modalRef.result.then((result) => {
    console.log(result);
  }).catch((error) => {
    console.log(error);
  });

}  
}
