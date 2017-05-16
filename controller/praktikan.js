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


//Get all praktikan
// router.get('/profile', passport.authenticate('jwt', {session:false}) , (req,res,next)=>{
// 	res.json({user: req.user})
// });
router.get('/getAllPraktikan', (req, res, next) => {
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

router.get('/getAllPraktikanActive', (req, res, next) => {
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

router.get('/getAllPraktikanNotActive', (req, res, next) => {
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

router.get('/getPraktikanById/:id', (req, res, next) => {
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

router.get('/getPraktikanByIdPopulate/:id', (req, res, next) => {
    const id = req.params.id;
    Praktikan.getPraktikanByIdPopulate(id, (data) => {
        res.json({
            success: true,
            data
        })
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

router.post('/isNpmExist', (req, res, next) => {
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

// //Multer
// const storage = multer.diskStorage({
//     // destino del fichero
//     destination: (req, file, cb) => {
//         cb(null, './uploads/data/')
//     },
//     // renombrar fichero
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//     }
// });

// const upload = multer({ storage: storage });

// router.post("/uploadcsvfile", upload.array("uploads[]", 12), (req, res) => {
//     const path = req.files[0].path;

//     fs.exists(path, (exists) => {
//         if (exists) {
//             const stream = fs.createReadStream(path);
//             csv.fromStream(stream, {
//                     headers: [
//                         'depan',
//                         'belakang',
//                         'kelas',
//                         'npm'
//                     ]
//                 })
//                 .on('data', (data) => {
//                     const newPraktikan = new Praktikan({
//                         npm: data['npm'],
//                         nama: {
//                             depan: data['depan'],
//                             belakang: data['belakang']
//                         },
//                         kelas: data['kelas']
//                     });
//                     Praktikan.addPraktikan(newPraktikan, (err, praktikan) => {
//                         if (err) {
//                             res.json({
//                                 success: false,
//                                 msg: err
//                             });
//                         } else {
//                             res.json({
//                                 success: true,
//                                 msg: "Praktikan berhasil ditambah"
//                             });
//                         }
//                     });
//                 })
//                 .on("end", function() {
//                     console.log("done");
//                 });
//         }
//     });
//     // const pathold = "./uploads/data/" + req.files[0].filename;
//     // const pathnew = "./uploads/archived/" + req.files[0].filename;


//     // fs.rename(pathold, pathnew, (err) => {
//     //     console.log('rename callback ', err);
//     // })
// });
// //upload csv
// router.post('/uploadcsv', (req, res, next) => {

//     return false;
//     console.log(req.body.dataFile)

//     const path = '../public/upload' + req.params.file + '.csv';
//     fs.exists(path, (exists) => {
//         if (exists) {
//             const stream = fs.createReadStream(path);
//             csv.fromStream(stream, {
//                     header: [
//                         'depan',
//                         'belakang',
//                         'kelas',
//                         'npm'
//                     ]
//                 })
//                 .on('data', (data) => {
//                     const newPraktikan = new Praktikan({
//                         npm: data['npm'],
//                         nama: {
//                             depan: data['depan'],
//                             belakang: data['belakang']
//                         },
//                         kelas: data['kelas']
//                     });
//                     Praktikan.addPraktikan(newPraktikan, (err, praktikan) => {
//                         if (err) {
//                             res.json({
//                                 success: false,
//                                 msg: err
//                             });
//                         } else {
//                             res.json({
//                                 success: true,
//                                 msg: "Praktikan berhasil ditambah"
//                             });
//                         }
//                     });
//                 });
//         }
//     });
//     const pathold = "./upload/" + req.params.file + ".csv";
//     const pathnew = "./upload/archived/" + req.params.file + ".csv";


//     fs.rename(pathold, pathnew, (err) => {
//         console.log('rename callback ', err);
//     })
// });
module.exports = router;