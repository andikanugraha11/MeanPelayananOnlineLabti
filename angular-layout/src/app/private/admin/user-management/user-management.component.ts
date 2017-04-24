import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../../services/validation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { DialogService } from "ng2-bootstrap-modal";
import { ModalAddPraktikanComponent } from './modal-add-praktikan/modal-add-praktikan.component';


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  
  data : Object;
  praktikums : Object;
  constructor(private authService:AuthService, private router:Router, private dialogService:DialogService) {
    
  }

  ngOnInit() {
    this.authService.getAllPraktikan().subscribe(data => {
      this.data = data.praktikan;
      //this.praktikums =  data.praktikan._praktikumId;
      console.log(this.data);
      //console.log(this.praktikums)
    },
    err => {
      console.log(err);
      return false;
    });
  }

  resetPassword(id){
    const service = this.authService;
    this.authService.getPraktikanById(id).subscribe(data=>{
      const dataUpdate = {
        npm : data.praktikan.npm,
        id
      }
      service.setPasswordToNpm(dataUpdate).subscribe(data=>{
        console.log(data);
      });
      //console.log(npm);
    });
  }

  addPraktikan() {
        let disposable = this.dialogService.addDialog(ModalAddPraktikanComponent, {
            title:'Confirm title', 
            message:'Confirm message'})
            .subscribe((data)=>{
                if(data) {
                    alert('Sukses');
                }
            });
    }

  removePraktikan(id){
    this.authService.removePraktikan(id).subscribe(data=>{
      if(data.success){
        console.log('Berhasil');
      }
    })
  }
}
