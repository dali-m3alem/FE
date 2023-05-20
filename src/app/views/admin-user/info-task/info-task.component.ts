import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Task } from 'src/app/views/model/user';

@Component({
  selector: 'app-info-task',
  templateUrl: './info-task.component.html',
  styleUrls: ['./info-task.component.scss'],  providers: [DatePipe]

})
export class InfoTaskComponent {
  @Input() taskStatus: Task | undefined;


  constructor( private activeModal: NgbActiveModal, private modal: NgbModal,public datePipe: DatePipe
   ) {}
  closeModal() {
    this.activeModal.close('Modal Closed');
  }
}
