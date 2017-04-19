import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../services/validation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css']
})
export class ActivationComponent implements OnInit {

  npm : String;
  kelas : String;
  username : String;
  email : String;
  password : String;
  rePassword : String;
  dataPraktikan : any;
  findSection : Boolean;
  completeSection : Boolean;
  _praktikanId : String;

  constructor(private router:Router, private validation:ValidationService, private authService:AuthService) { 
  }

  ngOnInit() {
    this.findSection = true;
    this.completeSection = false;
  }


  findPraktikan(){
    const praktikan = {
      kelas : this.kelas,
      npm: this.npm
    }

    //Validation
    if(!this.validation.validateActivation(praktikan)){
      alert('Silahkan isi dengan lengkap');
      return false;
    }
    
    this.authService.getPraktikanByNpmAndKelas(praktikan).subscribe(data =>{
      if(data.success){
        this.activationPraktikan();
        this.dataPraktikan = data;
      }else{
        alert("data tidak ditemukan");
      }
    });
  }

  activationPraktikan(){
    this.findSection = false;
    this.completeSection = true;
  }

  completeData(){
    const praktikan = {
      _praktikanId : this.dataPraktikan.praktikan._id,
      username : this.username,
      email : this.email,
      password : this.password,
      npm : this.npm
    }

    this.authService.userRegister(praktikan).subscribe(data => {
      if(data.success){
        alert('Berhasil, silahkan konfirmasi email');
      }else{
        alert('gagal');
        console.log(data.msg);
      }
    });
    
  }
}
