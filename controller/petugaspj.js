const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const User = require('../models/userSchema');
const Praktikan = require('../models/praktikanSchema');
const Praktikum = require('../models/praktikumSchema');
const PJ = require('../models/petugasPjSchema');
const Petugas = require('../models/petugasPjSchema');

// GET All PJ
//user/get/pj
//user/get/pj
router.get('/getAllPj', (req, res, next) => {

    PJ.getAllPJ((pj) => {
        res.json({
            success: true,
            pj
        })
    });
});

module.exports = router;