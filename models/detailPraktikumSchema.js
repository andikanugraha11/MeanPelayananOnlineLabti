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