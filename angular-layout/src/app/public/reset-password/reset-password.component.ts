import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../services/validation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private flashMessage: FlashMessagesService, private router: Router, private validation: ValidationService, private authService: AuthService) {
   }

  ngOnInit() {
    let token = localStorage.getItem('id_token');
    //console.log(token)
    if (token != null) {
      //console.log('proses')
      this.authService.getRole().subscribe(data => {
        //console.log(data)
        if (data.role == 'praktikan') {
          this.router.navigate(['/dashboard']);
        }
        else if (data.role == 'admin') {
          this.router.navigate(['/dashboard/admin']);

        }
        else if (data.role == 'petugas') {
          this.router.navigate(['/dashboard/petugas']);
        }
        else if (data.role == 'pj') {
          this.router.navigate(['/dashboard/pj']);
        }
      });
    }
  }

}
