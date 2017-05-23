import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { PrivateModule } from './private/private.module';
import { PublicModule } from './public/public.module';
import { AppComponent } from './app.component';
import { ValidationService } from './services/validation.service';
import { PageNotFoundComponent } from './public/page-not-found/page-not-found.component';
import { AuthService } from './services/auth.service';
import { FlashMessagesModule } from 'angular2-flash-messages/module';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';

const appRoutes : Routes = 
[
  {
    path        : '404',
    component   : PageNotFoundComponent
  },
  {
    path        : '**',
    redirectTo  : '404'
  }
]

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    PrivateModule,
    PublicModule,
    BootstrapModalModule,
  ],
  providers: [ValidationService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
