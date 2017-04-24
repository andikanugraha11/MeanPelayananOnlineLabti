import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ValidationService } from '../../../../services/validation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-report-on-progress',
  templateUrl: './report-on-progress.component.html',
  styleUrls: ['./report-on-progress.component.css']
})
export class ReportOnProgressComponent implements OnInit {
  praktikanId: String;
  reports : Object;
  constructor(private route:ActivatedRoute,private authService:AuthService, private router:Router) { }

  ngOnInit() {
    const service = this.authService;
    this.authService.getProfile().subscribe(profile => {
      this.praktikanId = profile.user._praktikanId;
      service.getReportOnProgressByPraktikanId(this.praktikanId).subscribe(data=>{
        this.reports = data.report;
        console.log(data.report);
      });
  	},
  	err => {
  		console.log(err);
  		return false;
  	});
  }

}
