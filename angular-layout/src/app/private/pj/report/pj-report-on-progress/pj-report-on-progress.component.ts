import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../../../services/validation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { ToasterService } from 'angular2-toaster';
import { default as swal } from 'sweetalert2'

@Component({
  selector: 'app-pj-report-on-progress',
  templateUrl: './pj-report-on-progress.component.html',
  styleUrls: ['./pj-report-on-progress.component.css']
})
export class PjReportOnProgressComponent implements OnInit {

  PjId: String;
  reports: Object;
  reportAvailable: Boolean =false;
  constructor(private toasterService: ToasterService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    const service = this.authService;
    this.authService.getProfile().subscribe(profile => {
      this.PjId = profile.user._pjId;
      //console.log(this.PjId);
      service.getReportOnProgressByPjId(this.PjId).subscribe(data => {
        //console.log(data.report);
        this.reports = data.report;
        if(data.report.length > 0){
          this.reportAvailable = true;
        }
      })
    },
      err => {
        console.log(err);
        return false;

      });
  }

  confirmPayment(reportId) {
    swal({
      title: 'Konfirmasi pembayaran',
      text: "Praktikan sudah membayar biaya pengulangan?",
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya',
      cancelButtonText: 'Tidak',
    }).then(() => {

      this.authService.confirmPayment(reportId).subscribe(data => {
        if (data.success) {
          swal(
                        'Berhasil!',
                        'Praktikan yang bersangkutan sudah menyelesaikan semua tahap',
                        'success'
                    )
          const service = this.authService;
          this.authService.getProfile().subscribe(profile => {
            this.PjId = profile.user._pjId;
            service.getReportOnProgressByPjId(this.PjId).subscribe(data => {
              this.reports = data.report;
            })
          });
        } else {
          this.toasterService.pop('error', 'Gagal', 'Gagal melakukan konfirmasi');
        }
        // console.log(data);
      });



    });

  }

}