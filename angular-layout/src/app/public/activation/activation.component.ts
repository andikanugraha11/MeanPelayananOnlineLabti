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
  username: String;
  email: String;
  password: String;
  rePassword: String;
  dataPraktikan: any;
  findSection: Boolean;
  completeSection: Boolean;
  _praktikanId: String;

  constructor(private flashMessage: FlashMessagesService, private router: Router, private validation: ValidationService, private authService: AuthService) {
  }

  ngOnInit() {
    this.findSection = true;
    this.completeSection = false;
  }


  findPraktikan() {
    const praktikan = {
      kelas: this.kelas.toUpperCase(),
      npm: this.npm.toUpperCase()
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
      _praktikanId: this.dataPraktikan.praktikan._id,
      username: this.username,
      email: this.email,
      password: this.password,
      npm: this.npm,
      firstName: this.dataPraktikan.praktikan.nama.depan,
      lastName: this.dataPraktikan.praktikan.nama.belakang
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
