import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../../services/validation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { DialogService } from "ng2-bootstrap-modal";
import { ModalAddPraktikanComponent } from './modal-add-praktikan/modal-add-praktikan.component';
import { ModalAddUploadPraktikanComponent } from './modal-add-upload-praktikan/modal-add-upload-praktikan.component';
import { ToasterService } from 'angular2-toaster';
import { default as swal } from 'sweetalert2'


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {

  data: Object;
  praktikums: Object;
  serachByName: String = "";
  serachByNpm: String = "";
  searchByClass: String = "";
  constructor(private toasterService: ToasterService, private authService: AuthService, private router: Router, private dialogService: DialogService) {

  }

  ngOnInit() {
    this.authService.getAllPraktikan().subscribe(data => {
      this.data = data.praktikan;
      //this.praktikums =  data.praktikan._praktikumId;
      //console.log(this.data);
      //console.log(this.praktikums)
    },
      err => {
        console.log(err);
        return false;
      });
  }

  resetPassword(id) {
    swal({
      title: 'Reset password praktikan',
      text: "Set password praktikan menjadi NPM",
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya',
      cancelButtonText: 'Tidak',
    }).then(() => {
      swal(
        'Berhasil!',
        'Password praktikan sudah di reset',
        'success'
      )
      this.authService.getPraktikanById(id).subscribe(data => {
        const dataUpdate = {
          npm: data.praktikan.npm,
          id
        }
        service.setPasswordToNpm(dataUpdate).subscribe(data => {
          //console.log(data);
        });
        //console.log(npm);
      });

    });
    const service = this.authService;

  }

  addPraktikan() {
    let disposable = this.dialogService.addDialog(ModalAddPraktikanComponent, {
      title: 'Confirm title',
      message: 'Confirm message'
    })
      .subscribe((data) => {
        if (data) {
          this.toasterService.pop('success', 'Berhasil', 'Berhasil menambah praktikan');
          this.authService.getAllPraktikan().subscribe(data => {
            this.data = data.praktikan;
          });
          //apabila langsung else this.close akan dihitung gagal
        } else if (data == false) {
          this.toasterService.pop('error', 'Gagal', 'Gagal menambah penanggung praktikan');
        }
      });
  }

  uploadPraktikan() {
    let disposable = this.dialogService.addDialog(ModalAddUploadPraktikanComponent, {
      title: 'Confirm title',
      message: 'Confirm message'
    }).subscribe((data) => {
      if (data) {
        this.toasterService.pop('success', 'Berhasil', 'Berhasil menambah praktikan');
        this.authService.getAllPraktikan().subscribe(data => {
          this.data = data.praktikan;
        });
        //apabila langsung else this.close akan dihitung gagal
      } else if (data == false) {
        this.toasterService.pop('error', 'Gagal', 'Gagal menambah penanggung praktikan');
      }
    });
  }

  removePraktikan(id) {
    swal({
      title: 'Apakah anda yakin akan mengahapus praktikan?',
      text: "Anda tidak dapat mengembalikanya",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya',
      cancelButtonText: 'Tidak',
    }).then(() => {
      this.authService.removePraktikan(id).subscribe(data => {
        if (data.success) {
          swal(
            'Terhapus!',
            'Praktikan telah di hapus',
            'success'
          )
          this.authService.getAllPraktikan().subscribe(data => {
            this.data = data.praktikan;
          });
        } else {
          this.toasterService.pop('error', 'Gagal', 'Gagal menghapus penanggung praktikan');
        }
      })

    });

  }
}
