import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PrivateComponent } from './private.component';
import { PetugasDashboardComponent } from './petugas/petugas-dashboard/petugas-dashboard.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { PjDashboardComponent } from './pj/pj-dashboard/pj-dashboard.component';
import { PraktikanDashboardComponent } from './praktikan/praktikan-dashboard/praktikan-dashboard.component';
import { FlashMessagesModule } from 'angular2-flash-messages/module';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { DataTableModule } from "angular2-datatable";
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
import { ModalMakeReportComponent } from './praktikan/laporan/make-report/modal-make-report/modal-make-report.component';
import { MakeReportComponent } from './praktikan/laporan/make-report/make-report.component';
import { ReportOnProgressComponent } from './praktikan/laporan/report-on-progress/report-on-progress.component';
import { ReportCompleteComponent } from './praktikan/laporan/report-complete/report-complete.component';
import { PjReportOnProgressComponent } from './pj/report/pj-report-on-progress/pj-report-on-progress.component';
import { PjReportCompleteComponent } from './pj/report/pj-report-complete/pj-report-complete.component';
import { PjReportCreatedComponent } from './pj/report/pj-report-created/pj-report-created.component';
import { PetugasReportOnProgressComponent } from './petugas/report/petugas-report-on-progress/petugas-report-on-progress.component';
import { PetugasReportCompleteComponent } from './petugas/report/petugas-report-complete/petugas-report-complete.component';
import { ToasterModule } from 'angular2-toaster';
import { ValidationService } from '../services/validation.service';
import { AuthService } from '../services/auth.service';
import { AdminAuthGuard } from '../guards/adminAuth.guard';
import { PetugasAuthGuard } from '../guards/petugasAuth.guard';
import { PjAuthGuard } from '../guards/pjAuth.guard';
import { PraktikanAuthGuard } from '../guards/praktikanAuth.guard';
import { loginGuard } from '../guards/login.guard';
import { amSearchByName, amSearchByNamePengulangan } from './pipe/admin-module/am-searchByName.pipe';
import { amSearchByNpm, amSearchByNpmPengulangan } from './pipe/admin-module/am-searchByNpm.pipe';
import { amSearchByClass } from './pipe/admin-module/am-searchByClass.pipe';
import { DataTablesModule } from 'angular-datatables';
import { ModalAddUploadPraktikanComponent } from './admin/user-management/modal-add-upload-praktikan/modal-add-upload-praktikan.component';
import { AccountComponent } from './account/account.component';
import { ModalDetailPraktikumComponent } from './praktikan/praktikan-dashboard/modal-detail-praktikum/modal-detail-praktikum.component';
import { ModalDetailPraktikanComponent } from './admin/user-management/modal-detail-praktikan/modal-detail-praktikan.component';


const appRoutes: Routes =
  [
    {
      path: 'dashboard',
      component: PrivateComponent,
      canActivate: [loginGuard],
      children: [
        {
          path: '',
          component: PraktikanDashboardComponent,
          canActivate: [PraktikanAuthGuard]
        },
        {
          path: 'laporan',
          component: MakeReportComponent,
          canActivate: [PraktikanAuthGuard]
        },
        {
          path: 'laporan/proses',
          component: ReportOnProgressComponent,
          canActivate: [PraktikanAuthGuard]
        },
        {
          path: 'laporan/selesai',
          component: ReportCompleteComponent,
          canActivate: [PraktikanAuthGuard]
        },
        {
          path: 'petugas',
          component: PetugasDashboardComponent,
          canActivate: [PetugasAuthGuard]
        },
        {
          path: 'petugas/laporan/proses',
          component: PetugasReportOnProgressComponent,
          canActivate: [PetugasAuthGuard]
        },
        {
          path: 'petugas/laporan/selesai',
          component: PetugasReportCompleteComponent,
          canActivate: [PetugasAuthGuard]
        },
        {
          path: 'admin',
          component: AdminDashboardComponent,
          canActivate: [AdminAuthGuard]
        },
        {
          path: 'admin/praktikan',
          component: UserManagementComponent,
          canActivate: [AdminAuthGuard]
        },
        {
          path: 'admin/pj',
          component: PjManagementComponent,
          canActivate: [AdminAuthGuard]
        },
        {
          path: 'admin/petugas',
          component: PetugasManagementComponent,
          canActivate: [AdminAuthGuard]
        },
        {
          path: 'admin/praktikum/tingkat1',
          component: Tingkat1Component,
          canActivate: [AdminAuthGuard]
        },
        {
          path: 'admin/praktikum/tingkat2',
          component: Tingkat2Component,
          canActivate: [AdminAuthGuard]
        },
        {
          path: 'admin/praktikum/tingkat3',
          component: Tingkat3Component,
          canActivate: [AdminAuthGuard]
        },
        {
          path: 'admin/praktikum/tingkat4',
          component: Tingkat4Component,
          canActivate: [AdminAuthGuard]
        },
        {
          path: 'pj',
          component: PjDashboardComponent,
          canActivate: [PjAuthGuard]
        },
        {
          path: 'pj/praktikum',
          component: PraktikumPjComponent,
          canActivate: [PjAuthGuard]
        },
        {
          path: 'pj/praktikum/:id_praktikum',
          component: DetailPraktikumPjComponent,
          canActivate: [PjAuthGuard]
        },
        {
          path: 'pj/laporan/dibuat',
          component: PjReportCreatedComponent,
          canActivate: [PjAuthGuard]
        },
        {
          path: 'pj/laporan/proses',
          component: PjReportOnProgressComponent,
          canActivate: [PjAuthGuard]
        },
        {
          path: 'pj/laporan/selesai',
          component: PjReportCompleteComponent,
          canActivate: [PjAuthGuard]
        },
        {
          path : 'account',
          component : AccountComponent
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
    TabsModule,
    ToasterModule,
    DataTablesModule
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
    MakeReportComponent,
    ReportOnProgressComponent,
    ReportCompleteComponent,
    PjReportOnProgressComponent,
    PjReportCompleteComponent,
    PjReportCreatedComponent,
    PetugasReportOnProgressComponent,
    PetugasReportCompleteComponent,
    amSearchByName,
    amSearchByNpm,
    amSearchByClass,
    amSearchByNpmPengulangan,
    amSearchByNamePengulangan,
    ModalAddUploadPraktikanComponent,
    AccountComponent,
    ModalDetailPraktikumComponent,
    ModalDetailPraktikanComponent
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
    ModalDetailTingkat4Component,
    ModalMakeReportComponent,
    ModalAddUploadPraktikanComponent,
    ModalDetailPraktikumComponent,
    ModalDetailPraktikanComponent
  ],
  providers: [ ValidationService, AuthService, AdminAuthGuard, loginGuard, PjAuthGuard, PetugasAuthGuard, PraktikanAuthGuard],
})
export class PrivateModule { }
