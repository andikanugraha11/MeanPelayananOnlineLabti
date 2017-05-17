import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../services/validation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subject } from 'rxjs/Rx';
import { FlashMessagesService } from 'angular2-flash-messages';
import { default as swal } from 'sweetalert2'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  confirmation: Boolean = true;
  password: String;
  newpassword: String
  renewpassword: String;
  userData: any;

  constructor(private validation: ValidationService, private flashMessage: FlashMessagesService, private authService: AuthService, private router: Router) { }

  ngOnInit() {

    this.authService.getProfile().subscribe(profile => {
      this.userData = profile.user;
    })
  }

  checkPassword() {
    const data = {
      realPassword: this.userData.password,
      inputPassword: this.password
    }
    if (!this.validation.oldPassword(data)) {
      this.flashMessage.show('Harap Mengisi Kata Sandi Anda', {
        cssClass: 'alert-danger',
        timeOut: 3000
      });
      return false;
    }

    this.authService.cekPassword(data).subscribe(data => {
      if (data.success) {
        this.confirmation = false;
      } else {
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeOut: 3000
        });
        return false;
      }
    });

  }

  updatePassword() {
    const data = {
      userId: this.userData._id,
      password: this.newpassword,
      repassword : this.renewpassword
    }

    if (!this.validation.accountNewPassowrd(data)) {
      this.flashMessage.show('Data Belum Lengkap', {
        cssClass: 'alert-danger',
        timeOut: 3000
      });
      return false;
    }
    
    if (!this.validation.matchPassword(data)) {
      this.flashMessage.show('Kata Sandi Tidak Cocok', {
        cssClass: 'alert-danger',
        timeOut: 3000
      });
      return false;
    }

    

    if (!this.validation.minPassword(data)) {
      this.flashMessage.show('Kata Sandi Minimal 6 Karakter', {
        cssClass: 'alert-danger',
        timeOut: 3000
      });
      return false;
    }

    this.authService.changePassword(data).subscribe(data => {
      if (data.success) {
        swal(
          'Berhasil',
          data.msg,
          'success'
        ).then(() => {
          this.router.navigate(["/dashboard"]);
        })
      } else {
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeOut: 3000
        });
        return false;

      }
    })
  }

}
