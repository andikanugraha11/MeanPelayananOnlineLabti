import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './public.component';
import { ActivationComponent } from './activation/activation.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FlashMessagesModule } from 'angular2-flash-messages/module';
import { AccessDeniedComponent } from './access-denied/access-denied.component';


const appRoutes : Routes = 
[
  {
    path        : '',
    component   : PublicComponent,
    children    : [
      {
        path        : '',
        component   : LoginComponent
      },
      {
        path        : 'activation',
        component   : ActivationComponent
      },
      {
        path        : 'reset',
        component   : ResetPasswordComponent
      },
    ]
  },
  {
    path          : '403',
    component     : AccessDeniedComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule
  ],
  declarations: [
    PublicComponent,
    ActivationComponent,
    LoginComponent,
    ResetPasswordComponent,
    AccessDeniedComponent
  ]
})
export class PublicModule { }
