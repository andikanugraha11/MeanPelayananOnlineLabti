import { Component } from '@angular/core';
import { ValidationService } from '../../../../../services/validation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../services/auth.service';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
export interface ConfirmModel {
  title: string;
  message: string;
}

@Component({
  selector: 'app-modal-add-pj',
  templateUrl: './modal-add-pj.component.html',
  styleUrls: ['./modal-add-pj.component.css']
})
export class ModalAddPjComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
  title: string;
  message: string;

  npm: String;
  depan: String;
  belakang: String;
  username: String;
  email: String;
  password: String;
  repassword: String;

  constructor(dialogService: DialogService, private router: Router, private validation: ValidationService, private authService: AuthService) {
    super(dialogService);
  }

  addPj() {
    const pj = {
      npm: this.npm,
      nama: {
        depan: this.depan,
        belakang: this.belakang
      },
      username: this.username,
      email: this.email,
      password: this.password
    }

    this.authService.addPj(pj).subscribe(data => {
      if (data.success) {
        this.result = true;
      } else {
        this.result = false;
      }
    });
    this.close();
  }
}
