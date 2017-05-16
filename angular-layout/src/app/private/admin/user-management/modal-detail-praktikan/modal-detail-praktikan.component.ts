import { Component } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidationService } from '../../../../services/validation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { default as swal } from 'sweetalert2'
export interface ConfirmModel {
  title: string;
  message: string;
  praktikan: any;
  // idPraktikan:String;
}


@Component({
  selector: 'app-modal-detail-praktikan',
  templateUrl: './modal-detail-praktikan.component.html',
  styleUrls: ['./modal-detail-praktikan.component.css']
})
export class ModalDetailPraktikanComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
  title: string;
  message: string;
  praktikan: any;
  // idPraktikan:any;

  constructor(dialogService: DialogService, private router: Router, private validation: ValidationService, private authService: AuthService, private flashMessage: FlashMessagesService) {
    super(dialogService);
  }

  resetPassword(id) {
    const service = this.authService;
    swal({
      title: 'Reset password praktikan',
      text: "Set password praktikan menjadi NPM",
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya',
      cancelButtonText: 'Tidak',
    }).then(() => {
      swal(
        'Berhasil!',
        'Password praktikan sudah di reset',
        'success'
      )
      this.authService.getPraktikanById(id).subscribe(data => {
        const dataUpdate = {
          npm: data.praktikan.npm,
          id
        }
        service.setPasswordToNpm(dataUpdate).subscribe(data => {
          //console.log(data);
        });
        //console.log(npm);
      });

    });
    

  }

}
