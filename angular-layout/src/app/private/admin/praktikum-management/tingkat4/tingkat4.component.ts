import { Component, OnInit, ViewChild } from '@angular/core';
import { ValidationService } from '../../../../services/validation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { DialogService } from "ng2-bootstrap-modal";
import { ModalAddTingka4Component } from './modal-add-tingka4/modal-add-tingka4.component';
import { ModalDetailTingkat4Component } from './modal-detail-tingkat4/modal-detail-tingkat4.component'
import { ToasterService } from 'angular2-toaster';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Rx';

@Component({
    selector: 'app-tingkat4',
    templateUrl: './tingkat4.component.html',
    styleUrls: ['./tingkat4.component.css']
})
export class Tingkat4Component implements OnInit {
    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;
    praktikums: Object;
    dtOptions: any;
    dtTrigger: Subject<any> = new Subject();
    constructor(private toasterService: ToasterService, private authService: AuthService, private router: Router, private dialogService: DialogService) { }

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
        this.authService.getAllPraktikumTk4().subscribe(data => {
            this.praktikums = data.praktikum;
            this.dtTrigger.next();
            //console.log(this.praktikums);
        },
            err => {
                console.log(err);
                return false;
            });
    }

    showDetail(idPraktikum) {
        this.authService.getPraktikumById(idPraktikum)
            .subscribe(data => {
                if (data.success) {
                    //console.log(data.praktikum._detailId);
                    let detail = this.dialogService.addDialog(ModalDetailTingkat4Component, {
                        title: 'Detail Praktikum',
                        message: 'Detai message',
                        praktikum: data.praktikum,
                        pertemuan: data.praktikum._detailId
                    });
                }
            });
    }

    showAdd() {
        let disposable = this.dialogService.addDialog(ModalAddTingka4Component, {
            title: 'Confirm title',
            message: 'Confirm message'
        })
            .subscribe((data) => {
                if (data) {
                    this.toasterService.pop('success', 'Berhasil', 'Praktikum ditambah');
                    this.authService.getAllPraktikumTk4().subscribe(data => {
                        this.praktikums = data.praktikum;
                        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                            // Destroy the table first
                            dtInstance.destroy();
                            // Call the dtTrigger to rerender again
                            this.dtTrigger.next();
                        });
                    });
                } else if (data == false) {
                    this.toasterService.pop('error', 'Gagal', 'Gagal menambah praktikum');
                }
            });
    }
}