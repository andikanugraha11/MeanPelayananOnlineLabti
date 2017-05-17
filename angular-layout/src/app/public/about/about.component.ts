import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {
  user: any;
  loggedIn: Boolean = false;
  year: any;

  constructor(private authService: AuthService, private router: Router) {
    const date = new Date();
    this.year = date.getFullYear();
  }
  ngOnDestroy() {
    document.body.className = '';
  }
  ngOnInit() {
    document.body.className = 'about-bg';
    const token = localStorage.getItem('id_token');
    if (token != null) {
      this.authService.getProfile().subscribe(profile => {
        this.user = profile.user;
        this.loggedIn = true;
      },
        err => {
          console.log(err);
          return false;
        });
    }

  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
    return false;
  }

}
