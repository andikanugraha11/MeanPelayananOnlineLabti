import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../../../services/validation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { DialogService } from "ng2-bootstrap-modal";
import { ModalAddTingka2Component } from './modal-add-tingka2/modal-add-tingka2.component';
import { ModalDetailTingkat2Component } from './modal-detail-tingkat2/modal-detail-tingkat2.component'

@Component({
  selector: 'app-tingkat2',
  templateUrl: './tingkat2.component.html',
  styleUrls: ['./tingkat2.component.css']
})
export class Tingkat2Component implements OnInit {

    praktikums : Object;
  constructor(private authService:AuthService, private router:Router, private dialogService:DialogService) { }

  ngOnInit() {
      this.authService.getAllPraktikumTk2().subscribe(data => {
          this.praktikums = data.praktikum;
          console.log(this.praktikums);
        },
        err => {
            console.log(err);
            return false;
        });
  }

  showDetail(idPraktikum){
      this.authService.getPraktikumById(idPraktikum)
      .subscribe(data =>{
          if(data.success){
              console.log(data.praktikum._detailId);
              let detail = this.dialogService.addDialog(ModalDetailTingkat2Component, {
                  title : 'Detail Praktikum',
                  message : 'Detai message',
                  praktikum  : data.praktikum,
                  pertemuan : data.praktikum._detailId
                });
          }
        });
  }

  showAdd() {
      let disposable = this.dialogService.addDialog(ModalAddTingka2Component, {
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
