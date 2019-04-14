import { Component, OnInit } from '@angular/core';
import { SocketService} from './../../socket.service';
import { AppService} from './../../app.service';
import { Router} from '@angular/router';
import { CookieService} from 'ngx-cookie-service';
import { ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
  providers:[SocketService]
})
export class ChatBoxComponent implements OnInit {

  public authToken: any;
  public userInfo: any;
  public receiverId: any;
  public receiverName: any;
  public userList: any = [];
  public disconnectedSocket: boolean;

  constructor(public AppService : AppService,
              public SocketService : SocketService,
              public router : Router,
              private toastr: ToastrService,
              private CookieService: CookieService) 
  { 
    this.receiverId = this.CookieService.get('receiverId');
    this.receiverName = this.CookieService.get('receiverName');

  }

  ngOnInit() {

    this.authToken = this.CookieService.get('authToken');
    this.userInfo = this.AppService.getUserInfoInLocalStorage();

    this.checkStatus();

    this.verifyUserConfirmation();

    this.getOnlineUserList();
  }

  public checkStatus : any = () => {
    if(this.CookieService.get('authToken') === undefined || this.CookieService.get('authToken') === '' || this.CookieService.get('authToken') === null)
    {
      this.router.navigate(['/']);
      return false;
    }
    else{
      return true;
    }
  }// end checkStatus

  public verifyUserConfirmation : any = () => {

    this.SocketService.verifyUser()
      .subscribe((data) => {

        this.disconnectedSocket = false;

        this.SocketService.setUser(this.authToken);
        this.getOnlineUserList();

      });
    } 

  public getOnlineUserList : any = () => {
    this.SocketService.onlineUserList().subscribe((userList) => {
       this.userList = [];

       for (let x in userList){
          let temp = { 'userId ': x,'name': userList[x], 'unread': 0, 'chatting': false}
          this.userList.push(temp);
       }
       console.log(this.userList);
    });
  }// end online-user-list

}
