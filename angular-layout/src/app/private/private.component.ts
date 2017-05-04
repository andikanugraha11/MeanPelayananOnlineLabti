import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css'],

})
export class PrivateComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {

  }
  user: any;
  loggedIn: Boolean = false;
  roleAdmin: Boolean = false;
  rolePj: Boolean = false;
  rolePetugas: Boolean = false;
  rolePraktikan: Boolean = false;
  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      this.loggedIn = true;
      if (this.user.role == 'admin') {
        this.roleAdmin = true;
      } else if (this.user.role == 'petugas') {
        this.rolePetugas = true;
      } else if (this.user.role == 'pj') {
        this.rolePj = true;
      } else if (this.user.role == 'praktikan') {
        this.rolePraktikan = true;
      }
      console.log(this.user);
    },
      err => {
        console.log(err);
        return false;
      });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
    return false;
  }

}
