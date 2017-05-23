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
  selector: 'app-modal-add-petugas',
  templateUrl: './modal-add-petugas.component.html',
  styleUrls: ['./modal-add-petugas.component.css']
})
export class ModalAddPetugasComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
  title: string;
  message: string;

  depan: String;
  belakang: String;
  username: String;
  email: String;
  password: String;
  repassword: String;
  emailExist: Boolean = false;
  usernameExist: Boolean = false;
  emailTrue: Boolean = false;
  usernameTrue: Boolean = false;
  constructor(private flashMessage: FlashMessagesService, dialogService: DialogService, private router: Router, private validation: ValidationService, private authService: AuthService) {
    super(dialogService);
  }

  isUsenameTrue(e) {
    let username = this.username.toString();
    const re = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;
    this.usernameTrue = re.test(username);
  }

  isEmailTrue(e) {
    let email = this.email.toString();
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.emailTrue = re.test(email);
  }

  isEmailExist(e) {
    if (this.email != null) {
      this.isEmailTrue(e);
      let email = this.email;
      this.validation.isEmailExist(email).subscribe(data => {
        this.emailExist = data.exist;
      });
    }

  }

  isUsernameExist(e) {
    if (this.username != null) {
      this.isUsenameTrue(e);
      let username = this.username;
      this.validation.isUsernameExist(username).subscribe(data => {
        this.usernameExist = data.exist;
      });
    }

  }


  addPetugas() {
    const petugas = {
      nama: {
        depan: this.depan,
        belakang: this.belakang
      },
      username: this.username,
      email: this.email,
      password: this.password,
      repassword: this.repassword
    }
    if (!this.validation.validateAddPetugas(petugas)) {
      this.flashMessage.show('Data yang anda masukan belum lengkap', {
        cssClass: 'alert-danger',
        timeOut: 3000
      });
      return false;
    }
    if (this.emailExist) {
      this.flashMessage.show('Email sudah terdaftar', {
        cssClass: 'alert-danger',
        timeOut: 3000
      });
      return false;
    }

    if (this.usernameExist) {
      this.flashMessage.show('Nama pengguna sudah terdaftar', {
        cssClass: 'alert-danger',
        timeOut: 3000
      });
      return false;
    }
    if (this.username.length < 6) {
      this.flashMessage.show('Panjang nama pengguna minimal 6 karakter', {
        cssClass: 'alert-danger',
        timeOut: 3000
      });
      return false;
    }

    if (this.password.length < 6) {
      this.flashMessage.show('Panjang kata sandi minimal 6 karakter', {
        cssClass: 'alert-danger',
        timeOut: 3000
      });
      return false;
    }

    if (!this.validation.matchPassword(petugas)) {
      this.flashMessage.show('Kata sandi tidak cocok', {
        cssClass: 'alert-danger',
        timeOut: 3000
      });
      return false;
    }

    if (!this.validation.validateEmail(petugas)) {
      this.flashMessage.show('Email yang anda masukan salah', {
        cssClass: 'alert-danger',
        timeOut: 3000
      });
      return false;
    }

    if (!this.validation.validateUsername(petugas)) {
      this.flashMessage.show('Harap Isi Nama Pengguna Dengan Benar', {
        cssClass: 'alert-danger',
        timeOut: 3000
      });
      return false;
    }

    this.authService.addPetugas(petugas).subscribe(data => {
      if (data.success) {
        this.result = true;
      } else {
        this.result = false;
      }
    });
    this.close();
  }
}
