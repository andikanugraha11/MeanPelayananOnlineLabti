import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {


  allPraktikan: Number;
  praktikanActive: Number;
  praktikanNotActive: Number;
  pj: Number;
  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.authService.getAllPraktikan().subscribe(data => {
      this.allPraktikan = data.praktikan.length;
    });
    this.authService.getAllPraktikanActive().subscribe(data => {
      this.praktikanActive = data.praktikan.length;
    });
    this.authService.getAllPraktikanNotActive().subscribe(data => {
      this.praktikanNotActive = data.praktikan.length;
    });
    this.authService.getAllPJ().subscribe(data=>{
      this.pj =  data.pj.length;
    })
  }



}
