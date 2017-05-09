import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { PraktikanDashboardComponent } from '../praktikan-dashboard.component';


export interface ConfirmModel {
  title:string;
  message:string;
  praktikum: any;
  pertemuan : any;
}

@Component({
  selector: 'app-modal-detail-praktikum',
  templateUrl: './modal-detail-praktikum.component.html',
  styleUrls: ['./modal-detail-praktikum.component.css']
})
export class ModalDetailPraktikumComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
  title: string;
  message: string;
  praktikum : any;
  pertemuan : any;
  constructor(dialogService: DialogService, private router:Router) {
     super(dialogService);
   }



}
