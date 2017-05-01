import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css'],
  
})
export class PrivateComponent implements OnInit {

  constructor(private authService: AuthService,private router :Router) { 

  }
    user : Object;
    loggedIn : Boolean = false;
  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
  		this.user = profile.user;
      this.loggedIn = true;
      console.log(this.user);
  	},
  	err => {
  		console.log(err);
  		return false;
  	});
  }

  logout(){
  	this.authService.logout();
  	this.router.navigate(['/']);
  	return false;
  }

}
