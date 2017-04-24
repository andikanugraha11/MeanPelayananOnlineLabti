import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ValidationService } from '../../../../services/validation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { DialogService } from "ng2-bootstrap-modal";
import { ModalMakeReportComponent } from './modal-make-report/modal-make-report.component';

@Component({
  selector: 'app-make-report',
  templateUrl: './make-report.component.html',
  styleUrls: ['./make-report.component.css']
})
export class MakeReportComponent implements OnInit {

  praktikanId: String;
  reports : Object;
  praktikumDate : Date;
  // praktikumTersedia : object;
  constructor(private dialogService:DialogService, private route:ActivatedRoute,private authService:AuthService, private router:Router) { }

  ngOnInit() { 
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
  }

  makeReport(reportId){
    const service = this.authService;
    this.authService.getReportById(reportId).subscribe(data=>{
      this.praktikumDate = data.report.tanggal;
      const praktikumCode = data.report.kode_praktikum;
      //const idPraktikum = data.report._praktikumId;
      service.getDetailPraktikumAvailable(this.praktikumDate, praktikumCode)
      .subscribe(data=>{
        if(data.success){
          console.log(data.available);
          let disposable = this.dialogService.addDialog(ModalMakeReportComponent, {
            title:'Confirm title', 
            message:'Confirm message',
            dataTersedia: data.available,
            reportId : reportId
          });
        }
        
      });
      //this.tanggalBuat
    });
 

    }
  }