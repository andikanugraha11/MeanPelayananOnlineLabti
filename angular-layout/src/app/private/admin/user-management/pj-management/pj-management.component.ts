import { Component, OnInit, ViewChild } from '@angular/core';
import { ValidationService } from '../../../../services/validation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { DialogService } from "ng2-bootstrap-modal";
import { ModalAddPjComponent } from './modal-add-pj/modal-add-pj.component';
import { ToasterService } from 'angular2-toaster';
import { default as swal } from 'sweetalert2'
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Rx';
@Component({
  selector: 'app-pj-management',
  templateUrl: './pj-management.component.html',
  styleUrls: ['./pj-management.component.css']
})
export class PjManagementComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  data: Object;
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject();
  constructor(private toasterService: ToasterService, private authService: AuthService, private router: Router, private dialogService: DialogService) { }

  ngOnInit() {
    this.dtOptions = {
      language: {
        url: "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Indonesian.json"
      }
    };
    this.authService.getAllPJ().subscribe(data => {
      this.data = data.pj;
      this.dtTrigger.next();
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
        if (data) {
          this.toasterService.pop('success', 'Berhasil', 'Berhasil menambah penanggung jawab');
          this.authService.getAllPJ().subscribe(data => {
            this.data = data.pj;
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.destroy();
              this.dtTrigger.next();
            });
          });
        } else if (data == false) {
          this.toasterService.pop('error', 'Gagal', 'Gagal menambah penanggung jawab');
        }
      });
  }

  removePJ(id) {
    swal({
      title: 'Apakah Anda Yakin Akan Menghapus Penanggung Jawab?',
      text: "Sangat tidak disarankan untuk menghapus PJ apabila sudah memiliki mata praktikum",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya',
      cancelButtonText: 'Tidak',
    }).then(() => {

      this.authService.removePJ(id).subscribe(data => {
        if (data.success) {
          swal(
            'Berhasil',
            'Penanggung jawab dihapus',
            'success'
          )
          this.authService.getAllPJ().subscribe(data => {
            this.data = data.pj;
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.destroy();
              this.dtTrigger.next();
            });
          });
        } else {
          this.toasterService.pop('error', 'Gagal', 'Gagal mengahpus penanggung jawab');
        }
      })

    });
  }

}
