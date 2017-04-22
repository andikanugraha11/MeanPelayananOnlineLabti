import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import { CommonModule } from '@angular/common';
import { PrivateComponent } from './private.component';
import { PetugasDashboardComponent } from './petugas/petugas-dashboard/petugas-dashboard.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { PjDashboardComponent } from './pj/pj-dashboard/pj-dashboard.component';
import { PraktikanDashboardComponent } from './praktikan/praktikan-dashboard/praktikan-dashboard.component';
import { FlashMessagesModule } from 'angular2-flash-messages/module';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import {DataTableModule} from "angular2-datatable";
import { ModalAddPraktikanComponent } from './admin/user-management/modal-add-praktikan/modal-add-praktikan.component';
import { PjManagementComponent } from './admin/user-management/pj-management/pj-management.component';
import { ModalAddPjComponent } from './admin/user-management/pj-management/modal-add-pj/modal-add-pj.component';
import { PetugasManagementComponent } from './admin/user-management/petugas-management/petugas-management.component';
import { ModalAddPetugasComponent } from './admin/user-management/petugas-management/modal-add-petugas/modal-add-petugas.component';
import { Tingkat1Component } from './admin/praktikum-management/tingkat1/tingkat1.component';
import { Tingkat2Component } from './admin/praktikum-management/tingkat2/tingkat2.component';
import { Tingkat3Component } from './admin/praktikum-management/tingkat3/tingkat3.component';
import { Tingkat4Component } from './admin/praktikum-management/tingkat4/tingkat4.component';
import { ModalAddTingka1Component } from './admin/praktikum-management/tingkat1/modal-add-tingka1/modal-add-tingka1.component';
import { ModalAddTingka2Component } from './admin/praktikum-management/tingkat2/modal-add-tingka2/modal-add-tingka2.component';
import { ModalAddTingka3Component } from './admin/praktikum-management/tingkat3/modal-add-tingka3/modal-add-tingka3.component';
import { ModalAddTingka4Component } from './admin/praktikum-management/tingkat4/modal-add-tingka4/modal-add-tingka4.component';
import { ModalDetailTingkat1Component } from './admin/praktikum-management/tingkat1/modal-detail-tingkat1/modal-detail-tingkat1.component';
import { ModalDetailTingkat2Component } from './admin/praktikum-management/tingkat2/modal-detail-tingkat2/modal-detail-tingkat2.component';
import { ModalDetailTingkat3Component } from './admin/praktikum-management/tingkat3/modal-detail-tingkat3/modal-detail-tingkat3.component';
import { ModalDetailTingkat4Component } from './admin/praktikum-management/tingkat4/modal-detail-tingkat4/modal-detail-tingkat4.component';
import { PraktikumPjComponent } from './pj/praktikum-pj/praktikum-pj.component';
import { DetailPraktikumPjComponent } from './pj/detail-praktikum-pj/detail-praktikum-pj.component';
import { TabsModule } from "ng2-tabs";
import { ModalMakeReportComponent } from './pj/detail-praktikum-pj/modal-make-report/modal-make-report.component';

const appRoutes : Routes = 
[
  {
    path        : 'dashboard',
    component   : PrivateComponent,
    children    : [
      {
        path        : '',
        component   : PraktikanDashboardComponent
      },
      {
        path        : 'petugas',
        component   : PetugasDashboardComponent
      },
      {
        path        : 'pj',
        component   : PjDashboardComponent
      },
      {
        path        : 'admin',
        component   : AdminDashboardComponent
      },
      {
        path        : 'admin/praktikan',
        component   : UserManagementComponent
      },
      {
        path        : 'admin/pj',
        component   : PjManagementComponent
      },
      {
        path        : 'admin/petugas',
        component   : PetugasManagementComponent
      },
      {
        path        : 'admin/praktikum/tingkat1',
        component   : Tingkat1Component
      },
      {
        path        : 'admin/praktikum/tingkat2',
        component   : Tingkat2Component
      },
      {
        path        : 'admin/praktikum/tingkat3',
        component   : Tingkat3Component
      },
      {
        path        : 'admin/praktikum/tingkat4',
        component   : Tingkat4Component
      },
      {
        path        : 'pj/praktikum',
        component   : PraktikumPjComponent
      },
      {
        path        : 'pj/praktikum/:id_praktikum',
        component   : DetailPraktikumPjComponent
      }
    ]
  },
]

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    DataTableModule,
    TabsModule
  ],
  declarations: [
    PrivateComponent,
    PetugasDashboardComponent,
    AdminDashboardComponent,
    PjDashboardComponent,
    PraktikanDashboardComponent,
    UserManagementComponent,
    ModalAddPraktikanComponent,
    PjManagementComponent,
    ModalAddPjComponent,
    PetugasManagementComponent,
    ModalAddPetugasComponent,
    Tingkat1Component,
    Tingkat2Component,
    Tingkat3Component,
    Tingkat4Component,
    ModalAddTingka1Component,
    ModalAddTingka2Component,
    ModalAddTingka3Component,
    ModalAddTingka4Component,
    ModalDetailTingkat1Component,
    ModalDetailTingkat2Component,
    ModalDetailTingkat3Component,
    ModalDetailTingkat4Component,
    PraktikumPjComponent,
    DetailPraktikumPjComponent,
    ModalMakeReportComponent,
    ],
    entryComponents: [
      ModalAddPraktikanComponent, 
      ModalAddPjComponent, 
      ModalAddPetugasComponent,
      ModalAddTingka1Component,
      ModalAddTingka2Component,
      ModalAddTingka3Component,
      ModalAddTingka4Component,
      ModalDetailTingkat1Component,
      ModalDetailTingkat2Component,
      ModalDetailTingkat3Component,
      ModalDetailTingkat4Component
    ],
})
export class PrivateModule { }
