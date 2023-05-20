import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Activity } from 'src/app/views/model/user';
import { ActivitiesService } from 'src/app/views/services/activities.service';
import Swal from "sweetalert2";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UpdateActivityComponent } from '../update-activity/update-activity.component';
import { DetailsActivityComponent } from '../details-activity/details-activity.component';
import { AddActivityComponent } from '../add-activity/add-activity.component';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  projectId!: number;
  dataArray!: any;
  searchValue: string = '';

  constructor(private route: ActivatedRoute , private router:Router,private activitySer:ActivitiesService,public modalService: NgbModal) {}

  ngOnInit() {
    Swal.fire({
      title: "Chargement",
      html: "Veuillez patientez, chargements en cours ....",
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      }
    });
    this.route.params.subscribe(params => {
      this.projectId = params['id'];
      // Utilisez this.projectId comme bon vous semble dans votre composant
    });
    this.getActivity();
  }
  getActivity() {
    this.activitySer.getActivityByProjectId(this.projectId).subscribe(
      (response) => {
        this.dataArray = response;
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
    const modalRef = this.modalService.open(AddActivityComponent, options2);
    modalRef.componentInstance.projectId = this.projectId; // Pass the projectId to the modal component

    modalRef.result.then((result) => {
      this.getActivity();
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }
  details(row: any) {
    const options1: NgbModalOptions = {
      size: 'xl',
      centered: true,
      scrollable: true,
      windowClass:'modal-holder'
  
    };
    const modalRef = this.modalService.open(DetailsActivityComponent, options1);
    modalRef.componentInstance.activity = row;
  
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  
  }    confirmDeleteProject(id:number){  {
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
    this.activitySer.deleteActivity(id).subscribe(
      (response: any) => {
        Swal.close();

        Swal.fire(
          'Succès',
          'Suppression avec succès',
          'success'
        ).then((result) => {
          if (result.isConfirmed) {
            this.getActivity();
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

editer(row: any) {
  const options3: NgbModalOptions = {
    size: 'xl',
    centered: true,
    scrollable: true,
    windowClass:'modal-holder'
  };
  const modalRef = this.modalService.open(UpdateActivityComponent, options3);
  modalRef.componentInstance.activity = row;
  console.log(row)

  modalRef.result.then((result) => {
    this.getActivity();
    console.log(result);
  }).catch((error) => {
    console.log(error);
  });
} 

}
