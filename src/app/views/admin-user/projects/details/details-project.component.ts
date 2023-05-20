import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-details-project',
  templateUrl: './details-project.component.html',
  styleUrls: ['./details-project.component.css'],
})
export class DetailsProjectComponent implements OnInit {
  @Input() public project: any;

  constructor(private activeModal: NgbActiveModal) {}


  ngOnInit() {

  }




  closeModal() {
    this.activeModal.close('Modal Closed');
  }

}
