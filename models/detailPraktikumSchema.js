const mongoose = require('mongoose');
const config = require('../config/database');

const Praktikan = require('./praktikanSchema');
const Laporan = require('./LaporanSchema');
const Praktikum = require('./praktikumSchema');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const detailPraktikumSchema = Schema({

    //Praktikum
    _praktikumId: {
        type: ObjectId,
        ref: 'Praktikum'
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
        ref: 'Laporan'
    }],

});

const DetailPraktikum = module.exports = mongoose.model('DetailPraktikum', detailPraktikumSchema);
//ADD pratikum
module.exports.addDetail = (newDetailPraktikum, callback) => {
    newDetailPraktikum.save(callback);
}