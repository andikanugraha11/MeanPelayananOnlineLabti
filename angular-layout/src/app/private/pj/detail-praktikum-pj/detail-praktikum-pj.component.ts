import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ValidationService } from '../../../services/validation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-detail-praktikum-pj',
  templateUrl: './detail-praktikum-pj.component.html',
  styleUrls: ['./detail-praktikum-pj.component.css']
})
export class DetailPraktikumPjComponent implements OnInit {
  praktikum = Object;
  details  : Object;
  detailPertemuan : String;
  praktikans : Object;
  tambahans : Object;
  flag:Boolean = false;
  dataPraktikum:any; //testing
  pjId:String;
  jlhPertemuan:Number;
  constructor(private route:ActivatedRoute,private authService:AuthService, private router:Router) { }

  ngOnInit() {
    const idPraktikum = this.route.snapshot.params['id_praktikum'];
    //console.log(this.idPraktikum);
    this.authService.getPraktikumById(idPraktikum).subscribe(data =>{
      this.praktikum = data.praktikum;
      this.details = data.praktikum._detailId;
      console.log(data);
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

  onChangePertemuan(){
    this.flag = true;
    let idDetail = this.detailPertemuan;
    //let jlhPertemuan;
    const service = this.authService;
    this.authService.getPraktikumDetailById(idDetail).subscribe(data =>{
      this.praktikans = data.praktikum.praktikan;
      this.tambahans = data.praktikum.praktikan_tambahan;
      this.dataPraktikum = data.praktikum;
      this.jlhPertemuan = data.praktikum._praktikumId._detailId.length;

      //service.countReportPraktikan()
      console.log(this.dataPraktikum);

    },
    err => {
      console.log(err);
      return false;
    });
    //console.log(idDetail);
  }

  makeReport(idPraktikan){
    // console.log(idPraktikan);
    // console.log(this.dataPraktikum);
    const service = this.authService;
    this.authService.getReportPraktikan(idPraktikan,this.dataPraktikum._praktikumId._id).subscribe(data=>{
      // console.log(data);
      // console.log(data.report.length);
      const jlhReport = data.report.length;
      if(this.jlhPertemuan==8){
        if(jlhReport>=2){
          alert('delete');
        }else{
          let idPembuat = this.pjId;
          const report = {
            idPraktikan : idPraktikan,
            detailPraktikum : this.dataPraktikum._id,
            kode_praktikum : this.dataPraktikum.kode_praktikum,
            idPraktikum : this.dataPraktikum._praktikumId._id,
            idPembuat : idPembuat,
            tanggal : this.dataPraktikum.tanggal,
          }
          service.makeReport(report).subscribe(data => {
            if(data.success){
              alert('Form laporan telah dibuat');
            }else{
              alert('gagal');
            }
          });
          console.log(report);
        }
        console.log('delapan');
      }
      if(this.jlhPertemuan==4){
        if(jlhReport>=1){
          alert('delete');
        }else{
          let idPembuat = this.pjId;
          const report = {
            idPraktikan : idPraktikan,
            detailPraktikum : this.dataPraktikum._id,
            kode_praktikum : this.dataPraktikum.kode_praktikum,
            idPraktikum : this.dataPraktikum._praktikumId._id,
            idPembuat : idPembuat,
            tanggal : this.dataPraktikum.tanggal,
          }
          service.makeReport(report).subscribe(data => {
            if(data.success){
              alert('Form laporan telah dibuat');
            }else{
              alert('gagal');
            }
          });
          console.log(report);
        }
        console.log('empat');
      }
    });
    console.log(this.jlhPertemuan);
    
    return false;

    // BENER LOH YANG BAWAH

    // let idPembuat = this.pjId;
    // const report = {
    //   idPraktikan : idPraktikan,
    //   detailPraktikum : this.dataPraktikum._id,
    //   kode_praktikum : this.dataPraktikum.kode_praktikum,
    //   idPraktikum : this.dataPraktikum._praktikumId._id,
    //   idPembuat : idPembuat,
    //   tanggal : this.dataPraktikum.tanggal,
    // }
    // this.authService.makeReport(report).subscribe(data => {
    //   if(data.success){
    //     alert('Form laporan telah dibuat');
    //   }else{
    //     alert('gagal');
    //   }
    // });
    // console.log(report);
  }

}
