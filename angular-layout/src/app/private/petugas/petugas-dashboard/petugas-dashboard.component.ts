import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-petugas-dashboard',
  templateUrl: './petugas-dashboard.component.html',
  styleUrls: ['./petugas-dashboard.component.css']
})
export class PetugasDashboardComponent implements OnInit {
  total:Number;
  dibuat:Number;
  proses:Number;
  selesai:Number;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getAllReport().subscribe(data=>{
      this.total = data.report.length;
    });
    this.authService.getAllReportCreated().subscribe(data=>{
      this.dibuat = data.report.length;
    });
    this.authService.getAllReportOnProgress().subscribe(data=>{
      this.proses = data.report.length;
    });
    this.authService.getAllReportComplete().subscribe(data=>{
      this.selesai = data.report.length;
    });
  }

}
