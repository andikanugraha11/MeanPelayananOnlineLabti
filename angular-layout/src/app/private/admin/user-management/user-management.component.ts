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
      // dom: 'Bfrtip',
      // lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
      // buttons: [
      //   'print',
      //   'excel',
      //   'pdf'
      // ]
    };
    this.authService.getAllPraktikan().subscribe(data => {
      console.log(data)
      this.data = data.praktikan;
      this.dtTrigger.next();
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
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              // Destroy the table first
              dtInstance.destroy();
              // Call the dtTrigger to rerender again
              this.dtTrigger.next();
            });
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

  detailPraktikan(idPraktikan) {
    this.authService.getUserByPraktikanId(idPraktikan)
      .subscribe(data => {
        if (data.success) {
          console.log(data.data);
          //console.log(data.praktikum._detailId);
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
      title: 'Apakah anda yakin akan menghapus praktikan?',
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
