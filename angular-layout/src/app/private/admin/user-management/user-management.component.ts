import { Component, OnInit, ViewChild } from '@angular/core';
import { ValidationService } from '../../../services/validation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { DialogService } from "ng2-bootstrap-modal";
import { ModalAddPraktikanComponent } from './modal-add-praktikan/modal-add-praktikan.component';
import { ModalAddUploadPraktikanComponent } from './modal-add-upload-praktikan/modal-add-upload-praktikan.component';
import { ModalDetailPraktikanComponent } from './modal-detail-praktikan/modal-detail-praktikan.component';
import { ToasterService } from 'angular2-toaster';
import { default as swal } from 'sweetalert2'
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Rx';



@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  data: Object;
  praktikums: Object;
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject();
  constructor(private toasterService: ToasterService, private authService: AuthService, private router: Router, private dialogService: DialogService) {

  }

  ngOnInit() {
    this.dtOptions = {
      language: {
        url: "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Indonesian.json"
      }
    };
    this.authService.getAllPraktikan().subscribe(data => {
      this.data = data.praktikan;
      this.dtTrigger.next();
    },
      err => {
        console.log(err);
        return false;
      });
  }

  addPraktikan() {
    let disposable = this.dialogService.addDialog(ModalAddPraktikanComponent, {
      title: 'Confirm title',
      message: 'Confirm message'
    })
      .subscribe((data) => {
        if (data) {
          this.toasterService.pop('success', 'Berhasil', 'Berhasil Menambah Praktikan');
          this.authService.getAllPraktikan().subscribe(data => {
            this.data = data.praktikan;
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.destroy();
              this.dtTrigger.next();
            });
          });
        } else if (data == false) {
          this.toasterService.pop('error', 'Gagal', 'Gagal Menambah Praktikan');
        }
      });
  }

  detailPraktikan(idPraktikan) {
    this.authService.getUserByPraktikanId(idPraktikan)
      .subscribe(data => {
        if (data.success) {
          let detail = this.dialogService.addDialog(ModalDetailPraktikanComponent, {
            // idPraktikan : idPraktikan,
            title: 'Detail Praktikum',
            message: 'Detai message',
            praktikan: data.data
          });
        }
      });
  }

  removePraktikan(id) {
    swal({
      title: 'Apakah Anda Yakin Akan Menghapus Praktikan?',
      text: "Data yang telah dihapus tidak dapat dikembalikan",
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
            'Praktikan telah dihapus',
            'success'
          )
          this.authService.getAllPraktikan().subscribe(data => {
            this.data = data.praktikan;
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.destroy();
              this.dtTrigger.next();
            });
          });
        } else {
          this.toasterService.pop('error', 'Gagal', 'Gagal Menghapus Praktikan');
        }
      })

    });

  }
}
