import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { TeamsService } from 'src/app/views/services/teams.service';
import Swal from "sweetalert2";
import { AddTeamComponent } from './add-team/add-team.component';
import { Team } from 'src/app/views/model/user';
import { UpdateTeamComponent } from './update-team/update-team.component';
import { DetailsTeamComponent } from './details-team/details-team.component';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements   OnInit{
  dataArray!: any;
  team: any;
  searchValue: string = '';
constructor(private route:ActivatedRoute,private teamSer:TeamsService,public modalService: NgbModal){

}
getRoleNames(roles: any[]): string {
  return roles.map(role => role.roleName).join(', ');
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
    
    this.getTeam();
  }
  getTeam(){

    // ...
    
    this.teamSer.getTeam().subscribe(
      (response: any) => {
        this.dataArray = response; // Assign the response to 'dataArray'
        console.log(response);
        Swal.close();
      },
      (error: any) => {
        console.log(error);
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
      const modalRef = this.modalService.open(AddTeamComponent, options2);
    
      modalRef.result.then((result) => {
this.getTeam()
       console.log(result);
      }).catch((error) => {
        console.log(error);
      });
    }
    editer(row: Team) {
      const options3: NgbModalOptions = {
        size: 'l',
        centered: true,
        scrollable: true,
        windowClass:'modal-holder'
      };
      const modalRef = this.modalService.open(UpdateTeamComponent, options3);
      modalRef.componentInstance.team = row;
      console.log(row)
    
      modalRef.result.then((result) => {
        this.getTeam();
        console.log(result);
      }).catch((error) => {
        console.log(error);
      });
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
  
          this.deleteTeam(id);
        }
      })
    }}


  deleteTeam(id: number): void {
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
    this.teamSer.deleteTeam(id).subscribe(
      (response: any) => {
        Swal.close();

        Swal.fire(
          'Succès',
          'Suppression avec succès',
          'success'
        ).then((result) => {
          if (result.isConfirmed) {
            this.getTeam();
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
details(row: Team) {
  const options1: NgbModalOptions = {
    size: 'l',
    centered: true,
    scrollable: true,
    windowClass:'modal-holder'

  };
  const modalRef = this.modalService.open(DetailsTeamComponent, options1);
  modalRef.componentInstance.team = row;

  modalRef.result.then((result) => {
    console.log(result);
  }).catch((error) => {
    console.log(error);
  });

} 
}
