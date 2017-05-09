import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../../services/validation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Subject } from 'rxjs/Rx';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-praktikan-dashboard',
  templateUrl: './praktikan-dashboard.component.html',
  styleUrls: ['./praktikan-dashboard.component.css']
})
export class PraktikanDashboardComponent implements OnInit {

  peringatan: Boolean = false;
  dibuat: Number;
  proses: Number;
  selesai: Number;
  userData:any;
  praktikumData:any;
  constructor(private flashMessage: FlashMessagesService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    const service = this.authService;
    this.authService.getProfile().subscribe(profile => {
      this.userData = profile.user;
      const praktikanId = this.userData._praktikanId;
      //console.log(praktikanId);
      service.getReportByPraktikanId(praktikanId).subscribe(data=>{
        //console.log(data);
        this.dibuat = data.report.length;
        if(this.dibuat > 0){
          this.peringatan = true;
        }
      });
      service.getReportOnProgressByPraktikanId(praktikanId).subscribe(data=>{
        this.proses = data.report.length;
      });
      service.getReportCompleteByPraktikanId(praktikanId).subscribe(data=>{
        this.selesai = data.report.length;
      });
      this.authService.getPraktikanByIdPopulate(praktikanId).subscribe(data=>{
        this.praktikumData = data.data._praktikumId;
        console.log(this.praktikumData)
      });
    })
  }

}
