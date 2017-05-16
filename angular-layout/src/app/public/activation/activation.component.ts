import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../services/validation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { default as swal } from 'sweetalert2'

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css']
})
export class ActivationComponent implements OnInit {

  npm: String;
  kelas: String;
  username: String = null;
  email: String = null;
  password: String = null;
  rePassword: String = null;
  dataPraktikan: any;
  findSection: Boolean;
  completeSection: Boolean;
  _praktikanId: String;
  usernameExist: Boolean;
  emailExist: Boolean;
  passwordLength: Number;

  constructor(private flashMessage: FlashMessagesService, private router: Router, private validation: ValidationService, private authService: AuthService) {
  }

  ngOnInit() {
    this.findSection = true;
    this.completeSection = false;
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

  isEmailExist(e) {
    if (this.email != null) {
      let email = this.email;
      // console.log(email);
      this.validation.isEmailExist(email).subscribe(data => {
        this.emailExist = data.exist;
      });
    }

  }



  findPraktikan() {
    const praktikan = {
      kelas: this.kelas,
      npm: this.npm
    }

    //Validation

    if (!this.validation.validateActivation(praktikan)) {
      this.flashMessage.show('Data yang anda masukan belum lengkap', {
        cssClass: 'alert-danger',
        timeOut: 3000
      });
      return false;
    }

    this.authService.getPraktikanByNpmAndKelas(praktikan).subscribe(data => {
      if (data.success) {
        this.activationPraktikan();
        this.dataPraktikan = data;
      } else {
        this.flashMessage.show('Data yang anda cari tidak ditemukan', {
          cssClass: 'alert-danger',
          timeOut: 3000
        });
        return false;
      }
    });
  }

  activationPraktikan() {
    this.findSection = false;
    this.completeSection = true;
  }

  completeData() {
    const praktikan = {
      repassword: this.rePassword,
      _praktikanId: this.dataPraktikan.praktikan._id,
      username: this.username,
      email: this.email,
      password: this.password,
      npm: this.npm,
      firstName: this.dataPraktikan.praktikan.nama.depan,
      lastName: this.dataPraktikan.praktikan.nama.belakang
    }

    
    if (!this.validation.validateActivationStep2(praktikan)) {
      this.flashMessage.show('Data yang anda masukan belum lengkap', {
        cssClass: 'alert-danger',
        timeOut: 3000
      });
      return false;
    }
    if(!this.validation.minPassword(praktikan)){
      this.flashMessage.show('Kata Sandi Minimal 6 Karakter', {
        cssClass: 'alert-danger',
        timeOut: 3000
      });
      return false;
    }
    if(!this.validation.minUsername(praktikan)){
      this.flashMessage.show('Nama Pengguna 6 Karakter', {
        cssClass: 'alert-danger',
        timeOut: 3000
      });
      return false;
    }
    if (!this.validation.matchPassword(praktikan)) {
      this.flashMessage.show('Kata Sandi tidak sama', {
        cssClass: 'alert-danger',
        timeOut: 3000
      });
      return false;
    }

    if (!this.validation.validateEmail(praktikan)) {
      this.flashMessage.show('Harap Isi Email Dengan Benar', {
        cssClass: 'alert-danger',
        timeOut: 3000
      });
      return false;
    }

    if (this.usernameExist) {
      this.flashMessage.show('Nama Pengguna Sudah Digunakan', {
        cssClass: 'alert-danger',
        timeOut: 3000
      });
      return false;
    }
    if (this.emailExist) {
      this.flashMessage.show('Email Sudah Digunakan', {
        cssClass: 'alert-danger',
        timeOut: 3000
      });
      return false;
    }

    this.authService.userRegister(praktikan).subscribe(data => {
      if (data.success) {
        swal(
          'Konfirmasi berhasil',
          'Silahkan buka tautan pada email anda, periksa folder spam apabila tautan tidak ditemukan',
          'success'
        ).then(() => {
          this.router.navigate(["/"]);
        })
      } else {
        swal(
          'Konfirmasi gagal',
          'Silahkan coba kembali dengan email dan username yang belum pernah digunakan',
          'error'
        )
      }
    });

  }
}
