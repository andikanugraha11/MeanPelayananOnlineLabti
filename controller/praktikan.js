const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const fs = require('fs');
const csv = require('fast-csv');
const multer = require('multer');
const User = require('../models/userSchema');
const Praktikan = require('../models/praktikanSchema');

//users/add 
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    let newPraktikan = new Praktikan({
        npm: req.body.npm,
        nama: {
            depan: req.body.nama.depan,
            belakang: req.body.nama.belakang
        },
        kelas: req.body.kelas
    });
    Praktikan.addPraktikan(newPraktikan, (err, praktikan) => {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            res.json({
                success: true,
                msg: "Praktikan berhasil ditambah"
            });
        }
    });
});

router.get('/getAllPraktikan', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    Praktikan.getAllPraktikan((err, praktikan) => {
        if (err) {
            console.log(err)
        } else {
            res.json({
                success: true,
                praktikan
            });
        }
    });

});

router.get('/getAllPraktikanActive', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    Praktikan.getAllPraktikanActive((err, praktikan) => {
        if (err) {
            console.log(err)
        } else {
            res.json({
                success: true,
                praktikan
            });
        }
    });

});

router.get('/getAllPraktikanNotActive', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    Praktikan.getAllPraktikanNotActive((err, praktikan) => {
        if (err) {
            console.log(err)
        } else {
            res.json({
                success: true,
                praktikan
            });
        }
    });

});

router.get('/getPraktikanById/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const id = req.params.id;
    Praktikan.getPraktikanById(id, (err, praktikan) => {
        if (err) {
            console.log(err)
        } else {
            res.json({
                success: true,
                praktikan
            });
        }
    });

});

router.get('/getPraktikanByIdPopulate/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const id = req.params.id;
    Praktikan.getPraktikanByIdPopulate(id, (data) => {
        res.json({
            success: true,
            data
        })
    });

});


//REMOVE Praktikan
router.delete('/removePraktikan/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const id = req.params.id;
    Praktikan.removePraktikanById(id, (err, data) => {
        if (err) {
            alert(err);
        } else {
            res.json({
                success: true,
                data
            });
        }
    });
});

router.post('/isNpmExist', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const npm = req.body.npm.toLowerCase();
    // console.log(username);
    Praktikan.getPraktikanByNpm(npm, (err, data) => {
        if (data) {
            res.json({
                exist: true,
            })
        }
        if (!data) {
            res.json({
                exist: false,
            })
        }

    });
});


//PUBLIC CONTROLLER

//getPraktikanBy
router.post('/getPraktikanByNpmAndKelas', (req, res, next) => {
    let findPraktikan = {
        npm: req.body.npm.toUpperCase(),
        kelas: req.body.kelas.toUpperCase(),
        aktif: false
    }
    Praktikan.getPraktikanByNpmAndKelas(findPraktikan, (err, praktikan) => {
        if (err) {
            res.json({
                success: false,
                msg: 'Gagal mencari data'
            });
        } else if (praktikan == null) {
            res.json({
                success: false,
                msg: 'Praktikan tidak ditemukan'
            });
        } else {
            res.json({
                success: true,
                praktikan
            });
        }
    });
});

module.exports = router;