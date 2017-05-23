import { Component } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidationService } from '../../../../services/validation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
export interface ConfirmModel {
  title: string;
  message: string;
}

@Component({
  selector: 'app-modal-add-praktikan',
  templateUrl: './modal-add-praktikan.component.html',
  styleUrls: ['./modal-add-praktikan.component.css']
})
export class ModalAddPraktikanComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
  title: string;
  message: string;

  npm: String;
  kelas: String;
  depan: String;
  belakang: String;
  npmExist: Boolean = false;
  constructor(dialogService: DialogService, private router: Router, private validation: ValidationService, private authService: AuthService, private flashMessage : FlashMessagesService) {
    super(dialogService);
  }

  isNpmExist(e) {
    if (this.npm != null) {
      let npm = this.npm;
      this.validation.isNpmExist(npm).subscribe(data => {
        this.npmExist = data.exist;
      });
    }

  }

  addPraktikan() {
    const praktikan = {
      npm: this.npm,
      kelas: this.kelas,
      nama: {
        depan: this.depan,
        belakang: this.belakang
      }
    }

    if(!this.validation.validateAddPraktikan(praktikan)){
      this.flashMessage.show('Data yang anda masukan belum lengkap',{
        cssClass : 'alert-danger',
        timeOut : 3000
      });
      return false;
    }

    if(this.npm.length != 8){
      this.flashMessage.show('Panjang NPM Harus 8',{
        cssClass : 'alert-danger',
        timeOut : 3000
      });
      return false;
    }

    if(this.kelas.length != 5){
      this.flashMessage.show('Panjang Kelas Harus 5',{
        cssClass : 'alert-danger',
        timeOut : 3000
      });
      return false;
    }

    if(this.npmExist){
      this.flashMessage.show('NPM Sudah Terdaftar Sebelumnya',{
        cssClass : 'alert-danger',
        timeOut : 3000
      });
      return false;
    }

    this.authService.addPraktikan(praktikan).subscribe(data => {
      if (data.success) {
        this.result = true;
      } else {
        this.result = false;
      }
      this.close();
    });
  }
}
