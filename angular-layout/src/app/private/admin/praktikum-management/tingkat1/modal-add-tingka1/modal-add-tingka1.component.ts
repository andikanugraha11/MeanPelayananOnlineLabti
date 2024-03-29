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
  selector: 'app-modal-add-tingka1',
  templateUrl: './modal-add-tingka1.component.html',
  styleUrls: ['./modal-add-tingka1.component.css']
})
export class ModalAddTingka1Component extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
  title: string;
  message: string;

  shift: Number = 1;
  shifts: Number[] = [1, 2, 3, 4, 5];
  kelas: String;
  kode_praktikum: String;
  pertemuan1: Number;
  pertemuan2: Number;
  pertemuan3: Number;
  pertemuan4: Number;
  pertemuan5: Number;
  pertemuan6: Number;
  pertemuan7: Number;
  pertemuan8: Number;
  tanggal1: Date;
  tanggal2: Date;
  tanggal3: Date;
  tanggal4: Date;
  tanggal5: Date;
  tanggal6: Date;
  tanggal7: Date;
  tanggal8: Date;
  tampil: Boolean;
  pj: String;
  pjs: Object;
  jlh_pertemuan: Number = 4;
  ruang: String;


  constructor(private flashMessage: FlashMessagesService, dialogService: DialogService, private router: Router, private validation: ValidationService, private authService: AuthService) {
    super(dialogService);
    this.pertemuan1 = 1;
    this.pertemuan2 = 2;
    this.pertemuan3 = 3;
    this.pertemuan4 = 4;
    this.pertemuan5 = undefined;
    this.pertemuan6 = undefined;
    this.pertemuan7 = undefined;
    this.pertemuan8 = undefined;
    this.tampil = false;
    this.authService.getAllPJ().subscribe(data => {
      this.pjs = data.pj;
    },
      err => {
        return false;
      });
  }

  onChangePertemuan(value) {
    if (value == 8) {
      this.tampil = true;
      this.pertemuan1 = 1;
      this.pertemuan2 = 2;
      this.pertemuan3 = 3;
      this.pertemuan4 = 4;
      this.pertemuan5 = 5;
      this.pertemuan6 = 6;
      this.pertemuan7 = 7;
      this.pertemuan8 = 8;
      this.jlh_pertemuan = 8;
    } else {
      this.tampil = false;
      this.pertemuan1 = 1;
      this.pertemuan2 = 2;
      this.pertemuan3 = 3;
      this.pertemuan4 = 4;
      this.pertemuan5 = undefined;
      this.pertemuan6 = undefined;
      this.pertemuan7 = undefined;
      this.pertemuan8 = undefined;
      this.jlh_pertemuan = 4;
    }
  }
  addPraktikumTk1() {
    const kode = this.kode_praktikum;
    let nama_praktikum = "Algoritma & Pemrograman 2 A";
    const praktikum = {
      pertemuan1: this.pertemuan1,
      pertemuan2: this.pertemuan2,
      pertemuan3: this.pertemuan3,
      pertemuan4: this.pertemuan4,
      pertemuan5: this.pertemuan5,
      pertemuan6: this.pertemuan6,
      pertemuan7: this.pertemuan7,
      pertemuan8: this.pertemuan8,
      tanggal1: this.tanggal1,
      tanggal2: this.tanggal2,
      tanggal3: this.tanggal3,
      tanggal4: this.tanggal4,
      tanggal5: this.tanggal5,
      tanggal6: this.tanggal6,
      tanggal7: this.tanggal7,
      tanggal8: this.tanggal8,
      shift: this.shift,
      pj: this.pj,
      kelas: this.kelas,
      nama_praktikum: nama_praktikum,
      kode: kode,
      jlh_pertemuan: this.jlh_pertemuan,
      ruang: this.ruang
    }

    if (this.jlh_pertemuan == 4) {
      if (!this.validation.validateAddPraktikum4(praktikum)) {
        this.flashMessage.show('Data yang anda masukan belum lengkap', {
          cssClass: 'alert-danger',
          timeOut: 3000
        });
        return false;
      }
    } else {
      if (!this.validation.validateAddPraktikum8(praktikum)) {
        this.flashMessage.show('Data yang anda masukan belum lengkap', {
          cssClass: 'alert-danger',
          timeOut: 3000
        });
        return false;
      }
    }

    this.authService.addPraktikumTk1(praktikum).subscribe(data => {
      if (data.success) {
        this.result = true;
      } else {
        this.result = false;
      }
    });
    this.close();
  }
}
