import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../../../services/validation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-pj-report-complete',
  templateUrl: './pj-report-complete.component.html',
  styleUrls: ['./pj-report-complete.component.css']
})
export class PjReportCompleteComponent implements OnInit {

  PjId: String;
  reports : Object;
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
    const service = this.authService;
    this.authService.getProfile().subscribe(profile => {
      this.PjId = profile.user._pjId;
      console.log(this.PjId);
      service.getReportCompleteByPjId(this.PjId).subscribe(data=>{
        console.log(data.report);
        this.reports = data.report;
      })
    },
    err => {
      console.log(err);
      return false;
      
    });
  }

}
