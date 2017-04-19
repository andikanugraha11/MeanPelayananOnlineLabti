import { Component } from '@angular/core';
import { ValidationService } from '../../../../../services/validation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../services/auth.service';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { Tingkat2Component } from '../tingkat2.component';

export interface ConfirmModel {
  title:string;
  message:string;
  praktikum: any;
  pertemuan : any;
}

@Component({
  selector: 'app-modal-detail-tingkat2',
  templateUrl: './modal-detail-tingkat2.component.html',
  styleUrls: ['./modal-detail-tingkat2.component.css']
})

export class ModalDetailTingkat2Component extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
  title: string;
  message: string;
  praktikum : any;
  pertemuan : any;
  constructor(dialogService: DialogService, private router:Router, private validation:ValidationService, private authService:AuthService) {
     super(dialogService);
   }



}