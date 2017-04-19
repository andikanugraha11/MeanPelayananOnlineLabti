import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../../../services/validation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { DialogService } from "ng2-bootstrap-modal";
import { ModalAddPetugasComponent } from './modal-add-petugas/modal-add-petugas.component';

@Component({
  selector: 'app-petugas-management',
  templateUrl: './petugas-management.component.html',
  styleUrls: ['./petugas-management.component.css']
})

export class PetugasManagementComponent implements OnInit {
    data:Object;
    constructor(private authService:AuthService, private router:Router, private dialogService:DialogService) { }
    
    ngOnInit() {
        this.authService.getAllPetugas().subscribe(data => {
            this.data = data.petugas;
            console.log(this.data);
        },
        err => {
            console.log(err);
            return false;
        });
  }
    showConfirm() {
        let disposable = this.dialogService.addDialog(ModalAddPetugasComponent, {
            title:'Confirm title', 
            message:'Confirm message'})
            .subscribe((data)=>{
                //We get dialog result
                if(data) {
                    alert('Sukses');
                }
            });
        //We can close dialog calling disposable.unsubscribe();
        //If dialog was not closed manually close it by timeout
        // setTimeout(()=>{
        //     disposable.unsubscribe();
        // },10000);
    }
    
    removePetugas(id){
    this.authService.removePetugas(id).subscribe(data=>{
      if(data.success){
        console.log('Berhasil');
      }
    })
  }
}