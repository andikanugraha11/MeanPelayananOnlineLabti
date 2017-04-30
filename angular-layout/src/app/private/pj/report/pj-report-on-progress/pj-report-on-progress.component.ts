import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../../../services/validation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-pj-report-on-progress',
  templateUrl: './pj-report-on-progress.component.html',
  styleUrls: ['./pj-report-on-progress.component.css']
})
export class PjReportOnProgressComponent implements OnInit {

  PjId: String;
  reports : Object;
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
    const service = this.authService;
    this.authService.getProfile().subscribe(profile => {
      this.PjId = profile.user._pjId;
      console.log(this.PjId);
      service.getReportOnProgressByPjId(this.PjId).subscribe(data=>{
        console.log(data.report);
        this.reports = data.report;
      })
    },
    err => {
      console.log(err);
      return false;
      
    });
  }

  confirmPayment(reportId){
    this.authService.confirmPayment(reportId).subscribe(data=>{
      console.log(data);
    });
  }

}