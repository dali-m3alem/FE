import {Component, Input, OnInit} from '@angular/core';

import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AuthadminService } from 'src/app/views/services/authadmin.service';
import { TasksService } from 'src/app/views/services/tasks.service';
import { DatePipe } from '@angular/common';
import { Task, Team } from 'src/app/views/model/user';
import { ActivatedRoute } from '@angular/router';
import { ActivitiesService } from 'src/app/views/services/activities.service';
import { TeamsService } from 'src/app/views/services/teams.service';
@Component({
  selector: 'app-details-activity',
  templateUrl: './details-activity.component.html',
  styleUrls: ['./details-activity.component.scss'],
  providers: [DatePipe]

})
export class DetailsActivityComponent {
  @Input() public activity: any;
  editProjectForm!: FormGroup;
  deadlineA!: any;
  managersUser: any;
 isSaving =false;
 constructor(private activityService: ActivitiesService, private activeModal: NgbActiveModal,
             private formBuilder: FormBuilder, private modal: NgbModal,public datePipe: DatePipe
            , private teamSer:TeamsService) {}

            ngOnInit() {

            }
          
          
          
          
            closeModal() {
              this.activeModal.close('Modal Closed');
            }
          
            
 
 
}
