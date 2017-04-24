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
  flag:Boolean = false;
  dataPraktikum:any; //testing
  pjId:String;
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
    this.authService.getPraktikumDetailById(idDetail).subscribe(data =>{
      this.praktikans = data.praktikum.praktikan;
      this.dataPraktikum = data.praktikum;
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
    let idPembuat = this.pjId;
    const report = {
      idPraktikan : idPraktikan,
      detailPraktikum : this.dataPraktikum._id,
      kode_praktikum : this.dataPraktikum.kode_praktikum,
      idPraktikum : this.dataPraktikum._praktikumId._id,
      idPembuat : idPembuat,
      tanggal : this.dataPraktikum.tanggal,
    }
    this.authService.makeReport(report).subscribe(data => {
      if(data.success){
        alert('Form laporan telah dibuat');
      }else{
        alert('gagal');
      }
    });
    console.log(report);
  }

}
