import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../../../services/validation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { Subject } from 'rxjs/Rx';

@Component({
  selector: 'app-petugas-report-complete',
  templateUrl: './petugas-report-complete.component.html',
  styleUrls: ['./petugas-report-complete.component.css']
})
export class PetugasReportCompleteComponent implements OnInit {

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
    this.authService.getAllReportComplete().subscribe(data => {

      this.reports = data.report;
      this.dtTrigger.next();
    },
      err => {
        console.log(err);
        return false;
      })
  }
}
