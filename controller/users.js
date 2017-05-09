const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const nodemailer = require('nodemailer');
const myMail = require('../config/mail');
const path = require('path');
const User = require('../models/userSchema');
const Praktikan = require('../models/praktikanSchema');
const Pj = require('../models/petugasPjSchema');
const Petugas = require('../models/petugasPjSchema');

//tokenget
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({ user: req.user })
});

router.get('/role', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({ role: req.user.role })
});

//verivication

//mailer
const smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: myMail.emailId,
        pass: myMail.emailPassword
    }
});

// router.get('/sendActivation', (req, res) => {
//     const rand = Math.floor((Math.random() * 100) + 54);
//     const host = req.get('host');
//     const link = "http://" + host + "/verify?id=" + rand;
//     const mailOption = {
//         to: "dev.andika.nugraha@gmail.com", //query
//         subject: "Aktivasi Email - Laboratorium Teknik Informatika",
//         html: "Hallo ANNDIKA(QUERY), <br> Silahkan aktivasi email anda dengan membuka email berikut. <br> <a href=" + link + ">Alamat aktivasi</a>"
//     }

//     console.log(mailOption);

//     smtpTransport.sendMail(mailOption, (err, res) => {
//         if (err) {
//             console.log(err);
//             res.end("error");
//         } else {
//             console.log("Message sent: " + res.messageId, res.response);
//             res.end("sent");
//         }
//     })
// })

//Verivikasi
router.get('/verifikasi/:id/:key', (req, res, next) => {
    // console.log(req.params.id);
    // console.log(req.params.key);
    const userId = req.params.id;
    const key = req.params.key;
    const data = {
        userId,
        key
    }
    User.activation(data, (err, user) => {
        if (err) {
            console.log(err);
            res.json({
                success: false,
                msg: err
            });
        } else {
            res.redirect('/suskses');
            // res.json({
            //     success: true,
            //     msg: 'Aktivasi email berhasil'
            // });
        }
    });
});

