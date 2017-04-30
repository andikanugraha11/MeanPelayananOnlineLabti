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
        type: String,
        uppercase: true
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
    console.log('without flag');
    const query = { _id: id }
    DetailPraktikum.findOne(query)
        .populate('praktikan')
        .populate('_praktikumId')
        .populate({
            'path': 'praktikan_tambahan',
            'populate': [{
                'path': '_praktikanId',
                'model': 'Praktikan'
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

//Get detail by id popultae with flag
// module.exports.getPraktikumByIdPopulateFlag = (id, callback) => {
//     console.log('flag');
//     DetailPraktikum.aggregate([{
//             $match: {
//                 _id: mongoose.Types.ObjectId(id)
//             }
//         },
//         {
//             $project: {
//                 praktikan: 1
//             }
//         }

//     ]).exec((err, result) => {
//         if (err) {
//             console.log(err)
//         } else {
//             DetailPraktikum.populate(result, [{
//                     'path': 'praktikan',
//                 },
//                 // {
//                 //     'path': '_praktikumId',
//                 // },
//                 // {
//                 //     'path': 'praktikan_tambahan',
//                 //     'populate': [{
//                 //         'path': '_praktikanId',
//                 //         'model': 'Praktikan'
//                 //     }]
//                 // }
//             ], (err, result) => {
//                 if (err) throw err;
//                 console.log(result);
//                 callback(result);
//             });
//         }
//     });
// }

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
        DetailPraktikum.populate(result, { 'path': 'praktikum_pengganti._praktikumId' }, (err, result) => {
            if (err) throw err;
            callback(result);
        })
    });
}

//add praktikanREport
module.exports.addPraktikan_tambahan = (detailId, reportId, callback) => {
    const query = { _id: detailId };
    DetailPraktikum.update(query, {
        $push: { "praktikan_tambahan": reportId }
    }, {
        new: true,
    }).exec(callback);
}

//add absen
module.exports.removeFromDetail = (detailId, praktikanId, callback) => {
    const query = { _id: detailId };
    DetailPraktikum.update(query, {
        $pull: { "praktikan": praktikanId }
    }).exec(callback);
}

module.exports.pullPraktikan = (praktikumId, praktikanId, callback) => {
    const query = { _praktikumId: praktikumId };
    //console.log(detailId)
    DetailPraktikum.update(query, {
        $pull: { "praktikan": praktikanId }
    }, {
        multi: true
    }).exec(callback);
}

module.exports.undoPraktikan = (detailId, praktikanId, callback) => {
    const query = { _id: detailId };
    DetailPraktikum.update(query, {
        $push: { "praktikan": praktikanId }
    }, {
        new: true,
    }).exec(callback);
}

// module.exports.cekAbsen = (detailId, praktikanId, callback) => {
//     const query = {
//         _id: detailId,
//         absen: {
//             $elemMatch: { $eq: praktikanId }
//         }
//     };
//     DetailPraktikum.find()
// }