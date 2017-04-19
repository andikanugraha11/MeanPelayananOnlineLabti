// userSchema
const Schema = mongoose.Schema;
const userSchema = Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    isVerified: {
        type: Boolean
    },
    role: {
        type: String,
        enum: ['admin', 'praktikan', 'petugas', 'pj'],
        default: 'admin'
    },
    _praktikanId: {
        type: ObjectId
    },
    _pjId: {
        type: ObjectId
    },
    _petugasId: {
        type: ObjectId
    }
});

// praktikanSchema
const ObjectId = mongoose.Schema.Types.ObjectId;
const praktikanSchema = Schema({
    npm: {
        type: String,
        required: true
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
        type: String
    },
    _praktikumId: [ObjectId]
});

// pjSchema
const ObjectId = mongoose.Schema.Types.ObjectId;
const pjSchema = Schema({
    nama: {
        depan: {
            type: String,
            required: true
        },
        belakang: {
            type: String
        }
    },
    // _kelasId: [ObjectId],
    _praktikumId: [ObjectId]
});

// petugasSchema
const ObjectId = mongoose.Schema.Types.ObjectId;
const petugasSchema = Schema({
    nama: {
        depan: {
            type: String,
            required: true
        },
        belakang: {
            type: String
        }
    },
    // _kelasId: [ObjectId],
    // _praktikumId: [ObjectId]
});


//praktikumSchema
const ObjectId = mongoose.Schema.Types.ObjectId;
const pjSchema = Schema({
    nama_mata_praktikum: {
        type: String
    },
    kode_mata_praktikum: {
        type: String
    },
    kelas: {
        type: String
    }
    // _kelasId: [ObjectId],
    // _pjId: [ObjectId]
});

//kelasSchema
// const ObjectId = mongoose.Schema.Types.ObjectId;
// const kelasSchema = Schema({
//     nama: {
//         type: String
//     },
//     _praktikanId: [ObjectId]
// });