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
  constructor(dialogService: DialogService, private router: Router, private validation: ValidationService, private authService: AuthService, private flashMessage : FlashMessagesService) {
    super(dialogService);
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
