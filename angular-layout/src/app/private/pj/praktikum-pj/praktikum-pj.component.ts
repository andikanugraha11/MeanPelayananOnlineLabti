import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../../services/validation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-praktikum-pj',
  templateUrl: './praktikum-pj.component.html',
  styleUrls: ['./praktikum-pj.component.css']
})
export class PraktikumPjComponent implements OnInit {

  praktikums:Object;
  pjData: any;
  PjId: Object;
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
    const service = this.authService;
    this.authService.getProfile().subscribe(profile => {
  		this.PjId = profile.user._pjId;
      service.getPjDetail(this.PjId).subscribe(data => {
          this.pjData = data.data;
          this.praktikums = this.pjData._praktikumId;
          //console.log(this.pjData._praktikumId);
        },
        err => {
          console.log(err);
          return false;
        });
  	},
  	err => {
  		console.log(err);
  		return false;
  	});


    // this.authService.getPraktikumByPj(this.PjId).subscribe(data => {
    //   this.praktikums = data.praktikum;
    //   console.log(this.PjId);
    // },
    // err => {
    //   console.log(err);
    //   return false;
    // });


  }

}
