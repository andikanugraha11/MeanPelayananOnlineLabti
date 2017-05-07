import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../../../services/validation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { Subject } from 'rxjs/Rx';

@Component({
  selector: 'app-petugas-report-on-progress',
  templateUrl: './petugas-report-on-progress.component.html',
  styleUrls: ['./petugas-report-on-progress.component.css']
})
export class PetugasReportOnProgressComponent implements OnInit {

  reports: Object;
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject();
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.dtOptions = {
      dom: 'Bfrtip',
      buttons: [
        'print',
        'excel',
        'pdf'
      ]
    };
    this.authService.getAllReportOnProgress().subscribe(data => {
      this.reports = data.report;
      this.dtTrigger.next();
    },
      err => {
        console.log(err);
        return false;
      })
  }

}
