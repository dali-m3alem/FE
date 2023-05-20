import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TeamsService } from 'src/app/views/services/teams.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TasksService } from 'src/app/views/services/tasks.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss']
})
export class AddTeamComponent implements OnInit {
  teamForm: any;
  team: any = {};
  submitted = false;
  isSaving =false;
  errorMessage!: string;
  managers!: [] ;

  constructor(private activeModal: NgbActiveModal,private fb: FormBuilder, private http: HttpClient,private serv:TeamsService,private servTask:TasksService) { }
  get f(): { [key: string]: AbstractControl } {
    return this.teamForm.controls;
  }

  ngOnInit() {
    this.teamForm = this.fb.group({
      teamName: ['', Validators.required],
      teamDesc: ['', Validators.required],
      emails: this.fb.array([this.createEmailControl()]), // Au moins un e-mail requis

    });
    this.getManager();
  }
  createEmailControl(): AbstractControl {
    return this.fb.control('', [Validators.required, Validators.email]);
  }
  get emails(): FormArray {
    return this.teamForm.get('emails') as FormArray;
  }

  addEmail() {
    this.emails.push(this.fb.control('', Validators.email));
  }

  removeEmail(index: number) {
    this.emails.removeAt(index);
  }

  submit() {
    if (this.teamForm.valid) {
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
    const formData = {
      teamName: this.teamForm.value.teamName,
      emails: this.teamForm.value.emails, // Convert the string of comma-separated emails to an array
      teamDesc: this.teamForm.value.teamDesc
    };
console.log(formData)

      this.serv.createTeam(formData).subscribe(
        (data) => {
          Swal.close();
          Swal.fire(
            'Succès',
            'Team ajoutée avec succès',
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
          if (error.status === 400) {
            Swal.fire(
              'Erreur',
              'Le nom d\'équipe existe déjà.',
              'error'
            );}
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
    this.servTask.managersUsers().subscribe(
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
