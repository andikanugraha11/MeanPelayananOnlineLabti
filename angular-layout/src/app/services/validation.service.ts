import { Injectable } from '@angular/core';

@Injectable()
export class ValidationService {

  constructor() { }

  matchPassword(data) {
    if (data.password != data.repassword) {
      return false;
    } else {
      return true;
    }
  }
  validateEmail(data) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(data.email);
  }

  resendAndReset(data){
    if (data.email == undefined) {
      return false;
    } else {
      return true;
    }
  }

  keyPassword(data){
    if (data.resetKey == undefined) {
      return false;
    } else {
      return true;
    }
  }

  resetStep(data){
    if (data.password == undefined || data.repassword == undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateLogin(user) {
    if (user.username == undefined || user.password == undefined) {
      return false;
    } else {
      return true;
    }
  }
  

  validateActivation(praktikan) {
    if (praktikan.npm == undefined || praktikan.kelas == undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateActivationStep2(praktikan) {
    if (praktikan.username == undefined || praktikan.email == undefined || praktikan.password == undefined || praktikan.repassword == undefined) {
      return false;
    } else {
      return true;
    }
  }


  validateAddPraktikan(praktikan) {
    if (praktikan.npm == undefined || praktikan.kelas == undefined || praktikan.nama.depan == undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateAddPj(data) {
    if (data.npm == undefined || data.nama.depan == undefined || data.username == undefined || data.email == undefined || data.password == undefined || data.repassword == undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateAddPetugas(data) {
    if (data.nama.depan == undefined || data.username == undefined || data.email == undefined || data.password == undefined || data.repassword == undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateAddPraktikum4(data) {
    if(data.tanggal1 == undefined || data.tanggal2 == undefined || data.tanggal3 == undefined || data.tanggal4 == undefined || data.shift == undefined || data.pj == undefined || data.nama_praktikum == undefined || data.kode == undefined || data.jlh_pertemuan == undefined || data.ruang == undefined ){
      return false;
    }else{
      return true;
    }
  }

  validateAddPraktikum8(data) {
    if(data.tanggal1 == undefined || data.tanggal2 == undefined || data.tanggal3 == undefined || data.tanggal4 == undefined || data.tanggal5 == undefined || data.tanggal6 == undefined || data.tanggal7 == undefined || data.tanggal8 == undefined || data.shift == undefined || data.pj == undefined || data.nama_praktikum == undefined || data.kode == undefined || data.jlh_pertemuan == undefined || data.ruang == undefined ){
      return false;
    }else{
      return true;
    }
  }

  validateMakeReport(data){
    if(data.keterangan == undefined || data.pengganti == undefined){
      return false;
    }else{
      return true;
    }
  }

}
