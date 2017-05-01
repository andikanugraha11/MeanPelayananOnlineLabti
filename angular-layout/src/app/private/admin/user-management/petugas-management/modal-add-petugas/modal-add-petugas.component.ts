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
  selector: 'app-modal-add-petugas',
  templateUrl: './modal-add-petugas.component.html',
  styleUrls: ['./modal-add-petugas.component.css']
})
export class ModalAddPetugasComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
  title: string;
  message: string;
  
  depan : String;
  belakang : String;
  username : String;
  email : String;
  password : String;
  repassword : String;

  constructor(dialogService: DialogService, private router:Router, private validation:ValidationService, private authService:AuthService) {
    super(dialogService);
  }

  addPetugas(){
    const petugas = {
      nama :{
        depan :this.depan,
        belakang : this.belakang
      },
      username : this.username,
      email : this.email,
      password : this.password
    }

    this.authService.addPetugas(petugas).subscribe(data=>{
      if(data.success){
          this.result = data; 
      }else{
        alert('gagal');
        console.log(data.msg);
      }
    });
    this.close();
  }
}
