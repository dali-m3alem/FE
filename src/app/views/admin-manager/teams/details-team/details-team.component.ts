import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Team, User } from 'src/app/views/model/user';
import { TasksService } from 'src/app/views/services/tasks.service';
import { TeamsService } from 'src/app/views/services/teams.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-details-team',
  templateUrl: './details-team.component.html',
  styleUrls: ['./details-team.component.scss']
})
export class DetailsTeamComponent {
  @Input() public team: any;
  deadlineA!: any;
 isSaving =false;
  managers: any;
 constructor(private serv: TasksService, private activeModal: NgbActiveModal,
             private formBuilder: FormBuilder, private modal: NgbModal
            , private teamSer:TeamsService) {

            }


            ngOnInit() {

            }
          
          
          
          
            closeModal() {
              this.activeModal.close('Modal Closed');
            }
          
            
 



 
     // Créer l'objet à envoyer au serveur

}
