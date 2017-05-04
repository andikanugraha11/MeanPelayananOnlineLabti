import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PraktikanAuthGuard implements CanActivate {

	data: string;
	constructor(private authService: AuthService, private router: Router) {
		this.authService.getRole().subscribe(data => {
			this.data = data.role;
		});
	}

	canActivate(): Observable<boolean> | Promise<boolean> | boolean {
		let token = localStorage.getItem('id_token');
		if (token != null) {
			return this.authService.getRole().map(data => {
				//console.log(data.role)
				if (data.role == 'praktikan') {
					//console.log(data.role)
					return true;
				} else {
					this.router.navigate(['403']);
					return false;
				}
			})
		} else {
			this.router.navigate(['403']);
			return false;
		}

	}

}