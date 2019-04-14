import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { RouterModule,Routes } from '@angular/router';
import { ToastrModule} from 'ngx-toastr';

@NgModule({
  declarations: [ChatBoxComponent],
  imports: [
    CommonModule,
    ToastrModule.forRoot(),

    RouterModule.forChild([
     { path:'chat',component:ChatBoxComponent}
    ])
  ]
})
export class ChatModule { }
