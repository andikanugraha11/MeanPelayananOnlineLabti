import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../../../services/validation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { Subject } from 'rxjs/Rx';
@Component({
  selector: 'app-pj-report-complete',
  templateUrl: './pj-report-complete.component.html',
  styleUrls: ['./pj-report-complete.component.css']
})
export class PjReportCompleteComponent implements OnInit {

  PjId: String;
  reports : Object;
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject();
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
    this.dtOptions = {
      language: {
        url: "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Indonesian.json"
      }
    };
    const service = this.authService;
    this.authService.getProfile().subscribe(profile => {
      this.PjId = profile.user._pjId;
      service.getReportCompleteByPjId(this.PjId).subscribe(data=>{
        this.reports = data.report;
        this.dtTrigger.next();
      })
    },
    err => {
      console.log(err);
      return false;
      
    });
  }

}
