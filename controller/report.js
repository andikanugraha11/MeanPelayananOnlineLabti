const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const User = require('../models/userSchema');
const Praktikan = require('../models/praktikanSchema');
const Praktikum = require('../models/praktikumSchema');
const petugasPj = require('../models/petugasPjSchema');
const DetailPraktikum = require('../models/detailPraktikumSchema');
const Report = require('../models/reportSchema');

//make new report
router.post('/add', (req, res, next) => {
    let newReport = new Report({
        _praktikumId: req.body.idPraktikum,
        _detailPraktikumId: req.body.detailPraktikum,
        kode_praktikum: req.body.kode_praktikum,
        _praktikanId: req.body.idPraktikan,
        pembuat: req.body.idPembuat,
        tanggal: req.body.tanggal
    });

    Report.addNewReport(newReport, (err, data) => {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            res.json({
                success: true,
                msg: "Laporan berhasil dibuat"
            });
        }
    });

});

//praktikan do report
router.post('/praktikanDoReport', (req, res, next) => {
    let updateReport = {
        keterangan: req.body.keterangan,
        praktikum_pengganti: req.body.pengganti,
        tanggal_lapor: new Date(),
        status: 'Proses'
    };
    const reportId = req.body.reportId;
    const detailPraktikumId = req.body.pengganti;
    // console.log(updateReport);
    // console.log(reportId);
    Report.praktikanDoReport(reportId, updateReport, (err, data) => {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            DetailPraktikum.addPraktikan_tambahan(detailPraktikumId, reportId, (err, data) => {
                if (err) {
                    res.json({
                        success: false,
                        msg: err
                    });
                } else {
                    res.json({
                        success: true,
                        msg: "Laporan berhasil dibuat"
                    });
                }
            });
        }
    });
    // Report.addNewReport(newReport, (err, data) => {
    //     if (err) {
    //         res.json({
    //             success: false,
    //             msg: err
    //         });
    //     } else {
    //         res.json({
    //             success: true,
    //             msg: "Laporan berhasil dibuat"
    //         });
    //     }
    // });

});

//get report praktikan
router.get('/getPraktikanReport/:praktikanId/:praktikumId', (req, res, next) => {
    const praktikanId = req.params.praktikanId;
    const praktikumId = req.params.praktikumId;
    //console.log(praktikanId + praktikumId);
    Report.getReportPraktikan(praktikanId, praktikumId, (report) => {
        res.json({
            success: true,
            report
        })
    });
});

//GET report by praktikan ID
router.get('/getReportByPraktikanId/:id', (req, res, next) => {
    const id = req.params.id;
    Report.getReportByPraktikanId(id, (report) => {
        res.json({
            success: true,
            report
        })
    });
});

//GET report by praktikan ID (On Progress)
router.get('/getReportOnProgressByPraktikanId/:id', (req, res, next) => {
    const id = req.params.id;
    Report.getReportOnProgressByPraktikanId(id, (report) => {
        res.json({
            success: true,
            report
        })
    });
});

router.get('/getReportById/:id', (req, res, next) => {
    const id = req.params.id;
    Report.getReportById(id, (err, report) => {
        res.json({
            success: true,
            report,
        })
    });
});

module.exports = router;