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
    },
    err => {
      console.log(err);
      return false;
      
    });
  }

}