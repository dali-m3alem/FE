import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit{
  constructor(private messagerService:MessageService){}
  chatsList:any
  dataArray:any
  sendMessage(){}
  ngOnInit(): void {
    const senderId = 53; // Remplacez par l'ID de l'expéditeur souhaité
    const recipientsId = 55; // Remplacez par l'ID des destinataires souhaité
    this.messagerService.getMessagesBetweenTwoUsers(senderId, recipientsId)
      .subscribe(
        (response) => {
          this.dataArray = response;
          console.log(response)
        },
        error => {
          // Gérer l'erreur ici
        }
      );
  }
}
