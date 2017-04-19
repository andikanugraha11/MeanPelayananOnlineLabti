const mongoose = require('mongoose');
const config = require('../config/database');

const User = require('./userSchema');
const Praktikan = require('./praktikanSchema');
const Praktikum = require('./praktikumSchema');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const laporanSchema = Schema({
    _praktikumId: {
        type: ObjectId,
        ref: 'Praktikum'
    },
    _praktikanId: {
        type: ObjectId,
        ref: 'Praktikan'
    },
    pembuat: {
        type: ObjectId, //_petugaPjID
        // required: true
    },
    keterangan: {
        enum: ['Dikeluarkan', 'Sakit', 'Izin', 'Terlambat']
    },
    status: {
        type: String,
        enum: ['Proses', 'Selesai'],
        default: 'Proses'
    },
    proses: {
        type: Array
            //Sudah melakukan pengulangan, Sudah menerima blanko, Sudah membayar
    },
    tanggal_buat: {
        type: Date
    },
    praktikum_pengganti: {
        type: ObjectId,
        ref: 'Praktikum'
    },

});

const Laporan = module.exports = mongoose.model('laporan', laporanSchema);

//Petugas & PJ Contoroller

//Get PJ by id
module.exports.getPraktikumById = (id, callback) => {
    Praktikum.findById(id, callback);
}

//GET praktikum by Kelas
module.exports.getPraktikumByKelas = (kelas, callback) => {
    const query = { kelas: kelas };
    Praktikum.findOne(query, callback);
}

//ADD pratikum
module.exports.addPraktikum = (newPraktikum, callback) => {
    newPraktikum.save(callback);
}