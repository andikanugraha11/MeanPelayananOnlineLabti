import { Component, OnInit, ViewChild } from '@angular/core';
import { ValidationService } from '../../../../services/validation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { DialogService } from "ng2-bootstrap-modal";
import { FlashMessagesService } from 'angular2-flash-messages';
import { ToasterService } from 'angular2-toaster';
import { ModalAddPetugasComponent } from './modal-add-petugas/modal-add-petugas.component';
import { default as swal } from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Rx';

@Component({
    selector: 'app-petugas-management',
    templateUrl: './petugas-management.component.html',
    styleUrls: ['./petugas-management.component.css']
})

export class PetugasManagementComponent implements OnInit {
    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;
    data: Object;
    dtOptions: any;
    dtTrigger: Subject<any> = new Subject();

    constructor(private toasterService: ToasterService, private flashMessage: FlashMessagesService, private authService: AuthService, private router: Router, private dialogService: DialogService) {
        // let flsMsg = new FlashMessage()
    }

    ngOnInit() {
        this.dtOptions = {
            language: {
                url: "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Indonesian.json"
            }
            // dom: 'Bfrtip',
            // buttons: [
            //     'print',
            //     'excel',
            //     'pdf'
            // ]
        };

        this.authService.getAllPetugas().subscribe(data => {
            this.data = data.petugas;
            this.dtTrigger.next();
            //console.log(this.data);
        },
            err => {
                //console.log(err);
                return false;
            });
    }
    showConfirm() {
        const service = this.authService;

        let disposable = this.dialogService.addDialog(ModalAddPetugasComponent, {
            title: 'Confirm title',
            message: 'Confirm message'
        })
            .subscribe((data) => {
                if (data) {
                    this.toasterService.pop('success', 'Berhasil', 'Berhasil menambah petugas');
                    this.authService.getAllPetugas().subscribe(data => {
                        this.data = data.petugas;
                        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                            // Destroy the table first
                            dtInstance.destroy();
                            // Call the dtTrigger to rerender again
                            this.dtTrigger.next();
                        });
                        // this.dtTrigger.next();
                    })
                } else if (data == false) {
                    this.toasterService.pop('error', 'Gagal', 'Gagal menambah petugas');
                }
            });
    }

    removePetugas(id) {

        swal({
            title: 'Apakah anda yakin akan mengahapus petugas?',
            text: "Data yang sudah dihapus tidak dapat dikembalikan",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak',
        }).then(() => {

            this.authService.removePetugas(id).subscribe(data => {
                if (data.success) {
                    swal(
                        'Terhapus!',
                        'petugas dihapus',
                        'success'
                    )
                    this.authService.getAllPetugas().subscribe(data => {
                        this.data = data.petugas;
                        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                            // Destroy the table first
                            dtInstance.destroy();
                            // Call the dtTrigger to rerender again
                            this.dtTrigger.next();
                        });
                    })
                } else {
                    this.toasterService.pop('error', 'Gagal', 'Gagal menghapus petugas');
                }
            })



        });



    }
}
