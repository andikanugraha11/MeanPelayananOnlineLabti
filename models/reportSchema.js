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
        type: String,
        uppercase: true
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
        enum: ['Dikeluarkan', 'Sakit', 'Izin', 'Terlambat', 'Tanpa Keterangan']
    },
    status: {
        type: String,
        enum: ['Dibuat', 'Proses', 'Selesai'],
        default: 'Dibuat'
    },
    proses: {
        pengulangan: {
            type: Boolean,
            default: false
        },
        pembayaran: {
            type: Boolean,
            default: false
        }
    },
    //Sudah melakukan pengulangan, Sudah menerima blanko, Sudah membayar
    tanggal: {
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

//Status = Dibuat
module.exports.getReportByPraktikanId = (id, callback) => {
    const query = {
        _praktikanId: id,
        status: 'Dibuat'
    }
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

module.exports.getReportCreatedByPjId = (PjId, callback) => {
    const query = {
        pembuat: PjId,
        status: 'Dibuat'
    }
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

//Report on progress (praktikan)
module.exports.getReportOnProgressByPraktikanId = (id, callback) => {
    const query = {
        _praktikanId: id,
        status: 'Proses'
    }
    Report.find(query)
        .populate('_praktikumId')
        .populate('_praktikanId')
        .populate('_detailPraktikumId')
        .populate({
            'path': 'praktikum_pengganti',
            'populate': [{
                'path': '_praktikumId',
                'model': 'Praktikum'
            }]
        })
        .exec((err, result) => {
            if (err) {
                console.log(err);
            } else {
                callback(result);
            }
        })
}

//Report complete (praktikan)
module.exports.getReportCompleteByPraktikanId = (id, callback) => {
    const query = {
        _praktikanId: id,
        status: 'Selesai'
    }
    Report.find(query)
        .populate('_praktikumId')
        .populate('_praktikanId')
        .populate('_detailPraktikumId')
        .populate({
            'path': 'praktikum_pengganti',
            'populate': [{
                'path': '_praktikumId',
                'model': 'Praktikum'
            }]
        })
        .exec((err, result) => {
            if (err) {
                console.log(err);
            } else {
                callback(result);
            }
        })
}

//Report complete (PJ)
module.exports.getReportCompleteByPjId = (id, callback) => {
        const query = {
            pembuat: id,
            status: 'Selesai'
        }
        Report.find(query)
            .populate('_praktikumId')
            .populate('_praktikanId')
            .populate('_detailPraktikumId')
            .populate({
                'path': 'praktikum_pengganti',
                'populate': [{
                    'path': '_praktikumId',
                    'model': 'Praktikum'
                }]
            })
            .exec((err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    callback(result);
                }
            })
    }
    //Report on progress (PJ)
module.exports.getReportOnProgressByPjId = (PjId, callback) => {
        const query = {
            pembuat: PjId,
            status: 'Proses'
        }
        Report.find(query)
            .populate('_praktikumId')
            .populate('_praktikanId')
            .populate('_detailPraktikumId')
            .populate({
                'path': 'praktikum_pengganti',
                'populate': [{
                    'path': '_praktikumId',
                    'model': 'Praktikum'
                }]
            })
            .exec((err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    callback(result);
                }
            })
    }
    //Report All Report 
module.exports.getAllReport = (callback) => {
    const query = {}
    Report.find(query)
        .exec((err, result) => {
            if (err) {
                console.log(err);
            } else {
                callback(err, result);
            }
        })
}

//Report All Created 
module.exports.getAllReportCreated = (callback) => {
    const query = {
        status: 'Dibuat'
    }
    Report.find(query)
        .exec((err, result) => {
            if (err) {
                console.log(err);
            } else {
                callback(err, result);
            }
        })
}

//Report All Report (OnProgress)
module.exports.getAllReportOnProgress = (callback) => {
    const query = {
        status: 'Proses'
    }
    Report.find(query)
        .populate('_praktikumId')
        .populate('_praktikanId')
        .populate('pembuat')
        .populate('_detailPraktikumId')
        .populate({
            'path': 'praktikum_pengganti',
            'populate': [{
                'path': '_praktikumId',
                'model': 'Praktikum'
            }]
        })
        .exec((err, result) => {
            if (err) {
                console.log(err);
            } else {
                callback(err, result);
            }
        })
}


//Report All Report (complete)
module.exports.getAllReportComplete = (callback) => {
    const query = {
        status: 'Selesai'
    }
    Report.find(query)
        .populate('_praktikumId')
        .populate('_praktikanId')
        .populate('pembuat')
        .populate('_detailPraktikumId')
        .populate({
            'path': 'praktikum_pengganti',
            'populate': [{
                'path': '_praktikumId',
                'model': 'Praktikum'
            }]
        })
        .exec((err, result) => {
            if (err) {
                console.log(err);
            } else {
                callback(err, result);
            }
        })
}

module.exports.getReportById = (id, callback) => {
    //const query = { _id: id }
    Report.findById(id, callback);
}

module.exports.getReportPraktikan = (praktikanId, praktikumId, callback) => {
    //console.log('without flag');
    const query = {
        _praktikanId: praktikanId,
        _praktikumId: praktikumId
    }
    console.log(query);
    Report.find(query).exec((err, result) => {
        if (err) {
            console.log(err);
        } else {
            callback(result);
        }
    })
}

module.exports.updatePengulangan = (id, callback) => {
    Report.findByIdAndUpdate(id, { $set: { "proses.pengulangan": true } }, callback);
}

module.exports.confirmPayment = (id, callback) => {
    Report.findByIdAndUpdate(id, { $set: { "proses.pembayaran": true, "status": "Selesai" } }, callback);
}


module.exports.praktikanDoReport = (reportId, updateReport, callback) => {
    // console.log(updateReport);
    const query = { _id: reportId };
    Report.update(query, updateReport, {
        new: true
    }).exec(callback);
}

module.exports.removeReport = (reportId, callback) => {
    const query = { _id: reportId };
    Report.remove(query, callback)
}

// module.exports.praktikanDoReport = (reportId, updateReport, callback) => {
//     // console.log(updateReport);
//     const query = { _id: reportId };
//     Report.update(query, {
//         $push: {
//             "praktikum_pengganti": updateReport.praktikum_pengganti
//         },
//         $set: {
//             "tanggal_lapor": updateReport.tanggal_lapor,
//             "keterangan": updateReport.keterangan
//         }
//     }, {
//         new: true
//     }).exec(callback);
// }