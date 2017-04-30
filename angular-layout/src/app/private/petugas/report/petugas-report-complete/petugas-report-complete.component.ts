import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../../../services/validation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-petugas-report-complete',
  templateUrl: './petugas-report-complete.component.html',
  styleUrls: ['./petugas-report-complete.component.css']
})
export class PetugasReportCompleteComponent implements OnInit {

  reports : Object;
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
    this.authService.getAllReportComplete().subscribe(data=>{
      console.log(data.report);
      this.reports = data.report;
    },
    err => {
      console.log(err);
      return false;
    })
  }
}
