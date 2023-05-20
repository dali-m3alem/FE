import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';
import { Team } from 'src/app/views/model/user';
import { TeamsService } from 'src/app/views/services/teams.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent  implements OnInit{
  projectId: any;
  idTe: any;
  dataArray:any;
constructor(private route:ActivatedRoute,private teamSer:TeamsService){

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
    this.route.params.subscribe(params => {
      this.projectId = params['id'];
      this.idTe = params['idTe'];

      // Utilisez this.projectId comme bon vous semble dans votre composant
    });
    this.getTeam();
  }
  getTeam(){
    this.teamSer.getTeamByActivityAndProjectAndManager(this.idTe,this.projectId).subscribe(
      (response: any) => {
        this.dataArray = [response]; // Convert the response object to an array
        console.log(response)
        Swal.close();

      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  add(){

  }
  editer(activity: any){}
  details(activity:any){}
  confirmDeleteProject(id:number){}
}
