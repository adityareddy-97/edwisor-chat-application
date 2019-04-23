import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';

import { CookieService} from 'ngx-cookie-service';
import{ Observable } from 'rxjs';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { HttpErrorResponse,HttpParams} from '@angular/common/http';
import { tap,catchError} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private url = 'https://chatapi.edwisor.com';

  private socket;

  constructor(public http : HttpClient,private cookieService : CookieService) { 
    // connection is being created.
    // that handshake
    this.socket = io(this.url);
  }
  // events to be listened 

  public verifyUser = () =>{
    return Observable.create((observer) =>{

      this.socket.on('verifyUser', (data) =>{
        observer.next(data);
      });// end Socket
    
    });// end Observable
  
  }// end verifyUser

  public onlineUserList = () =>{
    return Observable.create((observer) => {
      this.socket.on('online-user-list',(userList) => {
        observer.next(userList);
      }); // end socket

    }); //end Observable

  } // end onlineUserList

  public disconnectedSocket = () => {
    return Observable.create((observer) => {
      this.socket.on('disconnect',() => {
        observer.next();
      }); // end socket

    }); // end Observable

  } // end disconnectedSocket

   // end events to be listened

  // events to be emitted

  public setUser = (authToken) => {
    this.socket.emit('set-user',authToken);
  } // end setUser

  public markChatAsSeen = (userDetails) => {
    this.socket.emit('mark-chat-as-seen',userDetails);
  } // end markChatAsSeen

  // events to be emitted

  // chat related methods 

  public getChat(senderId,receiverId,skip): Observable<any>{
    return this.http.get(`${this.url}/api/v1/chat/get/for/user?senderId=${senderId}&receiverId=${receiverId}&skip=${skip}&authToken=${this.cookieService.get('authToken')}`)
    .pipe(
      tap(data => console.log('Data received')),
      catchError(this.handleError)
    );
  }

  public chatByUserId = (userId) =>{
    return Observable.create((observer) => {
      this.socket.on(userId,(data) =>{
        observer.next(data);
      }); //end socket
    }); // end Observable
  } // end chatByUserId

  public sendChatMessage = (chatMsgObject) =>{
    this.socket.emit('chat-msg',chatMsgObject);
  }

  public exitSocket = () => {
    this.socket.disconnect();
  }

  private handleError(err: HttpErrorResponse) {

    let errorMessage = '';

    if (err.error instanceof Error) {

      errorMessage = `An error occurred: ${err.error.message}`;

    } else {

      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;

    } // end condition *if

    console.error(errorMessage);

    return Observable.throw(errorMessage);

  }  // END handleError

}
