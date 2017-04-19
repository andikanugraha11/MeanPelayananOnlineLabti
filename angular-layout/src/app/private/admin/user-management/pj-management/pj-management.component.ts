import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../../../services/validation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { DialogService } from "ng2-bootstrap-modal";
import { ModalAddPjComponent } from './modal-add-pj/modal-add-pj.component';

@Component({
  selector: 'app-pj-management',
  templateUrl: './pj-management.component.html',
  styleUrls: ['./pj-management.component.css']
})
export class PjManagementComponent implements OnInit {

  data:Object;
  constructor(private authService:AuthService, private router:Router, private dialogService:DialogService) { }

  ngOnInit() {
    this.authService.getAllPJ().subscribe(data => {
      this.data = data.pj;
      console.log(this.data);
    },
    err => {
      console.log(err);
      return false;
    });
  }

    showConfirm() {
        let disposable = this.dialogService.addDialog(ModalAddPjComponent, {
            title:'Confirm title', 
            message:'Confirm message'})
            .subscribe((data)=>{
                //We get dialog result
                if(data) {
                    alert('Sukses');
                }
            });
    }

      removePJ(id){
    this.authService.removePJ(id).subscribe(data=>{
      if(data.success){
        console.log('Berhasil');
      }
    })
  }

}
