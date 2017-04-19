const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const User = require('../models/userSchema');
const Praktikan = require('../models/praktikanSchema');

//users/add 
router.post('/add', (req, res, next) => {
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

//getPraktikanBy
router.post('/getPraktikanByNpmAndKelas', (req, res, next) => {
    let findPraktikan = {
        npm: req.body.npm,
        kelas: req.body.kelas,
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


//Get all praktikan
// router.get('/profile', passport.authenticate('jwt', {session:false}) , (req,res,next)=>{
// 	res.json({user: req.user})
// });
router.get('/getAllPraktikan', (req, res, next) => {
    Praktikan.getAllPraktikan((err, praktikan) => {
        if (err) {
            alert(err)
        } else {
            res.json({
                success: true,
                praktikan
            });
        }
    });

});

//REMOVE Praktikan
router.delete('/removePraktikan/:id', (req, res, next) => {
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

module.exports = router;