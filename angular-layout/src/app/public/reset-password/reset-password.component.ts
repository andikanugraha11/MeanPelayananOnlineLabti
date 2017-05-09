import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../services/validation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { default as swal } from 'sweetalert2'

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  email: String;
  resetKey: String;
  password: String;
  repassword: String;
  step1: Boolean = true;
  step2: Boolean = false;
  step3: Boolean = false;
  constructor(private flashMessage: FlashMessagesService, private router: Router, private validation: ValidationService, private authService: AuthService) {
  }

  ngOnInit() {

  }

  sendKey() {
    const data = {
      email: this.email
    }
    if (!this.validation.resendAndReset(data)) {
      this.flashMessage.show('Harap isi email', {
        cssClass: 'alert-danger',
        timeOut: 3000
      });
      return false;
    }
    if (!this.validation.validateEmail(data)) {
      this.flashMessage.show('Harap isi email dengan benar', {
        cssClass: 'alert-danger',
        timeOut: 3000
      });
      return false;
    }
    this.authService.sendKey(data).subscribe(data => {
      if (data.success == false) {
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeOut: 3000
        });
        return false;
      }
      if (data.success) {
        swal(
          'Kode verifikasi telah dikirim',
          'Silahkan buka tautan pada email anda, periksa folder spam apabila tautan tidak ditemukan',
          'info'
        ).then(() => {
          this.step1 = false;
          this.step2 = true;
          this.step3 = false;
        })
      }
    });

  }

  keyCheck() {
    const data = {
      email: this.email.toLowerCase(),
      resetKey: this.resetKey
    }
    if (!this.validation.keyPassword(data)) {
      this.flashMessage.show('Harap mengisi kunci', {
        cssClass: 'alert-danger',
        timeOut: 3000
      });
      return false;
    }
    this.authService.keyCheck(data).subscribe(data => {
      if (data.success) {
        this.step1 = false;
        this.step2 = false;
        this.step3 = true;
      } else {
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeOut: 3000
        });
        return false;
      }
    });
  }

  reset() {
    const data = {
      email: this.email.toLowerCase(),
      resetKey: this.resetKey,
      password: this.password,
      repassword: this.repassword
    }
    if (!this.validation.resetStep(data)) {
      this.flashMessage.show('Harap isi data dengan lengkap', {
        cssClass: 'alert-danger',
        timeOut: 3000
      });
      return false;
    }

    if (!this.validation.matchPassword(data)) {
      this.flashMessage.show('Password tidak sama', {
        cssClass: 'alert-danger',
        timeOut: 3000
      });
      return false;
    }
    this.authService.resetPasswordByKey(data).subscribe(data => {
      if (data.success) {
        swal(
          'berhasil',
          data.msg,
          'success'
        ).then(() => {
          this.router.navigate(["/"]);
        })
      } else {
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeOut: 3000
        });
        return false;
      }
    });
  }

}
