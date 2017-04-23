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
  tanggalBuat : Date;
  constructor(private dialogService:DialogService, private route:ActivatedRoute,private authService:AuthService, private router:Router) { }

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

  makeReport(reportId){
    console.log(reportId);
    const service = this.authService;
    this.authService.getReportById(reportId).subscribe(data=>{
      this.tanggalBuat = data.report.tanggal_buat;
      const praktikumCode = data.report.kode_praktikum;
      service.getDetailPraktikumAvailable(this.tanggalBuat , praktikumCode).subscribe(data=>{

      });
      //this.tanggalBuat
    });
 
    let disposable = this.dialogService.addDialog(ModalMakeReportComponent, {
          title:'Confirm title', 
          message:'Confirm message'
        })
        .subscribe((data)=>{
            if(data) {
                alert('Sukses');
            }
        });
    }
  }