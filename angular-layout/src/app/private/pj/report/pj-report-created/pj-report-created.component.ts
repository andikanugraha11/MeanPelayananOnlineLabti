import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../../../services/validation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-pj-report-created',
  templateUrl: './pj-report-created.component.html',
  styleUrls: ['./pj-report-created.component.css']
})
export class PjReportCreatedComponent implements OnInit {

  PjId: String;
  reports: Object;
  constructor(private toasterService: ToasterService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    const service = this.authService;
    this.authService.getProfile().subscribe(profile => {
      this.PjId = profile.user._pjId;
      //console.log(this.PjId);
      service.getReportCreatedByPjId(this.PjId).subscribe(data => {
        console.log(data.report);
        this.reports = data.report;
      })
    },
      err => {
        console.log(err);
        return false;

      });
  }

  removeReport(reportId) {
    const service = this.authService;
    this.authService.getReportById(reportId).subscribe(data => {
      const praktikanId = data.report._praktikanId;
      const detailId = data.report._detailPraktikumId;
      service.removeReportOnCreate(reportId, praktikanId, detailId).subscribe(data => {
        if (data.success) {
          this.toasterService.pop('success', 'Berhasil', 'Laporan berhasil dihapus');
          const service = this.authService;
          this.authService.getProfile().subscribe(profile => {
            this.PjId = profile.user._pjId;
            //console.log(this.PjId);
            service.getReportCreatedByPjId(this.PjId).subscribe(data => {
              //console.log(data.report);
              this.reports = data.report;
            })
          });
        } else {
          this.toasterService.pop('error', 'Gagal', 'Laporan gagal dihapus');
        }
        //console.log(data);
      });
    })
  }

}
