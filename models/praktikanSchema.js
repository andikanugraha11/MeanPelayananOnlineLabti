const mongoose = require('mongoose');
const config = require('../config/database');
const User = require('./userSchema');
const Praktikum = require('./praktikumSchema');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const praktikanSchema = Schema({

    npm: {
        type: String,
        required: true,
        unique: true,
        uppercase: true
    },
    nama: {
        depan: {
            type: String,
            required: true
        },
        belakang: {
            type: String
        }
    },
    kelas: {
        type: String,
        uppercase: true,
        trim: true
    },
    aktif: {
        type: Boolean,
        default: false
    },
    _userId: {
        type: ObjectId,
        ref: 'User',
    },
    _praktikumId: [{
        type: ObjectId,
        ref: 'Praktikum'
    }]
});

const Praktikan = module.exports = mongoose.model('Praktikan', praktikanSchema);

//ADD praktikan
module.exports.addPraktikan = (newPraktikan, callback) => {
    newPraktikan.save(callback);
}

//Get User by id
module.exports.getPraktikanById = (id, callback) => {
    Praktikan.findById(id, callback);
}
module.exports.getPraktikanByIdPopulate = (id, callback) => {
        const query = { _id: id }
        Praktikan.findOne(query)
            .populate({
                'path': '_praktikumId',
                'populate': [{
                    'path': '_PjId',
                    'model': 'PetugasPj'
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
    //GET praktikan by NPM
module.exports.getPraktikanByNPM = (npm, callback) => {
    const query = { npm: npm };
    Praktikan.findOne(query, callback);
}

//GET praktikan by NPM and Class (Activation)
module.exports.getPraktikanByNpmAndKelas = (praktikan, callback) => {
    Praktikan.findOne(praktikan, callback);
}

//GET All Praktikan
module.exports.getAllPraktikan = (callback) => {
    const query = {};
    Praktikan.find(query)
        .populate('_praktikumId')
        .exec(callback);
}



//Get Praktikan by Kelas
module.exports.enrollPraktikum = (kelas, pratikumId, callback) => {
        const query = { kelas: kelas };
        Praktikan.update(query, {
            $push: { "_praktikumId": pratikumId }
        }, {
            new: true,
            multi: true
        }).exec(callback);
    }
    //DELETE Praktikan BY ID
module.exports.removePraktikanById = (id, callback) => {
    Praktikan.findByIdAndRemove(id, callback);
}

module.exports.removePraktikum = (id, idPraktikum, callback) => {
        const query = { _id: id };
        Praktikan.update(query, {
            $pull: { "_praktikumId": idPraktikum }
        }).exec(callback);
    }
    //Activasi berarti dari praktikan ->  userSchema (Berdasarkan NPM dan kelas)
    //Daftarin berati dari users -> pjSchema||PetugasSchema (Berdasarkan Username dan Password)