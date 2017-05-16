import { Component } from '@angular/core';
import { ValidationService } from '../../../../../services/validation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../services/auth.service';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { FlashMessagesService } from 'angular2-flash-messages';
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
  emailExist:Boolean = false;
  usernameExist:Boolean = false;

  constructor(private flashMessage: FlashMessagesService, dialogService: DialogService, private router: Router, private validation: ValidationService, private authService: AuthService) {
    super(dialogService);
  }

  isEmailExist(e) {
    if (this.email != null) {
      let email = this.email;
      //console.log(username);
      this.validation.isEmailExist(email).subscribe(data => {
        this.emailExist = data.exist;
      });
    }

  }

  isUsernameExist(e) {
    if (this.username != null) {
      let username = this.username;
      //console.log(username);
      this.validation.isUsernameExist(username).subscribe(data => {
        this.usernameExist = data.exist;
      });
    }

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
      password: this.password,
      repassword: this.repassword
    }
    if (!this.validation.validateAddPj(pj)) {
      this.flashMessage.show('Data yang anda masukan belum lengkap', {
        cssClass: 'alert-danger',
        timeOut: 3000
      });
      return false;
    }
    if (this.emailExist) {
      this.flashMessage.show('Email Sudah Terdaftar', {
        cssClass: 'alert-danger',
        timeOut: 3000
      });
      return false;
    }

    if (this.usernameExist) {
      this.flashMessage.show('Nama Pengguna Sudah Terdaftar', {
        cssClass: 'alert-danger',
        timeOut: 3000
      });
      return false;
    }

    if (this.username.length < 6) {
      this.flashMessage.show('Panjang Nama Pengguna Minimal 6 Karakter', {
        cssClass: 'alert-danger',
        timeOut: 3000
      });
      return false;
    }
    
    if (this.password.length < 6) {
      this.flashMessage.show('Panjang Kata Sandi Minimal 6 Karakter', {
        cssClass: 'alert-danger',
        timeOut: 3000
      });
      return false;
    }

    if (!this.validation.matchPassword(pj)) {
      this.flashMessage.show('Kata Sandi Tidak Cocok', {
        cssClass: 'alert-danger',
        timeOut: 3000
      });
      return false;
    }

    if (!this.validation.validateEmail(pj)) {
      this.flashMessage.show('Email yang anda masukan salah', {
        cssClass: 'alert-danger',
        timeOut: 3000
      });
      return false;
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
