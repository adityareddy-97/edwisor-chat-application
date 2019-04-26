import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { RouterModule,Routes } from '@angular/router';
import { ToastrModule} from 'ngx-toastr';
import { SharedModule } from '../shared/shared.module';
import { UserDetailsComponent} from '../shared/user-details/user-details.component';
import { RemoveSpecialCharPipe } from './../shared/pipe/remove-special-char.pipe';


@NgModule({
  declarations: [ChatBoxComponent,RemoveSpecialCharPipe],
  imports: [
    CommonModule,
    SharedModule,
    ToastrModule.forRoot(),

    RouterModule.forChild([
     { path:'chat',component:ChatBoxComponent}
    ])
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ChatModule { }
