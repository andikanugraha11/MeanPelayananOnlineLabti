import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../../../services/validation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { DialogService } from "ng2-bootstrap-modal";
import { ModalAddTingka1Component } from './modal-add-tingka1/modal-add-tingka1.component';
import { ModalDetailTingkat1Component } from './modal-detail-tingkat1/modal-detail-tingkat1.component'
import { ToasterService } from 'angular2-toaster';
import { Subject } from 'rxjs/Rx';

@Component({
    selector: 'app-tingkat1',
    templateUrl: './tingkat1.component.html',
    styleUrls: ['./tingkat1.component.css'],
})
export class Tingkat1Component implements OnInit {

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
        this.authService.getAllPraktikumTk1().subscribe(data => {
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
                    let detail = this.dialogService.addDialog(ModalDetailTingkat1Component, {
                        title: 'Detail Praktikum',
                        message: 'Detai message',
                        praktikum: data.praktikum,
                        pertemuan: data.praktikum._detailId
                    });
                }
            });
    }

    showAdd() {
        let disposable = this.dialogService.addDialog(ModalAddTingka1Component, {
            title: 'Confirm title',
            message: 'Confirm message'
        })
            .subscribe((data) => {
                if (data) {
                    this.toasterService.pop('success', 'Berhasil', 'Praktikum ditambah');
                    this.authService.getAllPraktikumTk1().subscribe(data => {
                        this.praktikums = data.praktikum;
                    });
                } else if (data == false) {
                    this.toasterService.pop('error', 'Gagal', 'Gagal menambah praktikum');
                }
            });
    }
}
