import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ValidationService } from '../../services/validation.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authToken: any;
  user: any;
  username: String;
  password: String;



  constructor(private authService: AuthService, private router: Router, private flashMessage: FlashMessagesService, private validation: ValidationService) {
    
  }

  ngOnInit() {
    // let token = localStorage.getItem('id_token');
    // //console.log(token)
    // if (token != null) {
    //   //console.log('proses')
    //   this.authService.getRole().subscribe(data => {
    //     //console.log(data)
    //     if (data.role == 'praktikan') {
    //       this.router.navigate(['/dashboard']);
    //     }
    //     else if (data.role == 'admin') {
    //       this.router.navigate(['/dashboard/admin']);

    //     }
    //     else if (data.role == 'petugas') {
    //       this.router.navigate(['/dashboard/petugas']);
    //     }
    //     else if (data.role == 'pj') {
    //       this.router.navigate(['/dashboard/pj']);
    //     }
    //   });
    // }
  }

  loginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }

    //validation
    if (!this.validation.validateLogin(user)) {
      this.flashMessage.show('Data yang anda masukan belum lengkap', {
        cssClass: 'alert-danger',
        timeOut: 3000
      });
      return false;
    }

    this.authService.authenticateUser(user).subscribe(data => {
      console.log(data.role);
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.flashMessage.show('Login Berhasil', {
          cssClass: 'alert-success',
          timeOut: 3000
        });
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

      } else {
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeOut: 3000
        });
        this.router.navigate(['']);
      }
    });
  }
}
