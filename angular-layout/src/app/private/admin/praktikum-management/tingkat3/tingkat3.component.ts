import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../../../services/validation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { DialogService } from "ng2-bootstrap-modal";
import { ModalAddTingka3Component } from './modal-add-tingka3/modal-add-tingka3.component';
import { ModalDetailTingkat3Component } from './modal-detail-tingkat3/modal-detail-tingkat3.component'
import { ToasterService } from 'angular2-toaster';
import { Subject } from 'rxjs/Rx';

@Component({
    selector: 'app-tingkat3',
    templateUrl: './tingkat3.component.html',
    styleUrls: ['./tingkat3.component.css']
})
export class Tingkat3Component implements OnInit {

    praktikums: Object;
    dtOptions: any;
    dtTrigger: Subject<any> = new Subject();
    constructor(private toasterService: ToasterService, private authService: AuthService, private router: Router, private dialogService: DialogService) { }

    ngOnInit() {
        this.dtOptions = {
            // dom: 'Bfrtip',
            // buttons: [
            //     'print',
            //     'excel',
            //     'pdf'
            // ]
        };
        this.authService.getAllPraktikumTk3().subscribe(data => {
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
                    let detail = this.dialogService.addDialog(ModalDetailTingkat3Component, {
                        title: 'Detail Praktikum',
                        message: 'Detai message',
                        praktikum: data.praktikum,
                        pertemuan: data.praktikum._detailId
                    });
                }
            });
    }

    showAdd() {
        let disposable = this.dialogService.addDialog(ModalAddTingka3Component, {
            title: 'Confirm title',
            message: 'Confirm message'
        })
            .subscribe((data) => {
                if (data) {
                    this.toasterService.pop('success', 'Berhasil', 'Praktikum ditambah');
                    this.authService.getAllPraktikumTk3().subscribe(data => {
                        this.praktikums = data.praktikum;
                    });
                } else if (data == false) {
                    this.toasterService.pop('error', 'Gagal', 'Gagal menambah praktikum');
                }
            });
    }
}