const mongoose = require('mongoose');
const config = require('../config/database');

const Praktikan = require('./praktikanSchema');
const Praktikum = require('./praktikumSchema');
const Report = require('./reportSchema');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const detailPraktikumSchema = Schema({

    //Praktikum
    _praktikumId: {
        type: ObjectId,
        ref: 'Praktikum'
    },
    kode_praktikum: {
        type: String
    },
    pertemuan: {
        type: Number
    },
    shift: {
        type: Number
    },
    tanggal: {
        type: Date
    },
    //Daftar praktikan
    praktikan: [{
        type: ObjectId,
        ref: 'Praktikan'
    }],

    //praktikan tambahan dari laporan
    praktikan_tambahan: [{
        type: ObjectId,
        ref: 'Report'
    }],

});

const DetailPraktikum = module.exports = mongoose.model('DetailPraktikum', detailPraktikumSchema);
//ADD pratikum
module.exports.addDetail = (newDetailPraktikum, callback) => {
    newDetailPraktikum.save(callback);
}

//Get detail by id popultae
module.exports.getPraktikumByIdPopulate = (id, callback) => {
    const query = { _id: id }
    DetailPraktikum.findOne(query)
        .populate('praktikan')
        .populate('_praktikumId')
        .exec((err, result) => {
            if (err) {
                console.log(err);
            } else {
                callback(result);
            }
        })
}

module.exports.getAvailable = (praktikumDate, praktikumCode, callback) => {
    // console.log(dateCreate);
    // console.log(praktikumCode);
    // return false;
    DetailPraktikum.aggregate([{
            $match: {
                kode_praktikum: praktikumCode,
            }
        },
        {
            $project: {
                tanggal: 1,
                shift: 1,
                pertemuan: 1,
                _praktikumId: 1,
                jlhpraktikan: {
                    $size: '$praktikan'
                },
                jlhtambahan: {
                    $size: '$praktikan_tambahan'
                },
                praktikumDate: new Date(praktikumDate),
                deadline: { $add: [new Date(praktikumDate), 1000 * 60 * 60 * 24 * 6] }
            }
        },
        {
            $project: {
                tanggal: 1,
                pertemuan: 1,
                shift: 1,
                _praktikumId: 1,
                praktikumDate: 1,
                deadline: 1,
                dateCreate: 1,
                sumOfPraktikan: { $add: ["$jlhpraktikan", "$jlhtambahan"] },
                beforeDeadline: { $subtract: ["$deadline", "$tanggal"] },
                afterCreated: { $subtract: ["$tanggal", "$praktikumDate"] }
            }
        },
        {
            $project: {
                tanggal: 1,
                pertemuan: 1,
                shift: 1,
                _praktikumId: 1,
                deadline: 1,
                praktikumDate: 1,
                dateCreate: 1,
                kuota: { $subtract: [50, "$sumOfPraktikan"] },
                // test: { $ne: ['$_praktikumId', ObjectId(praktikumId)] },
                testBeforeDeadline: { $divide: ["$beforeDeadline", 1000 * 60 * 60 * 24] },
                testAfterCreted: { $divide: ["$afterCreated", 1000 * 60 * 60 * 24] },
            }
        },
        {
            $match: {
                testBeforeDeadline: { $gte: 0 },
                testAfterCreted: { $gt: 0 },
                kuota: { $gt: 0 }
            }
        }
    ]).exec((err, result) => {
        if (err) throw err;
        DetailPraktikum.populate(result, { 'path': '_praktikumId' }, (err, result) => {
            if (err) throw err;
            callback(result);
        })
    });
}