router.get('/test', (req, res, next) => {
    // console.log(__dirname);
    // console.log(path.join(__dirname + "../test"));
    res.redirect('/suskses');
});
//users/add 
router.post('/add', (req, res, next) => {
    const activationCode = Math.random().toString(36).slice(-8);
    let newUser = new User({
        _praktikanId: req.body._praktikanId,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        key: activationCode
    });
    const npm = req.body.npm;

    const host = req.get('host');
    const link = "http://" + host + "/users/verifikasi/" + newUser._id + "/" + activationCode;
    const mailOption = {
        from: '<Labolatorium Teknik Informatika>',
        to: req.body.email, //query
        subject: "Aktivasi Email - Laboratorium Teknik Informatika",
        html: "Hallo " + req.body.firstName + " " + req.body.lastName + " , <br> Silahkan aktivasi email anda dengan membuka alamat berikut. <br> <a href=" + link + ">Alamat aktivasi</a>"
    }
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
                            smtpTransport.sendMail(mailOption, (err, data) => {
                                if (err) {
                                    console.log(err);
                                }
                            })

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

router.post('/sendKey', (req, res, next) => {
    const email = req.body.email.toLowerCase();
    const key = Math.random().toString().slice(2, 8);
    User.getUserByEmail(email, (err, user) => {
        if (err) {
            return res.json({
                success: false,
                msg: 'Terjadi kesalahan'
            });
        }
        if (!user) {
            return res.json({
                success: false,
                msg: 'User dengan email tersebut tidak ditemukan'
            });
        }
        if (user.isVerified == false) {
            return res.json({
                success: false,
                msg: 'Anda belum melakukan verifikasi email'
            })
        }

        const mailOption = {
            from: '<Labolatorium Teknik Informatika>',
            to: req.body.email, //query
            subject: "Lupa Kata Sandi - Laboratorium Teknik Informatika",
            html: "Hallo " + user.username + " , <br> Berikut adalah kunci rahasia anda. <br> <h1>" + key + "</h1>"
        }
        const data = {
            email: email,
            key: key
        }

        User.addResetKey(data, (err, user) => {
            if (err) {
                res.json({
                    success: false,
                    msg: err
                });
            } else {
                res.json({
                    success: true,
                    msg: 'Email terkirim'
                })
                smtpTransport.sendMail(mailOption, (err, data) => {
                    if (err) {
                        console.log(err);
                    }
                })
            }
        })

    })
});

//check key
router.post('/keyCheck', (req, res, next) => {
    const email = req.body.email;
    const resetkey = req.body.resetKey;
    console.log(resetkey);
    User.getUserByEmail(email, (err, user) => {
        if (err) {
            return res.json({
                success: false,
                msg: 'Terjadi kesalahan'
            });
        }
        if (user.resetkey == resetkey) {
            res.json({
                success: true,
                msg: 'Kunci cocok'
            });
        } else {
            res.json({
                success: false,
                msg: 'Kunci tidak cocok'
            });
        }
    });
});
//resetpasswordbykey
router.post('/resetByKey', (req, res, next) => {
    const data = {
        email: req.body.email,
        resetkey: req.body.resetKey,
        password: req.body.password
    }

    User.resetByKey(data, (err, user) => {
        if (err) {
            res.json({
                success: false,
                msg: 'Terjadi kesalahan'
            });
        } else {
            res.json({
                success: true,
                msg: 'Kata sandi berhasil diperbarui'
            });
        }
    })
});

//user/resend
router.post('/resendActivation', (req, res, next) => {
    const email = req.body.email.toLowerCase();
    User.getUserByEmail(email, (err, user) => {
        if (err) {
            return res.json({
                success: false,
                msg: 'Terjadi kesalahan'
            });
        }
        if (!user) {
            return res.json({
                success: false,
                msg: 'User dengan email tersebut tidak ditemukan'
            });
        }
        if (user.isVerified == true) {
            return res.json({
                success: false,
                msg: 'Anda sudah melakukan verifikasi email'
            })
        }

        const host = req.get('host');
        const link = "http://" + host + "/users/verifikasi/" + user._id + "/" + user.key;
        const mailOption = {
            from: '<Laboratorium Teknik Informatika>',
            to: email, //query
            subject: "Resend Aktivasi Email - Laboratorium Teknik Informatika",
            html: "Hallo " + user.username + " , <br> Silahkan aktivasi email anda dengan membuka alamat berikut. <br> <a href=" + link + ">Alamat aktivasi</a>"
        }

        smtpTransport.sendMail(mailOption, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.json({
                    success: true,
                    msg: 'Email terkirim'
                })
            }
        })
    });
});

//cekpassword
router.post('/cekPassword', (req, res, next) => {
    const inputPassword = req.body.inputPassword;
    const realPassword = req.body.realPassword;
    // console.log(inputPassword);
    // console.log(realPassword);
    User.comparePassword(inputPassword, realPassword, (err, isMatch) => {
        if (err) {
            console.log(err);
        }
        if (isMatch) {
            res.json({
                success: true,
                msg: 'Kata sandi cocok'
            })
        } else {
            res.json({
                success: false,
                msg: 'Kata sandi tidak cocok'
            })
        }
    });
});

//changepassword
router.post('/changePassword', (req, res, next) => {
    const data = {
        userId: req.body.userId,
        password: req.body.password
    }
    User.changePassword(data, (err, user) => {
        if (err) {
            res.json({
                success: false,
                msg: 'Terjadi kesalahan'
            })
        } else {
            res.json({
                success: true,
                msg: 'Kata sandi berhasil di perbarui'
            })
        }
    });
});

//users/auth
router.post('/auth', (req, res, next) => {
    const username = req.body.username.toLowerCase();
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
        if (user.isVerified == false) {
            return res.json({
                success: false,
                msg: 'Anda belum melakukan verifikasi email'
            })
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) {
                console.log(err);
            }
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