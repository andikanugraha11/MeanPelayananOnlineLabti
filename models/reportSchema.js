const mongoose = require('mongoose');
const config = require('../config/database');

const Praktikan = require('./praktikanSchema');
const Praktikum = require('./praktikumSchema');
const DetailPraktikum = require('./detailPraktikumSchema');
const PetugasPj = require('./petugasPjSchema');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const reportSchema = Schema({
    _praktikumId: {
        type: ObjectId,
        ref: 'Praktikum'
    },
    _detailPraktikumId: {
        type: ObjectId,
        ref: 'DetailPraktikum'
    },
    praktikum_pengganti: {
        type: ObjectId,
        ref: 'DetailPraktikum'
    },
    kode_praktikum: {
        type: String
    },
    _praktikanId: {
        type: ObjectId,
        ref: 'Praktikan'
    },
    pembuat: {
        type: ObjectId, //_petugaPjID
        ref: 'PetugasPj'
    },
    keterangan: {
        enum: ['Dikeluarkan', 'Sakit', 'Izin', 'Terlambat']
    },
    status: {
        type: String,
        enum: ['Dibuat', 'Proses', 'Selesai'],
        default: 'Dibuat'
    },
    proses: [],
    //Sudah melakukan pengulangan, Sudah menerima blanko, Sudah membayar
    tanggal_buat: {
        type: Date
    },
    tanggal_lapor: {
        type: Date
    }


});

const Report = module.exports = mongoose.model('Report', reportSchema);

//ADD Rreport
module.exports.addNewReport = (newReport, callback) => {
    newReport.save(callback);
}
module.exports.getReportByPraktikanId = (id, callback) => {
    const query = { _praktikanId: id }
    Report.find(query)
        .populate('_praktikumId')
        .populate('_praktikanId')
        .populate('_detailPraktikumId')
        .populate('pembuat')
        .exec((err, result) => {
            if (err) {
                console.log(err);
            } else {
                callback(result);
            }
        })
}

module.exports.getReportById = (id, callback) => {
    //const query = { _id: id }
    Report.findById(id, callback);
}