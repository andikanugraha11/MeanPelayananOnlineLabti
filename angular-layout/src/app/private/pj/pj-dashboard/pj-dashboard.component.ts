import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-pj-dashboard',
  templateUrl: './pj-dashboard.component.html',
  styleUrls: ['./pj-dashboard.component.css']
})
export class PjDashboardComponent implements OnInit {
  peringatan: Boolean = false;
  dibuat: Number;
  proses: Number;
  selesai: Number;
  userData: any;
  praktikumData: any;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    const service = this.authService;
    this.authService.getProfile().subscribe(profile => {
      this.userData = profile.user;
      const PjId = this.userData._pjId;

      service.getReportCreatedByPjId(PjId).subscribe(data => {
        this.dibuat = data.report.length;
      });
      service.getReportOnProgressByPjId(PjId).subscribe(data => {
        this.proses = data.report.length;
        if (this.dibuat > 0) {
          this.peringatan = true;
        }
      });
      service.getReportCompleteByPjId(PjId).subscribe(data => {
        this.selesai = data.report.length;
      });
      this.authService.getPjDetail(PjId).subscribe(data => {
        this.praktikumData = data.data._praktikumId.length;
        // console.log(this.praktikumData.length)
      });
    })
  }

}
