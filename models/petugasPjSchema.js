const mongoose = require('mongoose');
const config = require('../config/database');

const User = require('./userSchema');
const Praktikum = require('./praktikumSchema');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const petugasPjSchema = Schema({
    nama: {
        depan: {
            type: String,
            required: true
        },
        belakang: {
            type: String
        }
    },
    npm: {
        type: String
    },
    _userId: {
        type: ObjectId,
        ref: 'User'
    },
    _praktikumId: [{
        type: ObjectId,
        ref: 'Praktikum'
    }]
});

const PetugasPj = module.exports = mongoose.model('PetugasPj', petugasPjSchema);

//Petugas & PJ Contoroller

//Get PJ by id
module.exports.getPjById = (id, callback) => {
    PetugasPj.findById(id, callback);
}

//Get Petugas by id
module.exports.getPetugasById = (id, callback) => {
    PetugasPj.findById(id, callback);
}

//GET pj by npm
module.exports.getPjByNpm = (npm, callback) => {
    const query = { npm: npm };
    PetugasPj.findOne(query, callback);
}

//ADD Petugas & PJ
module.exports.addPetugasPj = (newPetugasPj, callback) => {
    newPetugasPj.save(callback);
}

//Remove PEtugas by userid
module.exports.removeByUserId = (id, callback) => {
    const query = { _userId: id };
    PetugasPj.remove(query, callback);
}

//FindPJ (witoutUser)
module.exports.getAllPJ = (callback) => {
    const query = {};
    PetugasPj.find(query).exec(callback);
}

module.exports.updatePraktikum = (id, prakId, callback) => {
    PetugasPj.findByIdAndUpdate(id, {
        $push: { "_praktikumId": prakId }
    }, {
        new: true
    }).exec(callback);
}

module.exports.getPjByIdPopulate = (id, callback) => {
    const query = { _id: id }
    PetugasPj.findOne(query)
        .populate('_praktikumId')
        .exec((err, result) => {
            if (err) {
                console.log(err);
            } else {
                callback(result);
            }
        })
}