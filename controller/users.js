const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const User = require('../models/userSchema');
const Praktikan = require('../models/praktikanSchema');
const Pj = require('../models/petugasPjSchema');
const Petugas = require('../models/petugasPjSchema');

//tokenget
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({ user: req.user })
});
//users/add 
router.post('/add', (req, res, next) => {

    let newUser = new User({
        _praktikanId: req.body._praktikanId,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,

    });
    const npm = req.body.npm;
    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            Praktikan.getPraktikanByNPM(npm, (err, praktikan) => {
                if (err) {
                    res.json({
                        success: false,
                        msg: err
                    });
                } else {
                    praktikan._userId = newUser._id;
                    praktikan.aktif = true;
                    praktikan.save((err, updatedPraktikan) => {
                        if (err) {
                            res.json({
                                success: false,
                                msg: err
                            });
                        } else {
                            res.json({
                                success: true,
                                msg: 'User berhasil ditambah'
                            });
                        }

                    });
                }
            });

        }
    });
});

//setPasswordToNpm
router.post('/setPasswordToNpm', (req, res, next) => {

    const id = req.body.id;
    const npm = req.body.npm;

    User.setPasswordToNpm(id, npm, (err, user) => {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            res.json({
                success: true,
                msg: 'Password Berhasil di reset'
            });
        }
    });

});
//users/add/admin
router.post('/add/admin', (req, res, next) => {

    let newUser = new User({
        //_praktikanId: req.body._praktikanId,
        role: 'admin',
        isVerified: true,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,

    });
    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            res.json({
                success: true,
                msg: 'Admin berhasil ditambah'
            });
        }
    });

});

//users/add/pj
router.post('/add/pj', (req, res, next) => {
    let newUser = new User({
        role: 'pj',
        isVerified: true,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    });

    let newPJ = new Pj({
        nama: {
            depan: req.body.nama.depan,
            belakang: req.body.nama.belakang
        },
        npm: req.body.npm,
        _userId: newUser._id
    });

    newUser._pjId = newPJ._id;
    // console.log(newUser);
    // console.log(newPJ);
    // return false;
    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({ success: false, msg: err });
        } else {
            Pj.addPetugasPj(newPJ, (err, pj) => {
                if (err) {
                    res.json({ success: false, msg: err });
                } else {
                    res.json({ success: true, msg: 'PJ Berhasil ditambah' });
                }
            });
        }
    })
});



//user/get/pj
router.get('/getAllPj', passport.authenticate('jwt', { session: false }), (req, res, next) => {

    User.getAllPJPopulate((pj) => {
        res.json({
            success: true,
            pj
        })
    });
});

//user/get/petugas
router.get('/getAllPetugas', (req, res, next) => {

    User.getAllPetugasPopulate((petugas) => {
        res.json({
            success: true,
            petugas
        })
    });
});

//users/auth
router.post('/auth', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) {
            console.log(err)
        }
        if (!user) {
            return res.json({
                success: false,
                msg: 'User tidak ditemukan'
            });
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800 // 1 week
                });
                res.json({
                    success: true,
                    token: `JWT ${token}`,
                    user: {
                        id: user._id,
                        nama: user.nama,
                        username: user.username,
                        //role: user.role
                    },
                    role: user.role
                });
            } else {
                return res.json({
                    success: false,
                    msg: 'Password salah'
                });
            }
        });
    });
});

//Remove PJ
router.delete('/removePJ/:id', (req, res, next) => {
    const id = req.params.id;
    User.removePJId(id, (err, data) => {
        if (err) {
            alert(err);
        } else {
            Pj.removeByUserId(id, (err, data) => {
                res.json({
                    success: true,
                    data
                });
            });

        }
    });
});

//users/add/petugas
router.post('/add/petugas', (req, res, next) => {
    let newUser = new User({
        role: 'petugas',
        isVerified: true,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    });

    let newPetugas = new Petugas({
        nama: {
            depan: req.body.nama.depan,
            belakang: req.body.nama.belakang
        },
        _userId: newUser._id
    });

    newUser._petugasId = newPetugas._id;
    // console.log(newUser);
    // console.log(newPetugas);
    // return false;
    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({ success: false, msg: err });
        } else {
            Pj.addPetugasPj(newPetugas, (err, petugas) => {
                if (err) {
                    res.json({ success: false, msg: err });
                } else {
                    res.json({
                        success: true,
                        msg: 'Petugas Berhasil ditambah',
                        data: petugas
                    });
                }
            });
        }
    })
});

//Remove Petugas
router.delete('/removePetugas/:id', (req, res, next) => {
    const id = req.params.id;
    User.removePetugasId(id, (err, data) => {
        if (err) {
            alert(err);
        } else {
            Petugas.removeByUserId(id, (err, data) => {
                res.json({
                    success: true,
                    data
                });
            });

        }
    });
});


module.exports = router;