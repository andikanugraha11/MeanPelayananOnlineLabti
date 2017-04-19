import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../../services/validation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { DialogService } from "ng2-bootstrap-modal";
import { ModalAddPraktikanComponent } from './modal-add-praktikan/modal-add-praktikan.component';


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  
  data : Object;
  constructor(private authService:AuthService, private router:Router, private dialogService:DialogService) {
    
  }

  ngOnInit() {
    this.authService.getAllPraktikan().subscribe(data => {
      this.data = data.praktikan;
      console.log(this.data);
    },
    err => {
      console.log(err);
      return false;
    });
  }

  onDetail(){
    
  }

  showConfirm() {
        let disposable = this.dialogService.addDialog(ModalAddPraktikanComponent, {
            title:'Confirm title', 
            message:'Confirm message'})
            .subscribe((data)=>{
                //We get dialog result
                if(data) {
                    alert('Sukses');
                }
            });
        //We can close dialog calling disposable.unsubscribe();
        //If dialog was not closed manually close it by timeout
        // setTimeout(()=>{
        //     disposable.unsubscribe();
        // },10000);
    }

  removePraktikan(id){
    this.authService.removePraktikan(id).subscribe(data=>{
      if(data.success){
        console.log('Berhasil');
      }
    })
  }
}
