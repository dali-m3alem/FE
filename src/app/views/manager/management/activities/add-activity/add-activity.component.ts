import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { ActivitiesService } from 'src/app/views/services/activities.service';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { TeamsService } from 'src/app/views/services/teams.service';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.scss']
})
export class AddActivityComponent implements OnInit {
  activityForm!: FormGroup;
  activity: any = {};
  errorMessage!: string;
  projectId!: number;
  isSaving =false;
  managersUser!: any;

  constructor(private activeModal: NgbActiveModal,private route: ActivatedRoute,private fb: FormBuilder, private http: HttpClient,private serv:ActivitiesService , private teamSer:TeamsService) { }
  get f(): { [key: string]: AbstractControl } {
    return this.activityForm.controls;
  }
  ngOnInit() {
    this.getTeam()
    this.activityForm = this.fb.group({
      activityName: ['', Validators.required],
      descriptionA: ['', Validators.required],
      objectiveA: ['', Validators.required],
      deadlineA: ['', Validators.required],
      team: ['', [Validators.required]],

    });
    console.log(this.projectId)   
  }
 
  submitted = false;


  submit() {
  
    if (this.activityForm.valid) {
      Swal.fire({
        html: "Veuillez patienter, chargement en cours ...",
        icon: 'info',
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        }
      });
  
      this.isSaving = true;
  
      this.activity.activityName = this.activityForm.value.activityName;
      this.activity.descriptionA = this.activityForm.value.descriptionA;
      this.activity.objectiveA = this.activityForm.value.objectiveA;
      this.activity.deadlineA = this.activityForm.value.deadlineA;
      this.activity.teamName = this.activityForm.value.team;
      this.activity.projectId = this.projectId;
  console.log(this.activity)
      this.serv.createActivity(this.activity).subscribe(
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