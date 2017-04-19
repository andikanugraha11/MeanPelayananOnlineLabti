import { Injectable } from '@angular/core';

@Injectable()
export class ValidationService {

  constructor() { }

  validateLogin(user){
    if(user.username == undefined || user.password == undefined){
      return false;
    }else{
      return true;
    }
  }

  validateActivation(praktikan){
    if(praktikan.npm == undefined || praktikan.kelas == undefined){
      return false;
    }else{
      return true;
    }
  }

}
