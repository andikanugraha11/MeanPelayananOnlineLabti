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
  selector: 'app-modal-add-tingka4',
  templateUrl: './modal-add-tingka4.component.html',
  styleUrls: ['./modal-add-tingka4.component.css']
})
export class ModalAddTingka4Component extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
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
  jlh_pertemuan: Number;
  ruang: String;


  constructor(dialogService: DialogService, private router: Router, private validation: ValidationService, private authService: AuthService) {
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
      console.log(this.pjs);
    },
      err => {
        console.log(err);
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
    }
  }
  addPraktikumTk4() {
    const kode = this.kode_praktikum;
    let nama_praktikum;

    switch (kode) {
      case "AK-045209":
        nama_praktikum = "Jaringan Komputer Lanjut";
        break;
      case "AK-045214":
        nama_praktikum = "Pemrograman Jaringan";
        break;
      case "AK-045216":
        nama_praktikum = "Pemrograman WEB";
        break;
      case "AK-045227":
        nama_praktikum = "Rekayasa Perangkat Lunak 2";
        break;
      case "AK-045232":
        nama_praktikum = "Sistem Multimedia";
        break;
    }
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
      jlh_pertemuan: this.jlh_pertemuan,
      kode: kode,
      ruang: this.ruang
    }

    this.authService.addPraktikumTk4(praktikum).subscribe(data => {
      if (data.success) {
        this.result = true;
      } else {
        this.result = false;
      }
    });
    this.close();
  }
}
