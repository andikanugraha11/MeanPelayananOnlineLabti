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

//praktikum/add/tingkat1 
router.post('/add/tingkat1', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    let jlh_pertemuan = req.body.jlh_pertemuan;
    let PJ = req.body.pj;
    let kelas = req.body.kelas;
    const listPraktikan = [];
    const curosor = Praktikan.find({ kelas: kelas }).cursor();
    curosor.on('data', doc => {
        listPraktikan.push(doc._id);

    });
    curosor.on('end', doc => {
        let newPraktikum = new Praktikum({
            nama_praktikum: req.body.nama_praktikum,
            kelas: req.body.kelas,
            _PjId: req.body.pj,
            tingkat: 1,
            ruang: req.body.ruang,
            _detailId: []
        });

        if (jlh_pertemuan == 8) {
            let pert1 = new DetailPraktikum({
                _praktikumId: newPraktikum._id,
                kode_praktikum: req.body.kode,
                pertemuan: req.body.pertemuan1,
                shift: req.body.shift,
                tanggal: req.body.tanggal1,
                praktikan: listPraktikan
            });
            let pert2 = new DetailPraktikum({
                _praktikumId: newPraktikum._id,
                kode_praktikum: req.body.kode,
                pertemuan: req.body.pertemuan2,
                shift: req.body.shift,
                tanggal: req.body.tanggal2,
                praktikan: listPraktikan
            });
            let pert3 = new DetailPraktikum({
                _praktikumId: newPraktikum._id,
                kode_praktikum: req.body.kode,
                pertemuan: req.body.pertemuan3,
                shift: req.body.shift,
                tanggal: req.body.tanggal3,
                praktikan: listPraktikan
            });
            let pert4 = new DetailPraktikum({
                _praktikumId: newPraktikum._id,
                kode_praktikum: req.body.kode,
                pertemuan: req.body.pertemuan4,
                shift: req.body.shift,
                tanggal: req.body.tanggal4,
                praktikan: listPraktikan
            });
            let pert5 = new DetailPraktikum({
                _praktikumId: newPraktikum._id,
                kode_praktikum: req.body.kode,
                pertemuan: req.body.pertemuan5,
                shift: req.body.shift,
                tanggal: req.body.tanggal5,
                praktikan: listPraktikan
            });
            let pert6 = new DetailPraktikum({
                _praktikumId: newPraktikum._id,
                kode_praktikum: req.body.kode,
                pertemuan: req.body.pertemuan6,
                shift: req.body.shift,
                tanggal: req.body.tanggal6,
                praktikan: listPraktikan
            });
            let pert7 = new DetailPraktikum({
                _praktikumId: newPraktikum._id,
                kode_praktikum: req.body.kode,
                pertemuan: req.body.pertemuan7,
                shift: req.body.shift,
                tanggal: req.body.tanggal7,
                praktikan: listPraktikan
            });
            let pert8 = new DetailPraktikum({
                _praktikumId: newPraktikum._id,
                kode_praktikum: req.body.kode,
                pertemuan: req.body.pertemuan8,
                shift: req.body.shift,
                tanggal: req.body.tanggal8,
                praktikan: listPraktikan
            });
            newPraktikum._detailId = [
                pert1._id,
                pert2._id,
                pert3._id,
                pert4._id,
                pert5._id,
                pert6._id,
                pert7._id,
                pert8._id,
            ];
            Praktikum.addNewPraktikum(newPraktikum, (err, praktikum) => {
                if (err) {
                    res.json({
                        success: false,
                        msg: err
                    });
                } else {
                    DetailPraktikum.addDetail(pert1, (err, detail1) => {
                        if (err) {
                            res.json({
                                success: false,
                                msg: err
                            });
                        } else {
                            DetailPraktikum.addDetail(pert2, (err, detail2) => {
                                if (err) {
                                    res.json({
                                        success: false,
                                        msg: err
                                    });
                                } else {
                                    DetailPraktikum.addDetail(pert3, (err, detail3) => {
                                        if (err) {
                                            res.json({
                                                success: false,
                                                msg: err
                                            });
                                        } else {
                                            DetailPraktikum.addDetail(pert4, (err, detail4) => {
                                                if (err) {
                                                    res.json({
                                                        success: false,
                                                        msg: err
                                                    });
                                                } else {
                                                    DetailPraktikum.addDetail(pert5, (err, detail5) => {
                                                        if (err) {
                                                            res.json({
                                                                success: false,
                                                                msg: err
                                                            });
                                                        } else {
                                                            DetailPraktikum.addDetail(pert6, (err, detail6) => {
                                                                if (err) {
                                                                    res.json({
                                                                        success: false,
                                                                        msg: err
                                                                    });
                                                                } else {
                                                                    DetailPraktikum.addDetail(pert7, (err, detail7) => {
                                                                        if (err) {
                                                                            res.json({
                                                                                success: false,
                                                                                msg: err
                                                                            });
                                                                        } else {
                                                                            DetailPraktikum.addDetail(pert8, (err, detail8) => {
                                                                                if (err) {
                                                                                    res.json({
                                                                                        success: false,
                                                                                        msg: err
                                                                                    });
                                                                                } else {
                                                                                    petugasPj.updatePraktikum(PJ, newPraktikum._id, (err, data) => {
                                                                                        if (err) {
                                                                                            res.json({
                                                                                                success: false,
                                                                                                msg: err
                                                                                            });
                                                                                        } else {
                                                                                            Praktikan.enrollPraktikum(kelas, newPraktikum._id, (err, data) => {
                                                                                                if (err) {
                                                                                                    res.json({
                                                                                                        success: false,
                                                                                                        msg: err
                                                                                                    });
                                                                                                } else {
                                                                                                    res.json({
                                                                                                        success: true,
                                                                                                        msg: 'Praktikum berhasil di tambah'
                                                                                                    });
                                                                                                }
                                                                                            })
                                                                                        }
                                                                                    });

                                                                                }
                                                                            });
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        } else {
            let pert1 = new DetailPraktikum({
                _praktikumId: newPraktikum._id,
                kode_praktikum: req.body.kode,
                pertemuan: req.body.pertemuan1,
                shift: req.body.shift,
                tanggal: req.body.tanggal1,
                praktikan: listPraktikan
            });
            let pert2 = new DetailPraktikum({
                _praktikumId: newPraktikum._id,
                kode_praktikum: req.body.kode,
                pertemuan: req.body.pertemuan2,
                shift: req.body.shift,
                tanggal: req.body.tanggal2,
                praktikan: listPraktikan
            });
            let pert3 = new DetailPraktikum({
                _praktikumId: newPraktikum._id,
                kode_praktikum: req.body.kode,
                pertemuan: req.body.pertemuan3,
                shift: req.body.shift,
                tanggal: req.body.tanggal3,
                praktikan: listPraktikan
            });
            let pert4 = new DetailPraktikum({
                _praktikumId: newPraktikum._id,
                kode_praktikum: req.body.kode,
                pertemuan: req.body.pertemuan4,
                shift: req.body.shift,
                tanggal: req.body.tanggal4,
                praktikan: listPraktikan
            });
            newPraktikum._detailId = [
                pert1._id,
                pert2._id,
                pert3._id,
                pert4._id,
            ];
            Praktikum.addNewPraktikum(newPraktikum, (err, praktikum) => {
                if (err) {
                    res.json({
                        success: false,
                        msg: err
                    });
                } else {
                    DetailPraktikum.addDetail(pert1, (err, detail1) => {
                        if (err) {
                            res.json({
                                success: false,
                                msg: err
                            });
                        } else {
                            DetailPraktikum.addDetail(pert2, (err, detail2) => {
                                if (err) {
                                    res.json({
                                        success: false,
                                        msg: err
                                    });
                                } else {
                                    DetailPraktikum.addDetail(pert3, (err, detail3) => {
                                        if (err) {
                                            res.json({
                                                success: false,
                                                msg: err
                                            });
                                        } else {
                                            DetailPraktikum.addDetail(pert4, (err, detail4) => {
                                                if (err) {
                                                    res.json({
                                                        success: false,
                                                        msg: err
                                                    });
                                                } else {
                                                    petugasPj.updatePraktikum(PJ, newPraktikum._id, (err, data) => {
                                                        if (err) {
                                                            res.json({
                                                                success: false,
                                                                msg: err
                                                            });
                                                        } else {
                                                            Praktikan.enrollPraktikum(kelas, newPraktikum._id, (err, data) => {
                                                                if (err) {
                                                                    res.json({
                                                                        success: false,
                                                                        msg: err
                                                                    });
                                                                } else {
                                                                    res.json({
                                                                        success: true,
                                                                        msg: 'Praktikum berhasil di tambah'
                                                                    });
                                                                }
                                                            })
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });

});

//praktikum/add/tingkat2 
router.post('/add/tingkat2', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    let jlh_pertemuan = req.body.jlh_pertemuan;
    let PJ = req.body.pj;
    let kelas = req.body.kelas;
    const listPraktikan = [];
    const curosor = Praktikan.find({ kelas: kelas }).cursor();
    curosor.on('data', doc => {
        listPraktikan.push(doc._id);

    });
    curosor.on('end', doc => {
        let newPraktikum = new Praktikum({
            nama_praktikum: req.body.nama_praktikum,
            kelas: req.body.kelas,
            _PjId: req.body.pj,
            tingkat: 2,
            ruang: req.body.ruang,
            _detailId: []
        });

        if (jlh_pertemuan == 8) {
            let pert1 = new DetailPraktikum({
                _praktikumId: newPraktikum._id,
                kode_praktikum: req.body.kode,
                pertemuan: req.body.pertemuan1,
                shift: req.body.shift,
                tanggal: req.body.tanggal1,
                praktikan: listPraktikan
            });
            let pert2 = new DetailPraktikum({
                _praktikumId: newPraktikum._id,
                kode_praktikum: req.body.kode,
                pertemuan: req.body.pertemuan2,
                shift: req.body.shift,
                tanggal: req.body.tanggal2,
                praktikan: listPraktikan
            });
            let pert3 = new DetailPraktikum({
                _praktikumId: newPraktikum._id,
                kode_praktikum: req.body.kode,
                pertemuan: req.body.pertemuan3,
                shift: req.body.shift,
                tanggal: req.body.tanggal3,
                praktikan: listPraktikan
            });
            let pert4 = new DetailPraktikum({
                _praktikumId: newPraktikum._id,
                kode_praktikum: req.body.kode,
                pertemuan: req.body.pertemuan4,
                shift: req.body.shift,
                tanggal: req.body.tanggal4,
                praktikan: listPraktikan
            });
            let pert5 = new DetailPraktikum({
                _praktikumId: newPraktikum._id,
                kode_praktikum: req.body.kode,
                pertemuan: req.body.pertemuan5,
                shift: req.body.shift,
                tanggal: req.body.tanggal5,
                praktikan: listPraktikan
            });
            let pert6 = new DetailPraktikum({
                _praktikumId: newPraktikum._id,
                kode_praktikum: req.body.kode,
                pertemuan: req.body.pertemuan6,
                shift: req.body.shift,
                tanggal: req.body.tanggal6,
                praktikan: listPraktikan
            });
            let pert7 = new DetailPraktikum({
                _praktikumId: newPraktikum._id,
                kode_praktikum: req.body.kode,
                pertemuan: req.body.pertemuan7,
                shift: req.body.shift,
                tanggal: req.body.tanggal7,
                praktikan: listPraktikan
            });
            let pert8 = new DetailPraktikum({
                _praktikumId: newPraktikum._id,
                kode_praktikum: req.body.kode,
                pertemuan: req.body.pertemuan8,
                shift: req.body.shift,
                tanggal: req.body.tanggal8,
                praktikan: listPraktikan
            });
            newPraktikum._detailId = [
                pert1._id,
                pert2._id,
                pert3._id,
                pert4._id,
                pert5._id,
                pert6._id,
                pert7._id,
                pert8._id,
            ];
            Praktikum.addNewPraktikum(newPraktikum, (err, praktikum) => {
                if (err) {
                    res.json({
                        success: false,
                        msg: err
                    });
                } else {
                    DetailPraktikum.addDetail(pert1, (err, detail1) => {
                        if (err) {
                            res.json({
                                success: false,
                                msg: err
                            });
                        } else {
                            DetailPraktikum.addDetail(pert2, (err, detail2) => {
                                if (err) {
                                    res.json({
                                        success: false,
                                        msg: err
                                    });
                                } else {
                                    DetailPraktikum.addDetail(pert3, (err, detail3) => {
                                        if (err) {
                                            res.json({
                                                success: false,
                                                msg: err
                                            });
                                        } else {
                                            DetailPraktikum.addDetail(pert4, (err, detail4) => {
                                                if (err) {
                                                    res.json({
                                                        success: false,
                                                        msg: err
                                                    });
                                                } else {
                                                    DetailPraktikum.addDetail(pert5, (err, detail5) => {
                                                        if (err) {
                                                            res.json({
                                                                success: false,
                                                                msg: err
                                                            });
                                                        } else {
                                                            DetailPraktikum.addDetail(pert6, (err, detail6) => {
                                                                if (err) {
                                                                    res.json({
                                                                        success: false,
                                                                        msg: err
                                                                    });
                                                                } else {
                                                                    DetailPraktikum.addDetail(pert7, (err, detail7) => {
                                                                        if (err) {
                                                                            res.json({
                                                                                success: false,
                                                                                msg: err
                                                                            });
                                                                        } else {
                                                                            DetailPraktikum.addDetail(pert8, (err, detail8) => {
                                                                                if (err) {
                                                                                    res.json({
                                                                                        success: false,
                                                                                        msg: err
                                                                                    });
                                                                                } else {
                                                                                    petugasPj.updatePraktikum(PJ, newPraktikum._id, (err, data) => {
                                                                                        if (err) {
                                                                                            res.json({
                                                                                                success: false,
                                                                                                msg: err
                                                                                            });
                                                                                        } else {
                                                                                            Praktikan.enrollPraktikum(kelas, newPraktikum._id, (err, data) => {
                                                                                                if (err) {
                                                                                                    res.json({
                                                                                                        success: false,
                                                                                                        msg: err
                                                                                                    });
                                                                                                } else {
                                                                                                    res.json({
                                                                                                        success: true,
                                                                                                        msg: 'Praktikum berhasil di tambah'
                                                                                                    });
                                                                                                }
                                                                                            })
                                                                                        }
                                                                                    });

                                                                                }
                                                                            });
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        } else {
            let pert1 = new DetailPraktikum({
                _praktikumId: newPraktikum._id,
                kode_praktikum: req.body.kode,
                pertemuan: req.body.pertemuan1,
                shift: req.body.shift,
                tanggal: req.body.tanggal1,
                praktikan: listPraktikan
            });
            let pert2 = new DetailPraktikum({
                _praktikumId: newPraktikum._id,
                kode_praktikum: req.body.kode,
                pertemuan: req.body.pertemuan2,
                shift: req.body.shift,
                tanggal: req.body.tanggal2,
                praktikan: listPraktikan
            });
            let pert3 = new DetailPraktikum({
                _praktikumId: newPraktikum._id,
                kode_praktikum: req.body.kode,
                pertemuan: req.body.pertemuan3,
                shift: req.body.shift,
                tanggal: req.body.tanggal3,
                praktikan: listPraktikan
            });
            let pert4 = new DetailPraktikum({
                _praktikumId: newPraktikum._id,
                kode_praktikum: req.body.kode,
                pertemuan: req.body.pertemuan4,
                shift: req.body.shift,
                tanggal: req.body.tanggal4,
                praktikan: listPraktikan
            });
            newPraktikum._detailId = [
                pert1._id,
                pert2._id,
                pert3._id,
                pert4._id,
            ];
            Praktikum.addNewPraktikum(newPraktikum, (err, praktikum) => {
                if (err) {
                    res.json({
                        success: false,
                        msg: err
                    });
                } else {
                    DetailPraktikum.addDetail(pert1, (err, detail1) => {
                        if (err) {
                            res.json({
                                success: false,
                                msg: err
                            });
                        } else {
                            DetailPraktikum.addDetail(pert2, (err, detail2) => {
                                if (err) {
                                    res.json({
                                        success: false,
                                        msg: err
                                    });
                                } else {
                                    DetailPraktikum.addDetail(pert3, (err, detail3) => {
                                        if (err) {
                                            res.json({
                                                success: false,
                                                msg: err
                                            });
                                        } else {
                                            DetailPraktikum.addDetail(pert4, (err, detail4) => {
                                                if (err) {
                                                    res.json({
                                                        success: false,
                                                        msg: err
                                                    });
                                                } else {
                                                    petugasPj.updatePraktikum(PJ, newPraktikum._id, (err, data) => {
                                                        if (err) {
                                                            res.json({
                                                                success: false,
                                                                msg: err
                                                            });
                                                        } else {
                                                            Praktikan.enrollPraktikum(kelas, newPraktikum._id, (err, data) => {
                                                                if (err) {
                                                                    res.json({
                                                                        success: false,
                                                                        msg: err
                                                                    });
                                                                } else {
                                                                    res.json({
                                                                        success: true,
                                                                        msg: 'Praktikum berhasil di tambah'
                                                                    });
                                                                }
                                                            })
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });

});

//praktikum/add/tingkat3 
router.post('/add/tingkat3', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    let jlh_pertemuan = req.body.jlh_pertemuan;
    let PJ = req.body.pj;
    let kelas = req.body.kelas;
    const listPraktikan = [];
    const curosor = Praktikan.find({ kelas: kelas }).cursor();
    curosor.on('data', doc => {
        listPraktikan.push(doc._id);

    });
    curosor.on('end', doc => {
        let newPraktikum = new Praktikum({
            nama_praktikum: req.body.nama_praktikum,
            kelas: req.body.kelas,
            _PjId: req.body.pj,
            tingkat: 3,
            ruang: req.body.ruang,
            _detailId: []
        });

        if (jlh_pertemuan == 8) {
            let pert1 = new DetailPraktikum({
                _praktikumId: newPraktikum._id,
                kode_praktikum: req.body.kode,
                pertemuan: req.body.pertemuan1,
                shift: req.body.shift,
                tanggal: req.body.tanggal1,
                praktikan: listPraktikan
            });
            let pert2 = new DetailPraktikum({
                _praktikumId: newPraktikum._id,
                kode_praktikum: req.body.kode,
                pertemuan: req.body.pertemuan2,
                shift: req.body.shift,
                tanggal: req.body.tanggal2,
                praktikan: listPraktikan
            });
            let pert3 = new DetailPraktikum({
                _praktikumId: newPraktikum._id,
                kode_praktikum: req.body.kode,
                pertemuan: req.body.pertemuan3,
                shift: req.body.shift,
                tanggal: req.body.tanggal3,
                praktikan: listPraktikan
            });
            let pert4 = new DetailPraktikum({
                _praktikumId: newPraktikum._id,
                kode_praktikum: req.body.kode,
                pertemuan: req.body.pertemuan4,
                shift: req.body.shift,
                tanggal: req.body.tanggal4,
                praktikan: listPraktikan
            });
            let pert5 = new DetailPraktikum({
                _praktikumId: newPraktikum._id,
                kode_praktikum: req.body.kode,
                pertemuan: req.body.pertemuan5,
                shift: req.body.shift,
                tanggal: req.body.tanggal5,
                praktikan: listPraktikan
            });
            let pert6 = new DetailPraktikum({
                _praktikumId: newPraktikum._id,
                kode_praktikum: req.body.kode,
                pertemuan: req.body.pertemuan6,
                shift: req.body.shift,
                tanggal: req.body.tanggal6,
                praktikan: listPraktikan
            });
            let pert7 = new DetailPraktikum({
                _praktikumId: newPraktikum._id,
                kode_praktikum: req.body.kode,
                pertemuan: req.body.pertemuan7,
                shift: req.body.shift,
                tanggal: req.body.tanggal7,
                praktikan: listPraktikan
            });
            let pert8 = new DetailPraktikum({
                _praktikumId: newPraktikum._id,
                kode_praktikum: req.body.kode,
                pertemuan: req.body.pertemuan8,
                shift: req.body.shift,
                tanggal: req.body.tanggal8,
                praktikan: listPraktikan
            });
            newPraktikum._detailId = [
                pert1._id,
                pert2._id,
                pert3._id,
                pert4._id,
                pert5._id,
                pert6._id,
                pert7._id,
                pert8._id,
            ];
            Praktikum.addNewPraktikum(newPraktikum, (err, praktikum) => {
                if (err) {
                    res.json({
                        success: false,
                        msg: err
                    });
                } else {
                    DetailPraktikum.addDetail(pert1, (err, detail1) => {
                        if (err) {
                            res.json({
                                success: false,
                                msg: err
                            });
                        } else {
                            DetailPraktikum.addDetail(pert2, (err, detail2) => {
                                if (err) {
                                    res.json({
                                        success: false,
                                        msg: err
                                    });
                                } else {
                                    DetailPraktikum.addDetail(pert3, (err, detail3) => {
                                        if (err) {
                                            res.json({
                                                success: false,
                                                msg: err
                                            });
                                        } else {
                                            DetailPraktikum.addDetail(pert4, (err, detail4) => {
                                                if (err) {
                                                    res.json({
                                                        success: false,
                                                        msg: err
                                                    });
                                                } else {
                                                    DetailPraktikum.addDetail(pert5, (err, detail5) => {
                                                        if (err) {
                                                            res.json({
                                                                success: false,
                                                                msg: err
                                                            });
                                                        } else {
                                                            DetailPraktikum.addDetail(pert6, (err, detail6) => {
                                                                if (err) {
                                                                    res.json({
                                                                        success: false,
                                                                        msg: err
                                                                    });
                                                                } else {
                                                                    DetailPraktikum.addDetail(pert7, (err, detail7) => {
                                                                        if (err) {
                                                                            res.json({
                                                                                success: false,
                                                                                msg: err
                                                                            });
                                                                        } else {
                                                                            DetailPraktikum.addDetail(pert8, (err, detail8) => {
                                                                                if (err) {
                                                                                    res.json({
                                                                                        success: false,
                                                                                        msg: err
                                                                                    });
                                                                                } else {
                                                                                    petugasPj.updatePraktikum(PJ, newPraktikum._id, (err, data) => {
                                                                                        if (err) {
                                                                                            res.json({
                                                                                                success: false,
                                                                                                msg: err
                                                                                            });
                                                                                        } else {
                                                                                            Praktikan.enrollPraktikum(kelas, newPraktikum._id, (err, data) => {
                                                                                                if (err) {
                                                                                                    res.json({
                                                                                                        success: false,
                                                                                                        msg: err
                                                                                                    });
                                                                                                } else {
                                                                                                    res.json({
                                                                                                        success: true,
                                                                                                        msg: 'Praktikum berhasil di tambah'
                                                                                                    });
                                                                                                }
                                                                                            })
                                                                                        }
                                                                                    });

                                                                                }
                                                                            });
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        } else {
            let pert1 = new DetailPraktikum({
                _praktikumId: newPraktikum._id,
                kode_praktikum: req.body.kode,
                pertemuan: req.body.pertemuan1,
                shift: req.body.shift,
                tanggal: req.body.tanggal1,
                praktikan: listPraktikan
            });
            let pert2 = new DetailPraktikum({
                _praktikumId: newPraktikum._id,
                kode_praktikum: req.body.kode,
                pertemuan: req.body.pertemuan2,
                shift: req.body.shift,
                tanggal: req.body.tanggal2,
                praktikan: listPraktikan
            });
            let pert3 = new DetailPraktikum({
                _praktikumId: newPraktikum._id,
                kode_praktikum: req.body.kode,
                pertemuan: req.body.pertemuan3,
                shift: req.body.shift,
                tanggal: req.body.tanggal3,
                praktikan: listPraktikan
            });
            let pert4 = new DetailPraktikum({
                _praktikumId: newPraktikum._id,
                kode_praktikum: req.body.kode,
                pertemuan: req.body.pertemuan4,
                shift: req.body.shift,
                tanggal: req.body.tanggal4,
                praktikan: listPraktikan
            });
            newPraktikum._detailId = [
                pert1._id,
                pert2._id,
                pert3._id,
                pert4._id,
            ];
            Praktikum.addNewPraktikum(newPraktikum, (err, praktikum) => {
                if (err) {
                    res.json({
                        success: false,
                        msg: err
                    });
                } else {
                    DetailPraktikum.addDetail(pert1, (err, detail1) => {
                        if (err) {
                            res.json({
                                success: false,
                                msg: err
                            });
                        } else {
                            DetailPraktikum.addDetail(pert2, (err, detail2) => {
                                if (err) {
                                    res.json({
                                        success: false,
                                        msg: err
                                    });
                                } else {
                                    DetailPraktikum.addDetail(pert3, (err, detail3) => {
                                        if (err) {
                                            res.json({
                                                success: false,
                                                msg: err
                                            });
                                        } else {
                                            DetailPraktikum.addDetail(pert4, (err, detail4) => {
                                                if (err) {
                                                    res.json({
                                                        success: false,
                                                        msg: err
                                                    });
                                                } else {
                                                    petugasPj.updatePraktikum(PJ, newPraktikum._id, (err, data) => {
                                                        if (err) {
                                                            res.json({
                                                                success: false,
                                                                msg: err
                                                            });
                                                        } else {
                                                            Praktikan.enrollPraktikum(kelas, newPraktikum._id, (err, data) => {
                                                                if (err) {
                                                                    res.json({
                                                                        success: false,
                                                                        msg: err
                                                                    });
                                                                } else {
                                                                    res.json({
                                                                        success: true,
                                                                        msg: 'Praktikum berhasil di tambah'
                                                                    });
                                                                }
                                                            })
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });

});

//praktikum/add/tingkat4 
router.post('/add/tingkat4', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    let jlh_pertemuan = req.body.jlh_pertemuan;
    let PJ = req.body.pj;
    let kelas = req.body.kelas;
    const listPraktikan = [];
    const curosor = Praktikan.find({ kelas: kelas }).cursor();
    curosor.on('data', doc => {
        listPraktikan.push(doc._id);

    });
    curosor.on('end', doc => {
        let newPraktikum = new Praktikum({
            nama_praktikum: req.body.nama_praktikum,
            kelas: req.body.kelas,
            _PjId: req.body.pj,
            tingkat: 4,
            ruang: req.body.ruang,
            _detailId: []
        });

        if (jlh_pertemuan == 8) {
            let pert1 = new DetailPraktikum({
                _praktikumId: newPraktikum._id,
                kode_praktikum: req.body.kode,
                pertemuan: req.body.pertemuan1,
                shift: req.body.shift,
                tanggal: req.body.tanggal1,
                praktikan: listPraktikan
            });
            let pert2 = new DetailPraktikum({
                _praktikumId: newPraktikum._id,
                kode_praktikum: req.body.kode,
                pertemuan: req.body.pertemuan2,
                shift: req.body.shift,
                tanggal: req.body.tanggal2,
                praktikan: listPraktikan
            });
            let pert3 = new DetailPraktikum({
                _praktikumId: newPraktikum._id,
                kode_praktikum: req.body.kode,
                pertemuan: req.body.pertemuan3,
                shift: req.body.shift,
                tanggal: req.body.tanggal3,
                praktikan: listPraktikan
            });
            let pert4 = new DetailPraktikum({
                _praktikumId: newPraktikum._id,
                kode_praktikum: req.body.kode,
                pertemuan: req.body.pertemuan4,
                shift: req.body.shift,
                tanggal: req.body.tanggal4,
                praktikan: listPraktikan
            });
            let pert5 = new DetailPraktikum({
                _praktikumId: newPraktikum._id,
                kode_praktikum: req.body.kode,
                pertemuan: req.body.pertemuan5,
                shift: req.body.shift,
                tanggal: req.body.tanggal5,
                praktikan: listPraktikan
            });
            let pert6 = new DetailPraktikum({
                _praktikumId: newPraktikum._id,
                kode_praktikum: req.body.kode,
                pertemuan: req.body.pertemuan6,
                shift: req.body.shift,
                tanggal: req.body.tanggal6,
                praktikan: listPraktikan
            });
            let pert7 = new DetailPraktikum({
                _praktikumId: newPraktikum._id,
                kode_praktikum: req.body.kode,
                pertemuan: req.body.pertemuan7,
                shift: req.body.shift,
                tanggal: req.body.tanggal7,
                praktikan: listPraktikan
            });
            let pert8 = new DetailPraktikum({
                _praktikumId: newPraktikum._id,
                kode_praktikum: req.body.kode,
                pertemuan: req.body.pertemuan8,
                shift: req.body.shift,
                tanggal: req.body.tanggal8,
                praktikan: listPraktikan
            });
            newPraktikum._detailId = [
                pert1._id,
                pert2._id,
                pert3._id,
                pert4._id,
                pert5._id,
                pert6._id,
                pert7._id,
                pert8._id,
            ];
            Praktikum.addNewPraktikum(newPraktikum, (err, praktikum) => {
                if (err) {
                    res.json({
                        success: false,
                        msg: err
                    });
                } else {
                    DetailPraktikum.addDetail(pert1, (err, detail1) => {
                        if (err) {
                            res.json({
                                success: false,
                                msg: err
                            });
                        } else {
                            DetailPraktikum.addDetail(pert2, (err, detail2) => {
                                if (err) {
                                    res.json({
                                        success: false,
                                        msg: err
                                    });
                                } else {
                                    DetailPraktikum.addDetail(pert3, (err, detail3) => {
                                        if (err) {
                                            res.json({
                                                success: false,
                                                msg: err
                                            });
                                        } else {
                                            DetailPraktikum.addDetail(pert4, (err, detail4) => {
                                                if (err) {
                                                    res.json({
                                                        success: false,
                                                        msg: err
                                                    });
                                                } else {
                                                    DetailPraktikum.addDetail(pert5, (err, detail5) => {
                                                        if (err) {
                                                            res.json({
                                                                success: false,
                                                                msg: err
                                                            });
                                                        } else {
                                                            DetailPraktikum.addDetail(pert6, (err, detail6) => {
                                                                if (err) {
                                                                    res.json({
                                                                        success: false,
                                                                        msg: err
                                                                    });
                                                                } else {
                                                                    DetailPraktikum.addDetail(pert7, (err, detail7) => {
                                                                        if (err) {
                                                                            res.json({
                                                                                success: false,
                                                                                msg: err
                                                                            });
                                                                        } else {
                                                                            DetailPraktikum.addDetail(pert8, (err, detail8) => {
                                                                                if (err) {
                                                                                    res.json({
                                                                                        success: false,
                                                                                        msg: err
                                                                                    });
                                                                                } else {
                                                                                    petugasPj.updatePraktikum(PJ, newPraktikum._id, (err, data) => {
                                                                                        if (err) {
                                                                                            res.json({
                                                                                                success: false,
                                                                                                msg: err
                                                                                            });
                                                                                        } else {
                                                                                            Praktikan.enrollPraktikum(kelas, newPraktikum._id, (err, data) => {
                                                                                                if (err) {
                                                                                                    res.json({
                                                                                                        success: false,
                                                                                                        msg: err
                                                                                                    });
                                                                                                } else {
                                                                                                    res.json({
                                                                                                        success: true,
                                                                                                        msg: 'Praktikum berhasil di tambah'
                                                                                                    });
                                                                                                }
                                                                                            })
                                                                                        }
                                                                                    });

                                                                                }
                                                                            });
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        } else {
            let pert1 = new DetailPraktikum({
                _praktikumId: newPraktikum._id,
                kode_praktikum: req.body.kode,
                pertemuan: req.body.pertemuan1,
                shift: req.body.shift,
                tanggal: req.body.tanggal1,
                praktikan: listPraktikan
            });
            let pert2 = new DetailPraktikum({
                _praktikumId: newPraktikum._id,
                kode_praktikum: req.body.kode,
                pertemuan: req.body.pertemuan2,
                shift: req.body.shift,
                tanggal: req.body.tanggal2,
                praktikan: listPraktikan
            });
            let pert3 = new DetailPraktikum({
                _praktikumId: newPraktikum._id,
                kode_praktikum: req.body.kode,
                pertemuan: req.body.pertemuan3,
                shift: req.body.shift,
                tanggal: req.body.tanggal3,
                praktikan: listPraktikan
            });
            let pert4 = new DetailPraktikum({
                _praktikumId: newPraktikum._id,
                kode_praktikum: req.body.kode,
                pertemuan: req.body.pertemuan4,
                shift: req.body.shift,
                tanggal: req.body.tanggal4,
                praktikan: listPraktikan
            });
            newPraktikum._detailId = [
                pert1._id,
                pert2._id,
                pert3._id,
                pert4._id,
            ];
            Praktikum.addNewPraktikum(newPraktikum, (err, praktikum) => {
                if (err) {
                    res.json({
                        success: false,
                        msg: err
                    });
                } else {
                    DetailPraktikum.addDetail(pert1, (err, detail1) => {
                        if (err) {
                            res.json({
                                success: false,
                                msg: err
                            });
                        } else {
                            DetailPraktikum.addDetail(pert2, (err, detail2) => {
                                if (err) {
                                    res.json({
                                        success: false,
                                        msg: err
                                    });
                                } else {
                                    DetailPraktikum.addDetail(pert3, (err, detail3) => {
                                        if (err) {
                                            res.json({
                                                success: false,
                                                msg: err
                                            });
                                        } else {
                                            DetailPraktikum.addDetail(pert4, (err, detail4) => {
                                                if (err) {
                                                    res.json({
                                                        success: false,
                                                        msg: err
                                                    });
                                                } else {
                                                    petugasPj.updatePraktikum(PJ, newPraktikum._id, (err, data) => {
                                                        if (err) {
                                                            res.json({
                                                                success: false,
                                                                msg: err
                                                            });
                                                        } else {
                                                            Praktikan.enrollPraktikum(kelas, newPraktikum._id, (err, data) => {
                                                                if (err) {
                                                                    res.json({
                                                                        success: false,
                                                                        msg: err
                                                                    });
                                                                } else {
                                                                    res.json({
                                                                        success: true,
                                                                        msg: 'Praktikum berhasil di tambah'
                                                                    });
                                                                }
                                                            })
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });

});

//GET Praktikan tk 1
router.get('/getPraktikum/tk1', passport.authenticate('jwt', { session: false }), (req, res, next) => {

    Praktikum.PraktikumTk1((praktikum) => {
        res.json({
            success: true,
            praktikum
        })
    });
});

//GET Praktikan tk 2
router.get('/getPraktikum/tk2', passport.authenticate('jwt', { session: false }), (req, res, next) => {

    Praktikum.PraktikumTk2((praktikum) => {
        res.json({
            success: true,
            praktikum
        })
    });
});

//GET Praktikan tk 3
router.get('/getPraktikum/tk3', passport.authenticate('jwt', { session: false }), (req, res, next) => {

    Praktikum.PraktikumTk3((praktikum) => {
        res.json({
            success: true,
            praktikum
        })
    });
});

//GET Praktikan tk 4
router.get('/getPraktikum/tk4', passport.authenticate('jwt', { session: false }), (req, res, next) => {

    Praktikum.PraktikumTk4((praktikum) => {
        res.json({
            success: true,
            praktikum
        })
    });
});

//GET Praktikum by id
router.get('/getPraktikumById/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const id = req.params.id;
    Praktikum.getPraktikumByIdPopulate(id, (praktikum) => {
        res.json({
            success: true,
            praktikum
        })
    });
});

//GET Praktikum by pj
router.get('/getPraktikumByPj/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const id = req.params.id;
    petugasPj.getPjByIdPopulate(id, (data) => {
        res.json({
            success: true,
            data
        })
    });
});

//GET PraktikumDetail by id
router.get('/getPraktikumDetailById/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const id = req.params.id;
    DetailPraktikum.getPraktikumByIdPopulate(id, (praktikum) => {
        res.json({
            success: true,
            praktikum
        })
    });
});

//GET PraktikumDetail by id
router.get('/getAvailablePraktikum/:praktikumDate/:praktikumCode', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const praktikumDate = req.params.praktikumDate;
    const praktikumCode = req.params.praktikumCode;
    // console.log(dateCreate);
    // return false;
    DetailPraktikum.getAvailable(praktikumDate, praktikumCode, (available) => {
        res.json({
            success: true,
            available
        })
        console.log(available);
    });
});

//pullpraktikan
router.post('/pullPraktikan', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    //console.log('test')
    let idPraktikan = req.body.idPraktikan;
    let idPraktikum = req.body.idPraktikum;
    //return false;
    DetailPraktikum.pullPraktikan(idPraktikum, idPraktikan, (err, data) => {
            if (err) throw err;
            Praktikan.removePraktikum(idPraktikan, idPraktikum, (err, data) => {
                console.log('test')
                if (err) {
                    res.json({
                        success: false,
                        msg: err
                    });
                } else {
                    res.json({
                        success: true,
                        msg: 'Praktikan delete'
                    });
                }
            })
        })
        // const cursor = DetailPraktikum.update({ _praktikumId: idPraktikum }, { $pull: { "praktikan": idPraktikan } }).cursor();
        // cursor.on('data', doc => {
        //     console.log('update');
        // })
        // cursor.on('end', doc => {

    // })
})

module.exports = router;