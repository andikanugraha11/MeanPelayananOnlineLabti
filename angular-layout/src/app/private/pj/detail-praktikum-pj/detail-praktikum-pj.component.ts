import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ValidationService } from '../../../services/validation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToasterService } from 'angular2-toaster';
import { default as swal } from 'sweetalert2'

@Component({
  selector: 'app-detail-praktikum-pj',
  templateUrl: './detail-praktikum-pj.component.html',
  styleUrls: ['./detail-praktikum-pj.component.css']
})
export class DetailPraktikumPjComponent implements OnInit {
  praktikum : any;
  details: Object;
  detailPertemuan: String;
  praktikans: Object;
  tambahans: Object;
  flag: Boolean = false;
  dataPraktikum: any; //testing
  pjId: String;
  jlhPertemuan: Number;
  searchByName: String = "";
  searchByNpm: String = "";
  constructor(private toasterService: ToasterService, private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    const idPraktikum = this.route.snapshot.params['id_praktikum'];
    this.authService.getPraktikumById(idPraktikum).subscribe(data => {
      this.praktikum = data.praktikum;
      this.details = data.praktikum._detailId;
    },
      err => {
        console.log(err);
        return false;
      });

    //get login userid
    this.authService.getProfile().subscribe(profile => {
      this.pjId = profile.user._pjId
    },
      err => {
        console.log(err);
        return false;
      });
  }

  onChangePertemuan() {
    this.flag = true;
    let idDetail = this.detailPertemuan;
    const service = this.authService;
    this.authService.getPraktikumDetailById(idDetail).subscribe(data => {
      this.praktikans = data.praktikum.praktikan;
      this.tambahans = data.praktikum.praktikan_tambahan;
      this.dataPraktikum = data.praktikum;
      this.jlhPertemuan = data.praktikum._praktikumId._detailId.length;

    },
      err => {
        console.log(err);
        return false;
      });
  }

