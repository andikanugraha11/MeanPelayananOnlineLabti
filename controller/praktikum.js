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
router.post('/add/tingkat1', (req, res, next) => {
    let jlh_pertemuan = req.body.jlh_pertemuan;
    let PJ = req.body.pj;
    let kelas = req.body.kelas;
    // console.log(jlh_pertemuan);
    let newPraktikum = new Praktikum({
        nama_praktikum: req.body.nama_praktikum,
        kelas: req.body.kelas,
        _PjId: req.body.pj,
        tingkat: 1,
        _detailId: []
    });

    if (jlh_pertemuan == 8) {
        let pert1 = new DetailPraktikum({
            _praktikumId: newPraktikum._id,
            pertemuan: req.body.pertemuan1,
            shift: req.body.shift,
            tanggal: req.body.tanggal1
        });
        let pert2 = new DetailPraktikum({
            _praktikumId: newPraktikum._id,
            pertemuan: req.body.pertemuan2,
            shift: req.body.shift,
            tanggal: req.body.tanggal2
        });
        let pert3 = new DetailPraktikum({
            _praktikumId: newPraktikum._id,
            pertemuan: req.body.pertemuan3,
            shift: req.body.shift,
            tanggal: req.body.tanggal3
        });
        let pert4 = new DetailPraktikum({
            _praktikumId: newPraktikum._id,
            pertemuan: req.body.pertemuan4,
            shift: req.body.shift,
            tanggal: req.body.tanggal4
        });
        let pert5 = new DetailPraktikum({
            _praktikumId: newPraktikum._id,
            pertemuan: req.body.pertemuan5,
            shift: req.body.shift,
            tanggal: req.body.tanggal5
        });
        let pert6 = new DetailPraktikum({
            _praktikumId: newPraktikum._id,
            pertemuan: req.body.pertemuan6,
            shift: req.body.shift,
            tanggal: req.body.tanggal6
        });
        let pert7 = new DetailPraktikum({
            _praktikumId: newPraktikum._id,
            pertemuan: req.body.pertemuan7,
            shift: req.body.shift,
            tanggal: req.body.tanggal7
        });
        let pert8 = new DetailPraktikum({
            _praktikumId: newPraktikum._id,
            pertemuan: req.body.pertemuan8,
            shift: req.body.shift,
            tanggal: req.body.tanggal8
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
            pertemuan: req.body.pertemuan1,
            shift: req.body.shift,
            tanggal: req.body.tanggal1
        });
        let pert2 = new DetailPraktikum({
            _praktikumId: newPraktikum._id,
            pertemuan: req.body.pertemuan2,
            shift: req.body.shift,
            tanggal: req.body.tanggal2
        });
        let pert3 = new DetailPraktikum({
            _praktikumId: newPraktikum._id,
            pertemuan: req.body.pertemuan3,
            shift: req.body.shift,
            tanggal: req.body.tanggal3
        });
        let pert4 = new DetailPraktikum({
            _praktikumId: newPraktikum._id,
            pertemuan: req.body.pertemuan4,
            shift: req.body.shift,
            tanggal: req.body.tanggal4
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

//praktikum/add/tingkat2 
router.post('/add/tingkat2', (req, res, next) => {
    let jlh_pertemuan = req.body.jlh_pertemuan;
    let PJ = req.body.pj;
    let kelas = req.body.kelas;
    // console.log(jlh_pertemuan);
    let newPraktikum = new Praktikum({
        nama_praktikum: req.body.nama_praktikum,
        kelas: req.body.kelas,
        _PjId: req.body.pj,
        tingkat: 2,
        _detailId: []
    });

    if (jlh_pertemuan == 8) {
        let pert1 = new DetailPraktikum({
            _praktikumId: newPraktikum._id,
            pertemuan: req.body.pertemuan1,
            shift: req.body.shift,
            tanggal: req.body.tanggal1
        });
        let pert2 = new DetailPraktikum({
            _praktikumId: newPraktikum._id,
            pertemuan: req.body.pertemuan2,
            shift: req.body.shift,
            tanggal: req.body.tanggal2
        });
        let pert3 = new DetailPraktikum({
            _praktikumId: newPraktikum._id,
            pertemuan: req.body.pertemuan3,
            shift: req.body.shift,
            tanggal: req.body.tanggal3
        });
        let pert4 = new DetailPraktikum({
            _praktikumId: newPraktikum._id,
            pertemuan: req.body.pertemuan4,
            shift: req.body.shift,
            tanggal: req.body.tanggal4
        });
        let pert5 = new DetailPraktikum({
            _praktikumId: newPraktikum._id,
            pertemuan: req.body.pertemuan5,
            shift: req.body.shift,
            tanggal: req.body.tanggal5
        });
        let pert6 = new DetailPraktikum({
            _praktikumId: newPraktikum._id,
            pertemuan: req.body.pertemuan6,
            shift: req.body.shift,
            tanggal: req.body.tanggal6
        });
        let pert7 = new DetailPraktikum({
            _praktikumId: newPraktikum._id,
            pertemuan: req.body.pertemuan7,
            shift: req.body.shift,
            tanggal: req.body.tanggal7
        });
        let pert8 = new DetailPraktikum({
            _praktikumId: newPraktikum._id,
            pertemuan: req.body.pertemuan8,
            shift: req.body.shift,
            tanggal: req.body.tanggal8
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
            pertemuan: req.body.pertemuan1,
            shift: req.body.shift,
            tanggal: req.body.tanggal1
        });
        let pert2 = new DetailPraktikum({
            _praktikumId: newPraktikum._id,
            pertemuan: req.body.pertemuan2,
            shift: req.body.shift,
            tanggal: req.body.tanggal2
        });
        let pert3 = new DetailPraktikum({
            _praktikumId: newPraktikum._id,
            pertemuan: req.body.pertemuan3,
            shift: req.body.shift,
            tanggal: req.body.tanggal3
        });
        let pert4 = new DetailPraktikum({
            _praktikumId: newPraktikum._id,
            pertemuan: req.body.pertemuan4,
            shift: req.body.shift,
            tanggal: req.body.tanggal4
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

//praktikum/add/tingkat3 
router.post('/add/tingkat3', (req, res, next) => {
    let jlh_pertemuan = req.body.jlh_pertemuan;
    let PJ = req.body.pj;
    let kelas = req.body.kelas;
    // console.log(jlh_pertemuan);
    let newPraktikum = new Praktikum({
        nama_praktikum: req.body.nama_praktikum,
        kelas: req.body.kelas,
        _PjId: req.body.pj,
        tingkat: 3,
        _detailId: []
    });

    if (jlh_pertemuan == 8) {
        let pert1 = new DetailPraktikum({
            _praktikumId: newPraktikum._id,
            pertemuan: req.body.pertemuan1,
            shift: req.body.shift,
            tanggal: req.body.tanggal1
        });
        let pert2 = new DetailPraktikum({
            _praktikumId: newPraktikum._id,
            pertemuan: req.body.pertemuan2,
            shift: req.body.shift,
            tanggal: req.body.tanggal2
        });
        let pert3 = new DetailPraktikum({
            _praktikumId: newPraktikum._id,
            pertemuan: req.body.pertemuan3,
            shift: req.body.shift,
            tanggal: req.body.tanggal3
        });
        let pert4 = new DetailPraktikum({
            _praktikumId: newPraktikum._id,
            pertemuan: req.body.pertemuan4,
            shift: req.body.shift,
            tanggal: req.body.tanggal4
        });
        let pert5 = new DetailPraktikum({
            _praktikumId: newPraktikum._id,
            pertemuan: req.body.pertemuan5,
            shift: req.body.shift,
            tanggal: req.body.tanggal5
        });
        let pert6 = new DetailPraktikum({
            _praktikumId: newPraktikum._id,
            pertemuan: req.body.pertemuan6,
            shift: req.body.shift,
            tanggal: req.body.tanggal6
        });
        let pert7 = new DetailPraktikum({
            _praktikumId: newPraktikum._id,
            pertemuan: req.body.pertemuan7,
            shift: req.body.shift,
            tanggal: req.body.tanggal7
        });
        let pert8 = new DetailPraktikum({
            _praktikumId: newPraktikum._id,
            pertemuan: req.body.pertemuan8,
            shift: req.body.shift,
            tanggal: req.body.tanggal8
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
            pertemuan: req.body.pertemuan1,
            shift: req.body.shift,
            tanggal: req.body.tanggal1
        });
        let pert2 = new DetailPraktikum({
            _praktikumId: newPraktikum._id,
            pertemuan: req.body.pertemuan2,
            shift: req.body.shift,
            tanggal: req.body.tanggal2
        });
        let pert3 = new DetailPraktikum({
            _praktikumId: newPraktikum._id,
            pertemuan: req.body.pertemuan3,
            shift: req.body.shift,
            tanggal: req.body.tanggal3
        });
        let pert4 = new DetailPraktikum({
            _praktikumId: newPraktikum._id,
            pertemuan: req.body.pertemuan4,
            shift: req.body.shift,
            tanggal: req.body.tanggal4
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

//praktikum/add/tingkat4 
router.post('/add/tingkat4', (req, res, next) => {
    let jlh_pertemuan = req.body.jlh_pertemuan;
    let PJ = req.body.pj;
    let kelas = req.body.kelas;
    // console.log(jlh_pertemuan);
    let newPraktikum = new Praktikum({
        nama_praktikum: req.body.nama_praktikum,
        kelas: req.body.kelas,
        _PjId: req.body.pj,
        tingkat: 4,
        _detailId: []
    });

    if (jlh_pertemuan == 8) {
        let pert1 = new DetailPraktikum({
            _praktikumId: newPraktikum._id,
            pertemuan: req.body.pertemuan1,
            shift: req.body.shift,
            tanggal: req.body.tanggal1
        });
        let pert2 = new DetailPraktikum({
            _praktikumId: newPraktikum._id,
            pertemuan: req.body.pertemuan2,
            shift: req.body.shift,
            tanggal: req.body.tanggal2
        });
        let pert3 = new DetailPraktikum({
            _praktikumId: newPraktikum._id,
            pertemuan: req.body.pertemuan3,
            shift: req.body.shift,
            tanggal: req.body.tanggal3
        });
        let pert4 = new DetailPraktikum({
            _praktikumId: newPraktikum._id,
            pertemuan: req.body.pertemuan4,
            shift: req.body.shift,
            tanggal: req.body.tanggal4
        });
        let pert5 = new DetailPraktikum({
            _praktikumId: newPraktikum._id,
            pertemuan: req.body.pertemuan5,
            shift: req.body.shift,
            tanggal: req.body.tanggal5
        });
        let pert6 = new DetailPraktikum({
            _praktikumId: newPraktikum._id,
            pertemuan: req.body.pertemuan6,
            shift: req.body.shift,
            tanggal: req.body.tanggal6
        });
        let pert7 = new DetailPraktikum({
            _praktikumId: newPraktikum._id,
            pertemuan: req.body.pertemuan7,
            shift: req.body.shift,
            tanggal: req.body.tanggal7
        });
        let pert8 = new DetailPraktikum({
            _praktikumId: newPraktikum._id,
            pertemuan: req.body.pertemuan8,
            shift: req.body.shift,
            tanggal: req.body.tanggal8
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
            pertemuan: req.body.pertemuan1,
            shift: req.body.shift,
            tanggal: req.body.tanggal1
        });
        let pert2 = new DetailPraktikum({
            _praktikumId: newPraktikum._id,
            pertemuan: req.body.pertemuan2,
            shift: req.body.shift,
            tanggal: req.body.tanggal2
        });
        let pert3 = new DetailPraktikum({
            _praktikumId: newPraktikum._id,
            pertemuan: req.body.pertemuan3,
            shift: req.body.shift,
            tanggal: req.body.tanggal3
        });
        let pert4 = new DetailPraktikum({
            _praktikumId: newPraktikum._id,
            pertemuan: req.body.pertemuan4,
            shift: req.body.shift,
            tanggal: req.body.tanggal4
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

//GET Praktikan tk 1
router.get('/getPraktikum/tk1', (req, res, next) => {

    Praktikum.PraktikumTk1((praktikum) => {
        res.json({
            success: true,
            praktikum
        })
    });
});

//GET Praktikan tk 2
router.get('/getPraktikum/tk2', (req, res, next) => {

    Praktikum.PraktikumTk2((praktikum) => {
        res.json({
            success: true,
            praktikum
        })
    });
});

//GET Praktikan tk 3
router.get('/getPraktikum/tk3', (req, res, next) => {

    Praktikum.PraktikumTk3((praktikum) => {
        res.json({
            success: true,
            praktikum
        })
    });
});

//GET Praktikan tk 4
router.get('/getPraktikum/tk4', (req, res, next) => {

    Praktikum.PraktikumTk4((praktikum) => {
        res.json({
            success: true,
            praktikum
        })
    });
});

//GET Praktikum by id
router.get('/getPraktikumById/:id', (req, res, next) => {
    const id = req.params.id;
    Praktikum.getPraktikumByIdPopulate(id, (praktikum) => {
        res.json({
            success: true,
            praktikum
        })
    });
});

module.exports = router;