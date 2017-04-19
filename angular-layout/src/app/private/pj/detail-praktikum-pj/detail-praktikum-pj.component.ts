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
  flag:Boolean = false;
  constructor(private route:ActivatedRoute,private authService:AuthService, private router:Router) { }

  ngOnInit() {
    const idPraktikum = this.route.snapshot.params['id_praktikum'];
    //console.log(this.idPraktikum);
    this.authService.getPraktikumById(idPraktikum).subscribe(data =>{
      this.praktikum = data.praktikum;
      this.details = data.praktikum._detailId;
    },
    err => {
  		console.log(err);
  		return false;
  	});
  }

  onChangePertemuan(){
    this.flag = true;
    console.log(this.detailPertemuan);
  }

}
