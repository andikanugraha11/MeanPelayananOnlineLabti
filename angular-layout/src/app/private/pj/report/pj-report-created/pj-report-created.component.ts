import { Component, OnInit, ViewChild } from '@angular/core';
import { ValidationService } from '../../../../services/validation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { ToasterService } from 'angular2-toaster';
import { DataTableDirective } from 'angular-datatables';
import { default as swal } from 'sweetalert2'
import { Subject } from 'rxjs/Rx';

@Component({
  selector: 'app-pj-report-created',
  templateUrl: './pj-report-created.component.html',
  styleUrls: ['./pj-report-created.component.css']
})
export class PjReportCreatedComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  PjId: String;
  reports: Object;
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject();
  constructor(private toasterService: ToasterService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.dtOptions = {
      language: {
        url: "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Indonesian.json"
      }
    };
    const service = this.authService;
    this.authService.getProfile().subscribe(profile => {
      this.PjId = profile.user._pjId;
      //console.log(this.PjId);
      service.getReportCreatedByPjId(this.PjId).subscribe(data => {
        // console.log(data.report);
        this.reports = data.report;
        this.dtTrigger.next();
      })
    },
      err => {
        console.log(err);
        return false;

      });
  }

  removeReport(reportId) {
    swal({
      title: 'Anda Akan Membatalkan Laporan?',
      text: "Form laporan pada praktikan akan dihapus",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya',
      cancelButtonText: 'Tidak',
    }).then(() => {
      const service = this.authService;
      this.authService.getReportById(reportId).subscribe(data => {
        const praktikanId = data.report._praktikanId;
        const detailId = data.report._detailPraktikumId;
        service.removeReportOnCreate(reportId, praktikanId, detailId).subscribe(data => {
          if (data.success) {
            swal(
              'Terhapus!',
              'Form laporan dibatalkan',
              'success'
            )
            const service = this.authService;
            this.authService.getProfile().subscribe(profile => {
              this.PjId = profile.user._pjId;
              service.getReportCreatedByPjId(this.PjId).subscribe(data => {
                this.reports = data.report;
                this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                  dtInstance.destroy();
                  this.dtTrigger.next();
                });
              })
            });
          } else {
            this.toasterService.pop('error', 'Gagal', 'Laporan gagal dihapus');
          }
          //console.log(data);
        });
      })
    })

  }

}
