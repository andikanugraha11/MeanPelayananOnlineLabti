import { Component } from '@angular/core';
import { ValidationService } from '../../../../../services/validation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../services/auth.service';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
export interface ConfirmModel {
  title: string;
  message: string;
  dataTersedia: any;
  reportId: string;
}

@Component({
  selector: 'app-modal-make-report',
  templateUrl: './modal-make-report.component.html',
  styleUrls: ['./modal-make-report.component.css']
})
export class ModalMakeReportComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
  title: string;
  message: string;
  dataTersedia: any;
  reportId: string;
  keterangan: String;
  pengganti: String;
  constructor(dialogService: DialogService, private router: Router, private validation: ValidationService, private authService: AuthService) {
    super(dialogService);
    // console.log(this.data);
  }

  updateReport() {
    const report = {
      keterangan: this.keterangan,
      pengganti: this.pengganti,
      reportId: this.reportId
    }
    // console.log(report);
    this.authService.praktikanDoReport(report).subscribe(data => {
      if (data.success) {
        this.result = true;
      } else {
        this.result = false;
      }
    });
    this.close();
    //console.log(update);
  }



}