  makeReport(idPraktikan) {
    const service = this.authService;
    this.authService.getReportPraktikan(idPraktikan, this.dataPraktikum._praktikumId._id).subscribe(data => {
      const jlhReport = data.report.length;
      if (this.jlhPertemuan == 8) {
        if (jlhReport >= 2) {
          swal({
            title: 'Praktikan Melebihi Batas Ketidak Hadiran!',
            text: "Praktikan akan di hapus dari praktikum : " + this.dataPraktikum._praktikumId.nama_praktikum,
            type: 'error',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak',
          }).then(() => {

            const dataPraktikan = {
              idPraktikan: idPraktikan,
              idPraktikum: this.dataPraktikum._praktikumId._id
            }
            service.deletePraktikanFromPraktikum(dataPraktikan).subscribe(data => {
              if (data.success) {
                swal(
                  'Terhapus!',
                  'Praktikan telah dikeluarkan dari praktikum ' + this.dataPraktikum._praktikumId.nama_praktikum,
                  'success'
                )
                //alert('Praktikan di delete karena telah melebihi batas tidak masuk');
                let idDetail = this.detailPertemuan;
                //let jlhPertemuan;
                //const service = this.authService;
                this.authService.getPraktikumDetailById(idDetail).subscribe(data => {
                  this.praktikans = data.praktikum.praktikan;
                  this.tambahans = data.praktikum.praktikan_tambahan;
                  this.dataPraktikum = data.praktikum;
                  this.jlhPertemuan = data.praktikum._praktikumId._detailId.length;

                  //service.countReportPraktikan()
                  //console.log(this.dataPraktikum);

                });
              } else {
                this.toasterService.pop('error', 'Gagal', 'Form lamporan gagal dibuat');
                //alert('gagal');
              }
              //console.log(data);
            });



          });
        } else {
          swal({
            title: 'Apakah praktikan yang bersangkutan tidak menghadiri praktikan?',
            text: "Buat form laporan untuk praktikan yang bersangkutan",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak',
          }).then(() => {

            let idPembuat = this.pjId;
            const report = {
              idPraktikan: idPraktikan,
              detailPraktikum: this.dataPraktikum._id,
              kode_praktikum: this.dataPraktikum.kode_praktikum,
              idPraktikum: this.dataPraktikum._praktikumId._id,
              idPembuat: idPembuat,
              tanggal: this.dataPraktikum.tanggal,
            }
            service.makeReport(report).subscribe(data => {
              if (data.success) {
                swal(
                  'Berhasil !',
                  'Form laporan telah terbuat',
                  'success'
                )
                let idDetail = this.detailPertemuan;
                //let jlhPertemuan;
                //const service = this.authService;
                this.authService.getPraktikumDetailById(idDetail).subscribe(data => {
                  this.praktikans = data.praktikum.praktikan;
                  this.tambahans = data.praktikum.praktikan_tambahan;
                  this.dataPraktikum = data.praktikum;
                  this.jlhPertemuan = data.praktikum._praktikumId._detailId.length;

                  //service.countReportPraktikan()
                  //console.log(this.dataPraktikum);

                });
                //alert('Form laporan telah dibuat');
              } else {
                this.toasterService.pop('error', 'Gagal', 'Form lamporan gagal dibuat');
                //alert('gagal');
              }
            });



          });

          //console.log(report);
        }
        //console.log('delapan');
      }
      if (this.jlhPertemuan == 4) {

        if (jlhReport >= 1) {
          swal({
            title: 'Praktikan yang bersangkutan telah melebihi batas ketidak hadiran !',
            text: "Praktikan akan di hapus dari praktikum : " + this.dataPraktikum._praktikumId.nama_praktikum,
            type: 'error',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak',
          }).then(() => {

            const dataPraktikan = {
              idPraktikan: idPraktikan,
              idPraktikum: this.dataPraktikum._praktikumId._id
            }
            service.deletePraktikanFromPraktikum(dataPraktikan).subscribe(data => {
              if (data.success) {
                swal(
                  'Terhapus!',
                  'Praktikan telah dikeluarkan dari praktikum ' + this.dataPraktikum._praktikumId.nama_praktikum,
                  'success'
                )
                //alert('Praktikan di delete karena telah melebihi batas tidak masuk');
                let idDetail = this.detailPertemuan;
                //let jlhPertemuan;
                //const service = this.authService;
                this.authService.getPraktikumDetailById(idDetail).subscribe(data => {
                  this.praktikans = data.praktikum.praktikan;
                  this.tambahans = data.praktikum.praktikan_tambahan;
                  this.dataPraktikum = data.praktikum;
                  this.jlhPertemuan = data.praktikum._praktikumId._detailId.length;

                  //service.countReportPraktikan()
                  //console.log(this.dataPraktikum);

                });
              } else {
                this.toasterService.pop('error', 'Gagal', 'Form lamporan gagal dibuat');
                //alert('gagal');
              }
              //console.log(data);
            });



          });


        } else {
          swal({
            title: 'Apakah praktikan yang bersangkutan tidak menghadiri praktikan?',
            text: "Buat form laporan untuk praktikan yang bersangkutan",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak',
          }).then(() => {

            let idPembuat = this.pjId;
            const report = {
              idPraktikan: idPraktikan,
              detailPraktikum: this.dataPraktikum._id,
              kode_praktikum: this.dataPraktikum.kode_praktikum,
              idPraktikum: this.dataPraktikum._praktikumId._id,
              idPembuat: idPembuat,
              tanggal: this.dataPraktikum.tanggal,
            }
            service.makeReport(report).subscribe(data => {
              if (data.success) {
                swal(
                  'Berhasil !',
                  'Form laporan telah terbuat',
                  'success'
                )
                let idDetail = this.detailPertemuan;
                //let jlhPertemuan;
                //const service = this.authService;
                this.authService.getPraktikumDetailById(idDetail).subscribe(data => {
                  this.praktikans = data.praktikum.praktikan;
                  this.tambahans = data.praktikum.praktikan_tambahan;
                  this.dataPraktikum = data.praktikum;
                  this.jlhPertemuan = data.praktikum._praktikumId._detailId.length;

                  //service.countReportPraktikan()
                  //console.log(this.dataPraktikum);

                });
                //alert('Form laporan telah dibuat');
              } else {
                this.toasterService.pop('error', 'Gagal', 'Form lamporan gagal dibuat');
                //alert('gagal');
              }
            });



          });
        }
        //console.log('empat');
      }
    });
    //console.log(this.jlhPertemuan);
  }

  updateReport(reportId) {
    this.authService.updatePengulangan(reportId).subscribe(data => {
      if (data.success) {
        this.toasterService.pop('success', 'Berhasil', 'Laporan pengulangan terupdate');
        let idDetail = this.detailPertemuan;
        //let jlhPertemuan;
        //const service = this.authService;
        this.authService.getPraktikumDetailById(idDetail).subscribe(data => {
          this.praktikans = data.praktikum.praktikan;
          this.tambahans = data.praktikum.praktikan_tambahan;
          this.dataPraktikum = data.praktikum;
          this.jlhPertemuan = data.praktikum._praktikumId._detailId.length;

          //service.countReportPraktikan()
          //console.log(this.dataPraktikum);

        });
      } else {
        this.toasterService.pop('error', 'Gagal', 'Laporan tidak terupdate');
      }
    });
  }
}
