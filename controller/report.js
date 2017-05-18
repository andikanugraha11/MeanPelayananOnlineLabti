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
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    let newReport = new Report({
        _praktikumId: req.body.idPraktikum,
        _detailPraktikumId: req.body.detailPraktikum,
        kode_praktikum: req.body.kode_praktikum,
        _praktikanId: req.body.idPraktikan,
        pembuat: req.body.idPembuat,
        tanggal: req.body.tanggal
    });

    const detailId = req.body.detailPraktikum;
    const praktikanId = req.body.idPraktikan;
    Report.addNewReport(newReport, (err, data) => {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            DetailPraktikum.removeFromDetail(detailId, praktikanId, (err, data) => {
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
            })
        }
    });

});

//praktikan do report
router.post('/praktikanDoReport', passport.authenticate('jwt', { session: false }), (req, res, next) => {
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
//updatePengulangan
router.get('/updatePengulangan/:reportId', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const reportId = req.params.reportId;
    Report.updatePengulangan(reportId, (err, report) => {
        if (err) {
            res.json({
                success: false,
                message: 'Gagal'
            })
        } else {
            res.json({
                success: true,
                report
            })
        }
    })
})

//confirm payment
router.get('/confirmPayment/:reportId', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const reportId = req.params.reportId;
    Report.confirmPayment(reportId, (err, report) => {
        if (err) {
            res.json({
                success: false,
                message: 'Gagal'
            })
        } else {
            res.json({
                success: true,
                report
            })
        }
    })
})

//get report praktikan
router.get('/getPraktikanReport/:praktikanId/:praktikumId', passport.authenticate('jwt', { session: false }), (req, res, next) => {
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
router.get('/getReportByPraktikanId/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const id = req.params.id;
    Report.getReportByPraktikanId(id, (report) => {
        res.json({
            success: true,
            report
        })
    });
});

//GET report cretaed By PJ ID
router.get('/getReportCreatedByPjId/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const PjId = req.params.id;
    Report.getReportCreatedByPjId(PjId, (report) => {
        res.json({
            success: true,
            report
        })
    });
});

//GET report by praktikan ID (On Progress)
router.get('/getReportOnProgressByPraktikanId/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const id = req.params.id;
    Report.getReportOnProgressByPraktikanId(id, (report) => {
        res.json({
            success: true,
            report
        })
    });
});

//GET report by praktikan ID (Complete)
router.get('/getReportCompleteByPraktikanId/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const id = req.params.id;
    Report.getReportCompleteByPraktikanId(id, (report) => {
        res.json({
            success: true,
            report
        })
    });
});

//GET report by PJ ID (Complete)
router.get('/getReportCompleteByPjId/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const id = req.params.id;
    Report.getReportCompleteByPjId(id, (report) => {
        res.json({
            success: true,
            report
        })
    });
});

//GET report by PJ ID (On Progress)
router.get('/getReportOnProgressByPjId/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const PjId = req.params.id;
    Report.getReportOnProgressByPjId(PjId, (report) => {
        res.json({
            success: true,
            report
        })
    });
});



router.get('/getReportById/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const id = req.params.id;
    Report.getReportById(id, (err, report) => {
        res.json({
            success: true,
            report,
        })
    });
});
//GET all report 
router.get('/getAllReport', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    Report.getAllReport((err, report) => {
        res.json({
            success: true,
            report
        })
    });
});

//GET all report (Created)
router.get('/getAllReportCreated', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    Report.getAllReportCreated((err, report) => {
        res.json({
            success: true,
            report
        })
    });
});

//GET all report (Complete)
router.get('/getAllReportComplete', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    Report.getAllReportComplete((err, report) => {
        res.json({
            success: true,
            report
        })
    });
});

//GET all report (OnProgress)
router.get('/getAllReportOnProgress', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    Report.getAllReportOnProgress((err, report) => {
        res.json({
            success: true,
            report
        })
    });
});

router.get('/removeReportOnCreate/:reportId/:praktikanId/:detailId', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const reportId = req.params.reportId;
    const praktikanId = req.params.praktikanId;
    const detailId = req.params.detailId;
    Report.removeReport(reportId, (err, report) => {
        if (err) {
            res.json({
                success: false,
                message: 'Gagal Menghapus Laporan',
            })
        } else {
            DetailPraktikum.undoPraktikan(detailId, praktikanId, (err, data) => {
                if (err) {
                    res.json({
                        success: false,
                        message: 'Gagal Menghapus Laporan',
                    })
                } else {
                    res.json({
                        success: true,
                        message: 'Berhasil Menghapus Laporan',
                    })
                }
            })
        }

    });
});

module.exports = router;