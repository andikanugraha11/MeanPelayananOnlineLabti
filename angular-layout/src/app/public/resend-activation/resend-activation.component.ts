import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ValidationService } from '../../services/validation.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Observable } from 'rxjs/Observable';
import { default as swal } from 'sweetalert2'

@Component({
  selector: 'app-resend-activation',
  templateUrl: './resend-activation.component.html',
  styleUrls: ['./resend-activation.component.css']
})
export class ResendActivationComponent implements OnInit {

  email: String;

  constructor(private authService: AuthService, private router: Router, private flashMessage: FlashMessagesService, private validation: ValidationService) { }

  ngOnInit() {
  }

  resend() {
    const data = {
      email: this.email.toLowerCase()
    }
    
    this.authService.resendActivation(data).subscribe(data => {
      console.log(data)
      if (data.success) {
        swal(
          data.msg,
          'Silahkan buka tautan pada email anda, periksa folder spam apabila tautan tidak ditemukan',
          'success'
        ).then(() => {
          this.router.navigate(["/"]);
        })
      } else {
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeOut: 3000
        });
        return false;
      }
    })
  }
}
