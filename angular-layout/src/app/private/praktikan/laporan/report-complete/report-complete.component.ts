import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ValidationService } from '../../../../services/validation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-report-complete',
  templateUrl: './report-complete.component.html',
  styleUrls: ['./report-complete.component.css']
})
export class ReportCompleteComponent implements OnInit {

praktikanId: String;
  reports : Object;
  reportAvailable: Boolean =false;
  constructor(private route:ActivatedRoute,private authService:AuthService, private router:Router) { }

  ngOnInit() {
    const service = this.authService;
    this.authService.getProfile().subscribe(profile => {
      this.praktikanId = profile.user._praktikanId;
      service.getReportCompleteByPraktikanId(this.praktikanId).subscribe(data=>{
        this.reports = data.report;
        if(data.report.length > 0){
          this.reportAvailable = true;
        }
      });
  	},
  	err => {
  		console.log(err);
  		return false;
  	});
  }

}
