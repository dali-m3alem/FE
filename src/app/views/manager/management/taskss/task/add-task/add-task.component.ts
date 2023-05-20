import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { TasksService } from 'src/app/views/services/tasks.service';
import { AuthadminService } from 'src/app/views/services/authadmin.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  taskForm!: FormGroup;
  task: any = {};
  submitted = false;
  isSaving =false;
idAc:any
managers!: [] ;

  constructor(private activeModal: NgbActiveModal,private fb: FormBuilder, private serv: TasksService,private auth:AuthadminService) { }

  ngOnInit() {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      activity: [0, Validators.required],
      email: ['', Validators.required],
      dueDate: ['', Validators.required],

    });
    this.getManager();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.taskForm.controls;
  }

  submit() {
  
    if (this.taskForm.valid) {
      Swal.fire({
        html: "Veuillez patienter, chargement en cours ...",
        icon: 'info',
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        }
      });
  
    this.submitted = true;
    this.taskForm.value.activity=this.idAc;
    const  task = this.taskForm.value;
    console.log(task)
    this.serv.createTasks(task).subscribe(
      (data) => {
        Swal.close();
        Swal.fire(
          'Succès',
          'Activité ajoutée avec succès',
          'success'
        ).then((result) => {
          if (result.isConfirmed) {
            this.activeModal.close(data);
            this.isSaving = false;
          }
        });
      },
      (error: HttpErrorResponse) => {
        Swal.fire(
          'Erreur',
          'Veuillez vérifier les informations saisies',
          'error'
        );
        this.isSaving = false;
      }
    );
  } else {
    this.isSaving = false;
    Swal.fire(
      'Erreur',
      'Veuillez vérifier les informations saisies',
      'error'
    );
  }
}

    
    closeModal() {
      this.activeModal.close('Modal Closed');
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

        this.submit();
      }
    })
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
}