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

router.post('/add', (req, res, next) => {
    let newReport = new Report({
        _praktikumId: req.body.idPraktikum,
        _detailPraktikumId: req.body.detailPraktikum,
        kode_praktikum: req.body.kode_praktikum,
        _praktikanId: req.body.idPraktikan,
        pembuat: req.body.idPembuat,
        tanggal_buat: req.body.tanggal_buat
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

module.exports = router;