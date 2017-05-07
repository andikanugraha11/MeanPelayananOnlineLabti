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
  selector: 'app-modal-add-upload-praktikan',
  templateUrl: './modal-add-upload-praktikan.component.html',
  styleUrls: ['./modal-add-upload-praktikan.component.css']
})
export class ModalAddUploadPraktikanComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
  title: string;
  message: string;

  dataMahasiswa: File;
  fileName : string;
  constructor(dialogService: DialogService, private router: Router, private validation: ValidationService, private authService: AuthService, private flashMessage: FlashMessagesService) {
    super(dialogService);
  }

  getFiles(event) {
    this.dataMahasiswa = event.target.files;
    this.fileName = this.dataMahasiswa[0].name;
  }
  uploadPraktikan() {
    
    const files = this.dataMahasiswa;

    
    
    this.authService.uploadCsv(files).subscribe(data =>{

    });


    // if(!this.validation.validateAddPraktikan(praktikan)){
    //   this.flashMessage.show('Data yang anda masukan belum lengkap',{
    //     cssClass : 'alert-danger',
    //     timeOut : 3000
    //   });
    //   return false;
    // }

    // this.authService.uploadPraktikan(data).subscribe(data => {
    //   if (data.success) {
    //     this.result = true;
    //   } else {
    //     this.result = false;
    //   }
    //   this.close();
    // });



  }
}
