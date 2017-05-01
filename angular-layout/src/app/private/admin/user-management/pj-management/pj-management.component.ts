import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../../../services/validation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { DialogService } from "ng2-bootstrap-modal";
import { ModalAddPjComponent } from './modal-add-pj/modal-add-pj.component';
import {ToasterService} from 'angular2-toaster';
@Component({
  selector: 'app-pj-management',
  templateUrl: './pj-management.component.html',
  styleUrls: ['./pj-management.component.css']
})
export class PjManagementComponent implements OnInit {

  data: Object;
  constructor(private toasterService: ToasterService,private authService: AuthService, private router: Router, private dialogService: DialogService) { }

  ngOnInit() {
    this.authService.getAllPJ().subscribe(data => {
      this.data = data.pj;
      //console.log(this.data);
    },
      err => {
        console.log(err);
        return false;
      });
  }

  showConfirm() {
    let disposable = this.dialogService.addDialog(ModalAddPjComponent, {
      title: 'Confirm title',
      message: 'Confirm message'
    })
      .subscribe((data) => {
        //We get dialog result
        if (data) {
          this.toasterService.pop('success', 'Berhasil', 'Berhasil menambah penanggung jawab');
          this.authService.getAllPJ().subscribe(data => {
            this.data = data.pj;
          });
        }else{
          this.toasterService.pop('error', 'Gagal', 'Gagal menambah penanggung jawab');
        }
      });
  }

  removePJ(id) {
    this.authService.removePJ(id).subscribe(data => {
      if (data.success) {
        this.toasterService.pop('success', 'Berhasil', 'Berhasil menghapus Penanggung Jawab');
        this.authService.getAllPJ().subscribe(data => {
          this.data = data.pj;
        });
      }else{
          this.toasterService.pop('error', 'Gagal', 'Gagal mengahpus penanggung jawab');
        }
    })
  }

}
