const mongoose = require('mongoose');
const config = require('../config/database');

const User = require('./userSchema');
const PJ = require('./petugasPjSchema');
const Praktikan = require('./praktikanSchema');
const DetailPraktikum = require('./detailPraktikumSchema');


const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const praktikumSchema = Schema({
    nama_praktikum: {
        type: String
    },
    kelas: {
        type: String
    },
    //PJ
    _PjId: {
        type: ObjectId,
        ref: 'PetugasPj'
    },
    _detailId: [{
        type: ObjectId,
        ref: 'DetailPraktikum'
    }],
    tingkat: {
        type: Number
    },
});

const Praktikum = module.exports = mongoose.model('Praktikum', praktikumSchema);

//Petugas & PJ Contoroller

//Get PJ by id
module.exports.getPraktikumById = (id, callback) => {
    Praktikum.findById(id, callback);
}

//Get PJ by id popultae
module.exports.getPraktikumByIdPopulate = (id, callback) => {
    const query = { _id: id }
    Praktikum.findOne(query)
        .populate('_detailId')
        .exec((err, result) => {
            if (err) {
                console.log(err);
            } else {
                callback(result);
            }
        })
}

//GET praktikum by Kelas
module.exports.getPraktikumByKelas = (kelas, callback) => {
    const query = { kelas: kelas };
    Praktikum.findOne(query, callback);
}

module.exports.getPraktikumById = (id, callback) => {
    Praktikum.findById(id, callback);
}

//ADD pratikum
module.exports.addNewPraktikum = (newPraktikum, callback) => {
    newPraktikum.save(callback);
}

//Get ALL Praktikum Tk1
module.exports.PraktikumTk1 = (callback) => {
    Praktikum.aggregate([{
            $match: {
                tingkat: 1
            }
        },
        {
            $project: {
                nama_praktikum: 1,
                kelas: 1,
                _PjId: 1,
                jlh_pertemuan: {
                    $size: '$_detailId'
                }

            }
        }
    ]).exec((err, result) => {
        if (err) throw err;
        Praktikum.populate(result, { path: "_PjId" }, (err, result) => {
            if (err) throw err;
            callback(result);
        });
    });
}

//Get ALL Praktikum Tk2
module.exports.PraktikumTk2 = (callback) => {
    Praktikum.aggregate([{
            $match: {
                tingkat: 2
            }
        },
        {
            $project: {
                nama_praktikum: 1,
                kelas: 1,
                _PjId: 1,
                jlh_pertemuan: {
                    $size: '$_detailId'
                }

            }
        }
    ]).exec((err, result) => {
        if (err) throw err;
        Praktikum.populate(result, { path: "_PjId" }, (err, result) => {
            if (err) throw err;
            callback(result);
        });
    });
}

//Get ALL Praktikum Tk3
module.exports.PraktikumTk3 = (callback) => {
    Praktikum.aggregate([{
            $match: {
                tingkat: 3
            }
        },
        {
            $project: {
                nama_praktikum: 1,
                kelas: 1,
                _PjId: 1,
                jlh_pertemuan: {
                    $size: '$_detailId'
                }

            }
        }
    ]).exec((err, result) => {
        if (err) throw err;
        Praktikum.populate(result, { path: "_PjId" }, (err, result) => {
            if (err) throw err;
            callback(result);
        });
    });
}

//Get ALL Praktikum Tk4
module.exports.PraktikumTk4 = (callback) => {
    Praktikum.aggregate([{
            $match: {
                tingkat: 4
            }
        },
        {
            $project: {
                nama_praktikum: 1,
                kelas: 1,
                _PjId: 1,
                jlh_pertemuan: {
                    $size: '$_detailId'
                }

            }
        }
    ]).exec((err, result) => {
        if (err) throw err;
        Praktikum.populate(result, { path: "_PjId" }, (err, result) => {
            if (err) throw err;
            callback(result);
        });
    });
}