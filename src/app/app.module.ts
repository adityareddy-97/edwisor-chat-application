import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { ToastrModule} from 'ngx-toastr';
import { CookieService} from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent} from './user/signup/signup.component';

import { AppService} from './app.service';
import { ChatBoxComponent } from './chat/chat-box/chat-box.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ChatModule,
    UserModule,
    RouterModule.forRoot([
      {path :'login',component:LoginComponent,pathMatch:'full'},
      {path :'', redirectTo:'login',pathMatch:'full'},
      {path:'*',component:LoginComponent},
      {path:'**',component:LoginComponent},
      {path:'sign-up',component:SignupComponent,pathMatch:'full'},
      {path :'chat',component:ChatBoxComponent,pathMatch:'full'}
    ])
  ],
  providers: [CookieService,AppService],
  bootstrap: [AppComponent],
  schemas : [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
 
})
export class AppModule { }
