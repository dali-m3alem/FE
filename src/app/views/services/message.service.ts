import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  helper=new JwtHelperService()


  constructor(private http:HttpClient) {
  }

  getMessagesBetweenTwoUsers(senderId: number, recipientsId: number) {
    const url = `http://localhost:8080/api/v1/auth/messages?sender=${senderId}&recipients=${recipientsId}`;
    return this.http.get(url);
  }

  
}
