import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ValidationService } from '../../../../services/validation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-make-report',
  templateUrl: './make-report.component.html',
  styleUrls: ['./make-report.component.css']
})
export class MakeReportComponent implements OnInit {

  praktikanId: String;
  reports : Object;
  constructor(private route:ActivatedRoute,private authService:AuthService, private router:Router) { }

  ngOnInit() {

    //console.log(idPraktikan);
    const service = this.authService;
    this.authService.getProfile().subscribe(profile => {
      this.praktikanId = profile.user._praktikanId;
      service.getReportByPraktikanId(this.praktikanId).subscribe(data=>{
        this.reports = data.report;
        console.log(data.report);
      });
  	},
  	err => {
  		console.log(err);
  		return false;
  	});

    // this.authService.getReportByPraktikanId(idPraktikan).subscribe(data=>{
    //   console.log(data);
    // });
  }

}
