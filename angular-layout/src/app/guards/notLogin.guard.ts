import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class NotLoginGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {

    }

    canActivate() {
        if (!this.authService.loggedIn()) {
            return true;
        } else {
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
            return false;
        }
    }
}