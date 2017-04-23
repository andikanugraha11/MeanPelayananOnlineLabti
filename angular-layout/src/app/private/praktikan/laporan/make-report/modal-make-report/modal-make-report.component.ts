import { Component } from '@angular/core';
import { ValidationService } from '../../../../../services/validation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../services/auth.service';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
export interface ConfirmModel {
  title:string;
  message:string;
}

@Component({
  selector: 'app-modal-make-report',
  templateUrl: './modal-make-report.component.html',
  styleUrls: ['./modal-make-report.component.css']
})
export class ModalMakeReportComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
  title: string;
  message: string;
  constructor(dialogService: DialogService, private router:Router, private validation:ValidationService, private authService:AuthService) { 
    super(dialogService);
  }
  


}
