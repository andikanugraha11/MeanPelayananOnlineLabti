import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../../../services/validation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-petugas-report-on-progress',
  templateUrl: './petugas-report-on-progress.component.html',
  styleUrls: ['./petugas-report-on-progress.component.css']
})
export class PetugasReportOnProgressComponent implements OnInit {

  reports : Object;
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
    this.authService.getAllReportOnProgress().subscribe(data=>{
      console.log(data);
      this.reports = data.report;
    },
    err => {
      console.log(err);
      return false;
    })
  }

}
