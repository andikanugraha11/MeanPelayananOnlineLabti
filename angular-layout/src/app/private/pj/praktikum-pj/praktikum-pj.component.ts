import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../../services/validation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Subject } from 'rxjs/Rx';

@Component({
  selector: 'app-praktikum-pj',
  templateUrl: './praktikum-pj.component.html',
  styleUrls: ['./praktikum-pj.component.css']
})
export class PraktikumPjComponent implements OnInit {

  praktikums:Object;
  pjData: any;
  PjId: Object;
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject();
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
    this.dtOptions = {
            language: {
                url: "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Indonesian.json"
            }
    };
    const service = this.authService;
    this.authService.getProfile().subscribe(profile => {
  		this.PjId = profile.user._pjId;
      service.getPjDetail(this.PjId).subscribe(data => {
          this.pjData = data.data;
          this.praktikums = this.pjData._praktikumId;
          this.dtTrigger.next();
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


  }

}
