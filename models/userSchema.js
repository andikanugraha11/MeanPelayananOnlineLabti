const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const Praktikan = require('./praktikanSchema');
const PetugasPj = require('./petugasPjSchema');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const userSchema = Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    key: {
        type: String
    },
    resetkey: {
        type: String
    },
    role: {
        type: String,
        enum: ['admin', 'praktikan', 'petugas', 'pj'],
        default: 'praktikan'
    },
    _praktikanId: {
        type: ObjectId,
        ref: 'Praktikan',
    },
    _pjId: {
        type: ObjectId,
        ref: 'PetugasPj'
    },
    _petugasId: {
        type: ObjectId,
        ref: 'PetugasPj'
    }
});

const User = module.exports = mongoose.model('User', userSchema);

//User Contoroller

//Get User by id
module.exports.getUserById = (id, callback) => {
    User.findById(id, callback);
}

//GET user by username
module.exports.getUserByUsername = (username, callback) => {
    const query = { username: username };
    User.findOne(query, callback);
}

module.exports.getUserByEmail = (email, callback) => {
    const query = { email: email };
    User.findOne(query, callback);
}

//Get all user where role = PJ (Penanggung Jawab)
module.exports.getAllPJ = (callback) => {
    const query = { role: 'pj' };
    User.find(query).exec(callback);
}

//SDA BUT WITH POPULATE
module.exports.getAllPJPopulate = (callback) => {
    const query = { role: 'pj' };
    User.find(query).populate({
            'path': '_pjId',
            'populate': [{
                'path': '_praktikumId',
                'model': 'Praktikum'
            }]
        })
        .exec((err, result) => {
            if (err) throw err;
            callback(result);

        });
}

//SDA BUT WITH POPULATE
module.exports.getAllPetugasPopulate = (callback) => {
    const query = { role: 'petugas' };
    User.find(query).populate('_petugasId')
        .exec((err, result) => {
            if (err) throw err;
            callback(result);
        });
}

//set to NPM
module.exports.setPasswordToNpm = (prakId, npm, callback) => {
    let npmHash;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(npm, salt, (err, hash) => {
            if (err) {
                console.log(err)
            } else {

                npmHash = hash;
                const query = { _praktikanId: prakId };
                //console.log(npmHash);
                User.update(query, {
                    $set: {
                        password: npmHash
                    }
                }, callback);
            }
        });
    })
}

//ADD user
module.exports.addUser = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
                console.log(err)
            } else {
                newUser.password = hash;
                newUser.save(callback);
            }

        })
    });
}

//activation
module.exports.activation = (data, callback) => {
    const query = {
        _id: data.userId,
        key: data.key
    }
    User.update(query, {
        $set: {
            isVerified: true
        },
        $unset: {
            key: 1
        }
    }, callback);
}


//passwordkey
module.exports.addResetKey = (data, callback) => {
    const query = {
        email: data.email
    }
    User.update(query, {
        $set: {
            resetkey: data.key
        }
    }, callback);
}

//resetpaswordbykey
module.exports.resetByKey = (data, callback) => {

        let passwordHash;
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(data.password, salt, (err, hash) => {
                if (err) {
                    console.log(err);
                } else {
                    passwordHash = hash;
                    const query = {
                        email: data.email,
                        resetkey: data.resetkey
                    }
                    User.update(query, {
                        $set: {
                            password: passwordHash
                        },
                        $unset: {
                            resetkey: 1
                        }
                    }, callback);
                }
            })
        })
    }
    //ADD PJ
module.exports.addPj = (newPj, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newPj.password, salt, (err, hash) => {
            if (err) {
                console.log(err)
            } else {
                newPj.password = hash;
                newPj.save(callback);
            }

        })
    });
}

//Compare password
module.exports.comparePassword = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch); //isMatch return true while match
    });
}

//changepassword
module.exports.changePassword = (data, callback) => {

    let passwordHash;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(data.password, salt, (err, hash) => {
            if (err) {
                console.log(err);
            } else {
                passwordHash = hash;
                const query = {
                    _id: data.userId
                }
                User.update(query, {
                    $set: {
                        password: passwordHash
                    }
                }, callback);
            }
        })
    })
}

//RemovePJ
module.exports.removePJId = (id, callback) => {
    User.findByIdAndRemove(id, callback);
}

//RemovePetugas
module.exports.removePetugasId = (id, callback) => {
    User.findByIdAndRemove(id, callback);
}